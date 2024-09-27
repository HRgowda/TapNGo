"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export function SignUp() {

  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    password: "",
    pin: "",
  });

  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    try{

      const response = await axios.post('/api/auth/signup', credentials);

      if (response.status == 200){
        alert("Successfully created your account");
        router.push('/card_data')
      }
    } catch(e){
      alert("Failed to create account.")
    }
  }  

  return (
    <section className="flex flex-col items-center py-6">
      <div className="w-full bg-white md:mt-0 sm:max-w-md ">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl text-center font-bold md:text-2xl">Create an account</h1>
          <form className="space-y-4 md:space-y-6 font-semibold text-lg" onSubmit={submit}>
            <div className="flex justify-center gap-4">
              <div>
                <label className="block mb-2 font-semibold text-sm">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  className="border border-gray-300 sm:text-sm rounded-lg block w-full p-2.5"
                  placeholder="Emelia"
                  onChange={(e) => setCredentials({ ...credentials, firstName: e.target.value })}
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-sm">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  className="border border-gray-300 sm:text-sm rounded-lg block w-full p-2.5"
                  placeholder="Erickson"
                  onChange={(e) => setCredentials({ ...credentials, lastName: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold">Email</label>
              <input
                type="text"
                name="email"
                className="border border-gray-300 sm:text-sm rounded-lg block w-full p-2.5"
                placeholder="emelia_erickson24"
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold">Password</label>
              <input
                type="password"
                name="password"
                className="border border-gray-300 sm:text-sm rounded-lg block w-full p-2.5"
                placeholder="••••••••"
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold">Phone Number</label>
              <input
                type="text"
                name="number"
                className="border border-gray-300 sm:text-sm rounded-lg block w-full p-2.5"
                placeholder="1234567891"
                onChange={(e) => setCredentials({ ...credentials, number: e.target.value })}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold">Pin</label>
              <input
                type="text"
                name="pin"
                className="border border-gray-300 sm:text-sm rounded-lg block w-full p-2.5"
                placeholder="...."
                onChange={(e) => setCredentials({ ...credentials, pin: e.target.value })}
              />
            </div>

            <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              Next
            </button>

            <p className="text-sm text-center font-light text-gray-500">
              Already have an account?{" "}
              <a className="font-medium text-blue-600 hover:underline" href="/signin">
                Sign in here
              </a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}