"use client";

import { Button } from "@repo/ui/button";
import { GoalDepositChart } from "./GoalDepositChart";
import { GoalsModal } from "./DepositGoalModal";
import { useState } from "react";

interface FinalGoalProps {
  userid: number;
  userName: string;
  goalAmount: number;
  currentSavings: number;
  deadline: Date;
  goalType: string;
}

type GoalAction = "add" | "withdraw" | "create";

export function FinalGoalUi({
  userid,
  userName,
  goalAmount,
  currentSavings,
  deadline,
  goalType,
}: FinalGoalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<GoalAction>("add");

  const handleModal = (action: GoalAction) => {
    setModalAction(action);
    setIsModalOpen(true);
  };

  const progress = Math.min((currentSavings / goalAmount) * 100, 100).toFixed(2);

  return (
    <div className="bg-gray-900 h-screen w-full rounded-lg flex flex-col p-2">
      {/* Left Section */}
      <div className="text-white font-bold text-2xl p-4">
        <h1 className="font-extrabold text-3xl text-start bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500">
          {userName}'s Vision Vault
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 p-4 gap-6">

        <div className="bg-gray-800 p-6 rounded-lg transition-shadow duration-300 hover:shadow-lg hover:shadow-white/50 hover:-translate-y-2">
          <h1 className="text-white text-center border-b border-gray-200 p-4 text-2xl font-bold tracking-wide mb-4">
            Current Goals: {goalType}
          </h1>

          <div className="flex justify-between items-center text-white font-semibold p-4 bg-gray-900 rounded-lg shadow-md hover:bg-gray-800 hover:border-2 hover:border-white mb-4">
            <div className="text-lg">Target Amount</div>
            <div className="text-xl font-bold">Rs {goalAmount}</div>
          </div>

          <div className="flex justify-between items-center text-white font-semibold p-4 bg-gray-900 rounded-lg shadow-md hover:bg-gray-800 hover:border-2 hover:border-white mb-4">
            <div className="text-lg">Current Savings</div>
            <div className="text-xl font-bold">Rs {currentSavings}</div>
          </div>

          <div className="flex justify-between items-center text-white font-semibold p-4 bg-gray-900 rounded-lg shadow-md hover:bg-gray-800 hover:border-2 hover:border-white mb-4">
            <div className="text-lg">Deadline</div>
            <div className="text-xl font-bold">{deadline.toLocaleDateString()}</div>
          </div>

          <div className="flex justify-between items-center text-white font-semibold p-4 bg-gray-900 rounded-lg shadow-md hover:bg-gray-800 hover:border-2 hover:border-white mb-4">
            <div className="text-lg">Progress</div>
            <div className="text-xl font-bold">{progress} %</div>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-6">
            <Button onClick={() => handleModal("add")}>Add Funds</Button>
            <Button onClick={() => handleModal("withdraw")}>Withdraw Funds</Button>
          </div>
        </div>

        {/* Right Section: Chart */}
        <div className="bg-gray-800 p-6 rounded-lg transition-shadow duration-300 hover:shadow-lg hover:shadow-white/50 hover:-translate-y-2">

          <div className="text-white font-bold text-2xl">

            <h1 className="text-white text-center border-b border-gray-200 p-4 text-2xl font-bold tracking-wide mb-4">
            Savings Milestone
            </h1>
            
          </div>

          <div className="flex justify-center items-center">

            <GoalDepositChart
              goalAmount={goalAmount}
              currentSavings={currentSavings}
            />
          </div>
        </div>
      </div>

      <div className="p-4 mt-6 text-white font-bold text-xl text-center">Financial goals are achieved not by chance, but by choice - every contribution today shapes your success tomorrow!</div>

      {/* Modal */}
      {isModalOpen && (
        <GoalsModal
          uiProps={{ isOpen: isModalOpen, onClose: () => setIsModalOpen(false) }}
          userId={userid}
          title={
            modalAction === "add"
              ? "Add Funds To Your Savings"
              : "Withdraw From Your Savings"
          }
          subTitle1="Select Your Existing Goal Type"
          subTitle2="Amount"
          goalAction={modalAction}
        />
      )}
    </div>
  );
}
