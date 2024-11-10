import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Button } from "@repo/ui/button";
import { P2PTransfer } from "app/lib/server_actions/p2pTxnDatabase";
import { alertMessage as AlertMessage } from "@components/AlertMessage";

interface SendModalProps {
  isOpen: boolean;
  onClose: () => void;
  recieverId: number;
  recieverName: string;
  children: React.ReactNode;
}

export function SendModal({ isOpen, onClose, recieverId, recieverName, children }: SendModalProps) {
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [alertMessage, setAlertMessage] = useState<{
    message: string;
    status: "success" | "failure";
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  async function handleSendClick() {
    if (amount === undefined || amount <= 0) {
      setAlertMessage({ message: "Please enter a valid amount!", status: "failure" });

      setTimeout(() => {
        setAlertMessage(null);
        setAmount(0);
      }, 2000);

      return;
    }

    setLoading(true);

    try {
      const response = await P2PTransfer(recieverId, Number(amount));
      if (response?.message === "User not found") {
        setAlertMessage({ message: "User not found", status: "failure" });
        setTimeout(() => {
          setAlertMessage(null);
          onClose();
        }, 2000);
      } else if (response?.message === "Error while sending") {
        setAlertMessage({ message: "Transfer failed. Please try again", status: "failure" });
        setTimeout(() => {
          setAlertMessage(null);
          onClose();
        });
      } else {
        setAlertMessage({ message: "Transfer successful!", status: "success" });
        setTimeout(() => {
          setAlertMessage(null);
          onClose();
        }, 1000);
      }
    } catch (error) {
      setAlertMessage({
        message: "Transfer failed. Insufficient funds or an error occurred",
        status: "failure",
      });
      setTimeout(() => {
        setAlertMessage(null);
        onClose();
      }, 2000);
    }

    setLoading(false);
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80"
      onClick={onClose}
    >
      <div
        className="relative p-4 bg-gray-900 rounded-lg border-2 border-blue-500 w-auto max-w-[30rem] md:w-[30rem] sm:w-[24rem] sm:px-6 sm:py-8"
        onClick={handleContentClick}
      >
        {/* Header with "Send" and close button on the same line */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg sm:text-xl font-semibold">Send to {recieverName}</div>
          <button onClick={onClose}>
            <XMarkIcon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </button>
        </div>

        {/* Main content: Avatar, Amount input, and Send button */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-around items-center space-y-6 sm:space-y-0">
          {/* Left: Avatar and Receiver */}
          <div className="flex flex-col items-center space-y-2">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-white">
              <img
                src="/Images/avatar.png"
                alt="Profile avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-white text-sm sm:text-base font-medium text-center">
              {recieverName}
            </span>
          </div>

          {/* Right: Input box with label and Send button */}
          <div className="flex flex-col items-center space-y-4 w-full sm:w-auto px-4 sm:px-0">
            {/* Input label and box */}
            <div className="flex flex-col w-full sm:w-auto">
              <label htmlFor="amount" className="text-white text-sm sm:text-base mb-1 sm:mb-2">
                Amount
              </label>
              <input
                type="number"
                className="w-full sm:w-auto text-white text-md font-semibold border-b bg-gray-800 p-2 rounded-lg"
                placeholder="100"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </div>

            {/* Send button wrapped in a div for responsiveness */}
            <div className="w-full flex justify-center mt-4">
              <Button onClick={handleSendClick}>
                {loading ? "Sending..." : "Send"}
              </Button>
            </div>
          </div>
        </div>

        {/* Alert Message */}
        {alertMessage && (
          <AlertMessage description={alertMessage.message} status={alertMessage.status} />
        )}
      </div>
    </div>
  );
}
