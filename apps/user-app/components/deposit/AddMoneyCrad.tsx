"use client"

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { TextInput } from "@repo/ui/textinput";
import { OnRampTransaction } from "../../app/lib/actions/createOnRamptxn";

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
},{
  name: "Sbi Bank",
  redirectUrl: "https://www.sbi.co.in"
},];

export const AddMoney = () => {
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [amount, setAmount] = useState(0);
    const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");

  // function createOnRampTransaction(amount: string, provider: string | undefined) {
  //   throw new Error("Function not implemented.");
  // }

    return <Card title="Add Money to your Wallet">
    <div className="w-full">
        <TextInput label={"Amount"} placeholder={"Amount"} onChange={(value) => {
          setAmount(Number(value))
        }} />
        <div className="py-4 text-left text-blue-400">
            Bank
        </div>
        <Select onSelect={(value) => {

            setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "")

            setProvider(SUPPORTED_BANKS.find(x=> x.name == value)?.name || "" )

        }} options={SUPPORTED_BANKS.map(x => ({
            key: x.name,
            value: x.name
        }))} />
        <div className="flex justify-center pt-4">
            <Button onClick={async() => {
              await OnRampTransaction(amount, provider);
                window.location.href = redirectUrl || "";
            }}>
            Add Money
            </Button>
        </div>
    </div>
</Card>
}