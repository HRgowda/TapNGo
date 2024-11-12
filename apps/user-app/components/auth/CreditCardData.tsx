"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import { alertMessage as AlertMessage } from '@components/AlertMessage';

export function CreditCardForm() {
  const [credentials, setCredentials] = useState({
    cardNumber: ["", "", "", ""], // Four separate fields for card number
    validDate: "",
    expiryDate: "",
    cvv: "",
    name: ""
  });
  const [alertMessage, setAlertMessage] = useState<{ message: string, status: "success" | "failure" } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleCardInputChange = (index: number, value: string) => {
    if (value.length <= 4) {
      const newCardNumber = [...credentials.cardNumber];
      newCardNumber[index] = value;
      setCredentials({ ...credentials, cardNumber: newCardNumber });

      if (value.length === 4 && index < 3) {
        // Focus on the next input when 4 digits are entered
        const nextInput = document.getElementById(`cardNumber${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleDateInputChange = (key: 'validDate' | 'expiryDate', value: string) => {
    if (value.length === 2 && !value.includes('/')) {
      // Automatically add '/' after month
      setCredentials({ ...credentials, [key]: value + '/' });
    } else if (value.length <= 5) {
      setCredentials({ ...credentials, [key]: value });
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formattedCardNumber = credentials.cardNumber.join(""); // Combine card number parts
    try {
      const response = await axios.post("/api/auth/card", { ...credentials, cardNumber: formattedCardNumber });

      if (response.status === 200) {
        setAlertMessage({ message: response.data.message, status: "success" });
        router.push("/home");
      }
    } catch (error) {
      // Type guard to check if error is an AxiosError
      if (axios.isAxiosError(error)) {
        // Handle AxiosError specifically
        const errorMessage = error.response?.data?.message || "Failed to store your card details.";
        setAlertMessage({ message: errorMessage, status: "failure" });
      } else {
        // Handle generic errors
        setAlertMessage({ message: "An unexpected error occurred.", status: "failure" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="text-white h-screen flex justify-center items-center">
      <div className="flex justify-center items-center">
        <div className="w-full max-w-md">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold md:text-2xl text-center">Enter your card details</h1>
            <form className="space-y-4 md:space-y-6" onSubmit={submit}>
              <div>
                <label className="block mb-2 text-sm font-semibold">Card Number</label>
                <div className="flex gap-2">
                  {credentials.cardNumber.map((number, index) => (
                    <input
                      key={index}
                      id={`cardNumber${index}`}
                      type="text"
                      placeholder='XXXX'
                      maxLength={4}
                      value={credentials.cardNumber[index]}
                      className="bg-[#121212] border border-gray-300 sm:text-sm rounded-lg w-full p-2.5 text-center"
                      onChange={(e) => handleCardInputChange(index, e.target.value)}
                    />
                  ))}
                </div>
              </div>

              <div className="flex justify-between gap-4">
                <div>
                  <label className="block mb-2 text-sm font-semibold">Valid Date</label>
                  <input
                    type="text"
                    value={credentials.validDate}
                    className="bg-[#121212] border border-gray-300 sm:text-sm rounded-lg block w-full p-2.5"
                    placeholder="MM/YY"
                    maxLength={5} // Ensures MM/YY format
                    onChange={(e) => handleDateInputChange('validDate', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold">Expiry Date</label>
                  <input
                    type="text"
                    value={credentials.expiryDate}
                    className="bg-[#121212] border border-gray-300 sm:text-sm rounded-lg block w-full p-2.5"
                    placeholder="MM/YY"
                    maxLength={5}
                    onChange={(e) => handleDateInputChange('expiryDate', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-semibold">CVV</label>
                <input
                  type="password"
                  name="cvv"
                  className="bg-[#121212] border border-gray-300 sm:text-sm rounded-lg block w-full p-2.5"
                  placeholder="123"
                  maxLength={3}
                  onChange={(e) => setCredentials({ ...credentials, cvv: e.target.value })}
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-semibold">Card Holder Name</label>
                <input
                  type="text"
                  name="name"
                  className="bg-[#121212] border border-gray-300 sm:text-sm rounded-lg block w-full p-2.5"
                  placeholder="John Doe"
                  onChange={(e) => setCredentials({ ...credentials, name: e.target.value })}
                />
              </div>

              <button type="submit" className="w-full text-black bg-white hover:bg-white/70 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                {loading ? "Please Wait..." : "Done"}
              </button>

              <div className="flex justify-center items-center">
                <a className="font-light text-white hover:underline" href="/home">
                  Skip for now
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>

      {alertMessage && (
        <AlertMessage
          description={alertMessage.message}
          status={alertMessage.status}
        />
      )}
    </section>
  );
}
