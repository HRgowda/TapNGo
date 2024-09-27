"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export function CreditCardForm() {
  const [credentials, setCredentials] = useState({
    cardNumber: ["", "", "", ""], // Four separate fields for card number
    validDate: "",
    expiryDate: "",
    cvv: "",
    name: ""
  });

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

    const formattedCardNumber = credentials.cardNumber.join(""); // Combine card number parts
    try {
      const response = await axios.post("/api/auth/card", { ...credentials, cardNumber: formattedCardNumber });

      if (response.status === 200) {
        alert("Successfully stored card details!");
        router.push("/home");
      }
    } catch (e) {
      alert("Failed to store your card details.");
    }
  };

  return (
    <section className="h-screen flex justify-center items-center">
      <div className="flex justify-center items-center">
        <div className="w-full max-w-md bg-white rounded-lg shadow-2xl">
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
                      className="border border-gray-300 sm:text-sm rounded-lg w-full p-2.5 text-center"
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
                    className="border border-gray-300 sm:text-sm rounded-lg block w-full p-2.5"
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
                    className="border border-gray-300 sm:text-sm rounded-lg block w-full p-2.5"
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
                  className="border border-gray-300 sm:text-sm rounded-lg block w-full p-2.5"
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
                  className="border border-gray-300 sm:text-sm rounded-lg block w-full p-2.5"
                  placeholder="John Doe"
                  onChange={(e) => setCredentials({ ...credentials, name: e.target.value })}
                />
              </div>

              <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                Next
              </button>

              <div className="flex justify-center items-center">
                <a className="font-light text-blue-600 hover:underline" href="/home">
                  Skip for now
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
