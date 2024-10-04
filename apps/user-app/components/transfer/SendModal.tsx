import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Button } from "@repo/ui/button";
import { P2PTransfer } from "../../app/lib/actions/p2ptxn"

interface SendModalProps {
  isOpen: boolean;
  onClose: () => void;
  recieverId: number;
  recieverName: string;
  children: React.ReactNode; // This is the selected user passed from the main modal
}

export function SendModal({ isOpen, onClose, recieverId, recieverName, children }: SendModalProps) {
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

    // Prevent modal closing when clicking inside the modal
  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  async function handleSendClick(){
    if (amount === undefined || amount <= 0){
      setAlertMessage("Please enter a valid amount!")
      return;
    }

    setLoading(true);

    try{
      const response = await P2PTransfer(recieverId, Number(amount));

      if(response?.message === "User not found"){
        setAlertMessage("User not found");
      } 
      else if(response?.message === "Error while sending"){
        setAlertMessage("Transfer failed. Please try again");
      }
       else {
        setAlertMessage("Transfer successful!")
      }
    } catch(e){
      setAlertMessage("Transfer failed. Insufficient funds or an error occured")
    }

    setLoading(false)
  }

  return (
    <div
      className="text-white fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="flex flex-col bg-gray-900 rounded-lg border-2 border-blue-500 w-[30rem] relative p-6"
        onClick={handleContentClick}
      >
        {/* Header with "Send" and close button on the same line */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Send to {recieverName}</h2>
          <button onClick={onClose}>
            <XMarkIcon className="h-6 w-6 text-white"></XMarkIcon>
          </button>
        </div>

        {/* Main content: Left (Avatar & Receiver) and Right (Amount & Send button) */}
        <div className="mt-8 flex justify-around items-center">
          {/* Left: Avatar and Receiver */}
          <div className="flex flex-col items-center space-y-2">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white">
              <img
                src="/Images/avatar.png"
                alt="Profile avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-white font-medium text-center">{recieverName}</span>
          </div>

          {/* Right: Input box with label and Send button */}
          <div className="flex flex-col items-center space-y-4">
            {/* Input label and box */}
            <div className="flex flex-col">
              <label htmlFor="amount" className="text-white mb-2">
                Amount
              </label>

              <input type="number" 
                className="w-full text-white text-md font-semibold border-b bg-gray-800 p-2 rounded-lg" 
                placeholder="100"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))} />

            </div>

            {/* Send button */}
            <Button
              onClick={handleSendClick}
            >
              {loading ? "Sending..." : "Send"}
            </Button>
          </div>
        </div>

        {alertMessage && (
          <div className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded-lg">
            {alertMessage}
          </div>
        )}
      </div>
    </div>
  );
}
