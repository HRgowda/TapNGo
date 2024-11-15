"use client";

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { TextInput } from "@repo/ui/textinput";
import axios from "axios";
import { BankModal } from "./BankModal";
import { alertMessage as AlertMessage } from "@components/AlertMessage";

const SUPPORTED_BANKS = [
  { name: "HDFC Bank" },
  { name: "Axis Bank" },
  { name: "SBI Bank" },
];

interface Props {
  userid: number;
}

export const AddMoney = ({ userid }: Props) => {
  const [amount, setAmount] = useState(0);
  const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
  const [modalOpen, setModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<{
    message: string;
    status: "success" | "failure";
  } | null>(null);
  const [transactionToken, setTransactionToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean | null>(false)

  const handleSubmit = async () => {
    if (amount <= 0) {
      setAlertMessage({ message: "Please enter a valid amount.", status: "failure" });
      setTimeout(() => setAlertMessage(null), 3000);
      return;
    }
    setLoading(true)
    try {
      const response = await axios.post("http://localhost:3003/create_onramp", {
        amount,
        provider,
        user_identifier: userid,
      });

      if (response.status === 200) {
        const token = response.data.token
        setAlertMessage({ message: response.data.message, status: "success" });
        setTransactionToken(token)
        setLoading(false)
        setModalOpen(true);
        setTimeout(() => setAlertMessage(null), 3000);
      }
    } catch (error) {
      console.error("Error initiating deposit:");
      setAlertMessage({ message: "Failed to initiate deposit. Try again later.", status: "failure" });
      setTimeout(() => setAlertMessage(null), 3000);
    }
  };

  return (
    <div className="rounded-xl transition-shadow duration-300 hover:shadow-lg hover:shadow-white/20">
      <Card title="Add Money to your Wallet">
        <div className="w-full">
          <TextInput label="Amount" placeholder="Enter amount" onChange={(value) => setAmount(Number(value))} />
          <div className="py-4 text-left text-blue-400">Bank</div>
          <Select
            onSelect={(value) =>
              setProvider(SUPPORTED_BANKS.find((x) => x.name === value)?.name || "")
            }
            options={SUPPORTED_BANKS.map((x: any) => ({
              key: x.name,
              value: x.name,
            }))}
          />
          <div className="flex justify-center pt-4">
            <Button onClick={handleSubmit}>{loading ? "Processing..." : "Add Money"}</Button>
          </div>
        </div>

        <BankModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          provider={provider}
          amount={amount}
          transactionToken={transactionToken}
          id={userid}
        />

        {alertMessage && (
          <AlertMessage
            description={alertMessage.message}
            status={alertMessage.status}
          />
        )}
      </Card>
    </div>
  );
};

