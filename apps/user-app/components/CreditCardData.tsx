"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export function CreditCardForm(){

  const [credentials, setCredentials] = useState({
    cardNumber: "",
    validDate: "",
    expiryDate: "",
    cvv: "",
    name: ""
  });

  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try{
      const response = await axios.post("/api/auth/card", credentials)

      if (response.status == 200){
        alert("Successfully stored card details!");
        router.push("/dashboard")
      }
    } catch(e){
      alert("Failed to store your card details.")
    }
  }
  
  return ( <section className="h-screen flex justify-center items-center">
  <div className="flex justify-center items-center">
    <div className="w-full max-w-md bg-white rounded-lg shadow-2xl">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold md:text-2xl text-center">Enter your card details</h1>
        <form className="space-y-4 md:space-y-6" onSubmit={submit}>
          <div>
            <label className="block mb-2 text-sm font-semibold">Card Number</label>
            <input
              type="text"
              name="cardnumber"
              className="border border-gray-300 sm:text-sm rounded-lg block w-full p-2.5"
              placeholder="12xx xxxx xxxx xx90"
              onChange={(e) => setCredentials({ ...credentials, cardNumber: e.target.value })}
            />
          </div>

          <div className="flex justify-between gap-4">
            <div>
              <label className="block mb-2 text-sm font-semibold">Valid Date</label>
              <input
                type="text"
                name="validity"
                className="border border-gray-300 sm:text-sm rounded-lg block w-full p-2.5"
                placeholder="MM/YY"
                onChange={(e) => setCredentials({ ...credentials, validDate: e.target.value })}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold">Expiry Date</label>
              <input
                type="text"
                name="expiry"
                className="border border-gray-300 sm:text-sm rounded-lg block w-full p-2.5"
                placeholder="MM/YY"
                onChange={(e) => setCredentials({ ...credentials, expiryDate: e.target.value })}
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
              <a className="font-light text-blue-600 hover:underline" href="/dashboard">
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