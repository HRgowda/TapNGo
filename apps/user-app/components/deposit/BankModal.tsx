"use client";

import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { Button } from "@repo/ui/button";
import { alertMessage as AlertMessage } from "@components/AlertMessage";

interface BankModalProps {
  isOpen: boolean;
  onClose: () => void;
  provider: string;
  amount: number;
  transactionToken: string | null;
  id: number;
}

export function BankModal({
  isOpen,
  onClose,
  provider,
  amount,
  transactionToken,
  id,
}: BankModalProps) {
  const [alertMessage, setAlertMessage] = useState<{ message: string; status: "success" | "failure" } | null>(null);
  const [pin, setPin] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setAlertMessage(null);
      setPin("");
      onClose();
    }
  };

  const handleDeposit = async () => {
    if (!pin || isNaN(Number(pin))) {
      setAlertMessage({ message: "Please enter a valid numeric PIN.", status: "failure" });
      setTimeout(() => setAlertMessage(null), 3000);
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:3003/complete_onramp", {
        token: transactionToken,
        user_identifier: id,
        amount,
        pin,
      });

      if (response.status === 200) {
        setAlertMessage({ message: response.data.message, status: "success" });
        setTimeout(() => {
          setAlertMessage(null),
          setPin(""),
          onClose()}, 2000);
      } else {
        setAlertMessage({ message: response.data.message, status: "failure" });
        setTimeout(() =>{
          setAlertMessage(null);
          setPin("");
        })       
      }

    } catch (error) {
      console.error("Webhook error:", error);
      
      // Handling specific error response from the bank_server
      if (axios.isAxiosError(error) && error.response) {
        setAlertMessage({ message: error.response.data.message, status: "failure" });
        setTimeout(()=>{
          setAlertMessage(null);
          setPin("")
        }, 3000)
      } else {
        setAlertMessage({ message: "Failed to complete the transaction.", status: "failure" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="text-white fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center transition-opacity duration-300"
      onClick={handleOverlayClick}
    >
      <div
        className="flex flex-col bg-gray-900 rounded-lg border-2 border-blue-500 w-[30rem] relative p-6"
        onClick={handleContentClick}
      >
        {/* Alert message inside the modal */}
        {alertMessage && (
          <div className="mb-4">
            <AlertMessage description={alertMessage.message} status={alertMessage.status} />
          </div>
        )}

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Deposit money to your wallet</h2>
          <button onClick={onClose}>
            <XMarkIcon className="h-6 w-6 text-white hover:text-red-500 transition-colors" />
          </button>
        </div>

        <div className="mt-8 flex justify-around items-center">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white">
              <img
                src={
                  provider === "HDFC Bank"
                    ? "/Images/hdfc.png"
                    : provider === "Axis Bank"
                    ? "/Images/axis.png"
                    : provider === "SBI Bank"
                    ? "/Images/sbi.png"
                    : "/Images/default.png"
                }
                alt="Bank logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-white font-medium text-center">{provider}</span>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <div className="flex flex-col">
              <label htmlFor="pin" className="text-white mb-2">
                Enter your tapNgo PIN
              </label>
              <input
                id="pin"
                type="password"
                className="w-full text-white text-md font-semibold border-b bg-gray-800 p-2 rounded-lg"
                placeholder="Enter PIN"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
              />
            </div>

            <Button onClick={handleDeposit}>
              {isLoading ? "Processing..." : "Deposit"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
