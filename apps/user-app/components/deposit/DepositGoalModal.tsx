"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { handleDepositGoal } from "../../app/lib/actions/depositGoals";

interface uiProps {
  isOpen: boolean;
  onClose: () => void;
}

interface goalModalProps {
  uiProps: uiProps;
  userId: number;
  // isAddFund: boolean;
  title: string;
  subTitle1: string;
  subTitle2: string;
  goalAction: "create" | "add" | "withdraw"
}

export function GoalsModal({ uiProps, userId, title, subTitle1, subTitle2, goalAction}: goalModalProps) {
  const goalTypes: string[] = ["Health", "Education", "Marriage", "Vacation", "Others"];

  const [selectedType, setSelectedType] = useState<string>();
  const [otherGoal, setOtherGoal] = useState<string>("");
  const [goalAmount, setGoalAmount] = useState<number | null>(null);
  const [deadline, setDeadLine] = useState<Date | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertBackground, setAlertBackground] = useState<string>("");

  if (!uiProps.isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      uiProps.onClose();
    }
  };

  const handleSave = async () => {
    // Validate inputs
    if (goalAmount === null || goalAmount <= 0) {
      setAlertMessage("Please enter a valid amount");
      setAlertBackground("bg-red-500");
      return;
    }
    
    if (goalAction === "create" && !deadline) {
      setAlertMessage("Please select a deadline");
      setAlertBackground("bg-red-500");
      return;
    } 
    
    if (!selectedType) {
      setAlertMessage("Please select a goal type");
      setAlertBackground("bg-red-500");
      return;
    }

    try {
      const type = selectedType === "Others" ? otherGoal : selectedType;

      const validDeadline = deadline ?? undefined

      // Send request to create the deposit goal
      const response = await handleDepositGoal({
        userId: userId,
        goalAmount,
        type: type,
        deadline: validDeadline,
        action: goalAction
      });

      // Check the response for success or error
      if (response.status === 200) {
        const successMessages = {
          create: "Savings goal created successfully",
          add: "Funds added successfully",
          withdraw: "Funds withdrawn successfully"
        }
        setAlertMessage(successMessages[goalAction]);
        setAlertBackground("bg-blue-500");

        setTimeout(() => {
          uiProps.onClose()}
          , 1000);
          
      } else {
        setAlertMessage(response.body.message || "Failed to create deposit goal.");
        setAlertBackground("bg-red-500");
      }
    } catch (error) {
      console.error("Error creating deposit goal:", error);
      setAlertMessage("An error occurred while saving the goal.");
      setAlertBackground("bg-red-500");
    }
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 backdrop-blur-sm transition-opacity duration-300"
      onClick={handleOverlayClick}
    >
      <div className="bg-gray-900 rounded-xl shadow-xl p-6 relative w-[32rem] transition-transform transform scale-100 border-2 border-blue-500">
        
        <button className="absolute top-3 right-3 focus:outline-none" onClick={uiProps.onClose}>
          <XMarkIcon className="h-6 w-6 text-white hover:text-red-500 transition-colors duration-200" />
        </button>

        <h2 className="text-white text-2xl font-semibold mb-6 text-center">{title}</h2>

        <label className="block text-gray-300 mb-2 font-medium">Goal Type</label>
        <select
          className="w-full p-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
          onChange={(e) => setSelectedType(e.target.value)}
          value={selectedType}
        >
          <option value="">{subTitle1}</option>
          {goalTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>

        {/* Custom Goal Type Input (if Others selected) */}
        {selectedType === "Others" && (
          <div className="mt-4">
            <label className="block mb-2 text-gray-300 font-medium">Custom Goal</label>
            <input
              type="text"
              placeholder="Enter your custom goal"
              value={otherGoal}
              onChange={(e) => setOtherGoal(e.target.value)}
              className="text-white p-3 bg-gray-800 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            />
          </div>
        )}

        <label className="block text-gray-300 mb-2 mt-6 font-medium">{subTitle2}</label>
        <input
          type="number"
          placeholder={goalAction === "create" ? "Enter Your Goal Amount (Ex: Rs 1,00,000)" : "Enter The Amount"}
          className="w-full p-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
          onChange={(e) => setGoalAmount(parseFloat(e.target.value))}
        />

        {goalAction === "create" &&  (<div>
          <label className="block text-gray-300 mb-2 mt-6 font-medium">Deadline</label>
          <div className="relative">
              <input
              type="date"
              className="w-full p-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              onChange={(e) => setDeadLine(new Date(e.target.value))}
            />
          </div>
        </div>
        )}

        <div className="mt-8 flex justify-end space-x-3">
          <button
            className="bg-gradient-to-r from-blue-400 to-blue-700 text-white py-2 px-6 rounded-lg shadow-md hover:from-blue-700 hover:to-blue-400 transition-transform transform hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            onClick={handleSave}
          >
            {goalAction === "add" ? "Add money" : "Withdraw money"}
          </button>
          <button
            className="bg-gray-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-gray-700 transition-transform transform hover:scale-105 focus:ring-2 focus:ring-gray-500 focus:outline-none"
            onClick={uiProps.onClose}
          >
            Cancel
          </button>
        </div>
      </div>

      {alertMessage && (
        <div className={`fixed bottom-4 right-4 text-white p-4 rounded-lg ${alertBackground}`}>
          {alertMessage}
        </div>
      )}
    </div>
  );
}
