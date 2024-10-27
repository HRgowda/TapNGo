"use client";

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { TextInput } from "@repo/ui/textinput";
import { OnRampTransaction } from "app/lib/actions/createOnRamptxn";
import { BankModal } from "./BankModal";

const SUPPORTED_BANKS = [
  { name: "HDFC Bank" },
  { name: "Axis Bank" },
  { name: "SBI Bank" },
];

export const AddMoney = () => {
  const [amount, setAmount] = useState(0);
  const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
  const [modalOpen, setModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [transactionToken, setTransactionToken] = useState<string | null>(null); // State for token

  const handleSubmit = async () => {
    try {
      if (amount > 0) {
        const response = await OnRampTransaction(amount, provider);
        if (response.status === 200) {
          setAlertMessage(response.body.message);
          setTransactionToken(response.body.token ?? null); // Set the token from response
          setModalOpen(true);
        }
      } else {
        setAlertMessage("Please enter a valid amount.");
        setTimeout(() => {
          setAlertMessage(null);
        }, 3000);
      }
    } catch (error) {
      console.log("Error initiating deposit", error);
      setAlertMessage("Failed to initiate deposit. Try again later.");
      setTimeout(() => {
        setAlertMessage(null);
      }, 3000);
    }
  };

  return (
    <Card title="Add Money to your Wallet">
      <div className="w-full">
        <TextInput
          label="Amount"
          placeholder="Amount"
          onChange={(value) => setAmount(Number(value))}
        />
        <div className="py-4 text-left text-blue-400">Bank</div>
        <Select
          onSelect={(value) =>
            setProvider(SUPPORTED_BANKS.find((x) => x.name === value)?.name || "")
          }
          options={SUPPORTED_BANKS.map((x) => ({
            key: x.name,
            value: x.name,
          }))}
        />
        <div className="flex justify-center pt-4">
          <Button onClick={handleSubmit}>Add Money</Button>
        </div>
      </div>

      <BankModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        provider={provider} 
        amount={amount}
        transactionToken={transactionToken} // Pass the token here
      />

      {alertMessage && (
        <div className="fixed z-50 bottom-4 right-4 bg-red-500 text-white rounded-lg p-4">
          {alertMessage}
        </div>
      )}
    </Card>
  );
};
