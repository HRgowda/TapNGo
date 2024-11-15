"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { signIn } from "next-auth/react"; // Import signIn from NextAuth
import { alertMessage as AlertMessage } from "@components/AlertMessage";

export function SignUp() {
  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    password: "",
    pin: "",
  });

  const [alertMessage, setAlertMessage] = useState<{ message: string; status: "success" | "failure" } | null>(null);

  const [loading, setLoading] = useState<boolean | null>(false)

  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)

    try {
      // Step 1: Sign up the user
      const response = await axios.post('/api/auth/signup', credentials);

      if (response.status === 200) {
        setAlertMessage({message: response.data.message, status: "success"});
        setTimeout(() => {
          setAlertMessage(null)
        }, 4000)
        // Step 2: Automatically sign in the user
        const signInResponse = await signIn("credentials", {
          redirect: false, // Prevent redirect, we handle it manually
          email: credentials.email,
          password: credentials.password,
        });

        // Check if sign-in was successful
        if (signInResponse?.ok) {
          router.push('/card_data');
          setLoading(false)
        } else {
          setAlertMessage({message: "Sign-in failed. Please check your credentials.", status: "failure"});
        }
      }
    } catch (e) {
      setAlertMessage({message: "Failed to create account.", status: "failure"});
    }
  };

  return (
    <section className="flex flex-col items-center text-white py-14">
      <div className="w-full bg-[#121212] md:mt-0 sm:max-w-md">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl text-center font-bold md:text-2xl">Sign Up</h1>
          <p className="text-whit font-thin text-center">Create an Account</p>
          <form className="space-y-4 md:space-y-6 font-semibold text-lg" onSubmit={submit}>
            <div className="flex justify-center gap-4">
              <div>
                <label className="block mb-2 font-semibold text-sm">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  className="border bg-[#121212] border-white/50 sm:text-sm rounded-lg block w-full p-2.5"
                  placeholder="Emelia"
                  onChange={(e) => setCredentials({ ...credentials, firstName: e.target.value })}
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-sm">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  className="border bg-[#121212] border-white/50 sm:text-sm rounded-lg block w-full p-2.5"
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
                className="border bg-[#121212] border-white/50 sm:text-sm rounded-lg block w-full p-2.5"
                placeholder="emelia_erickson24"
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold">Password</label>
              <input
                type="password"
                name="password"
                className="border bg-[#121212] border-white/50 sm:text-sm rounded-lg block w-full p-2.5"
                placeholder="••••••••"
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold">Pin</label>
              <input
                type="text"
                name="pin"
                className="border bg-[#121212] border-white/50 sm:text-sm rounded-lg block w-full p-2.5"
                placeholder="...."
                onChange={(e) => setCredentials({ ...credentials, pin: e.target.value })}
              />
            </div>

            <button type="submit" className="w-full text-black bg-white hover:bg-white/70 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              {loading ? "Signing..." : "Next"}
            </button>

            <div className="text-sm text-center font-light text-gray-500">
              Already have an account?{" "}
              <a className="font-medium text-white hover:underline" href="/signIn">
                Sign in here
              </a>
            </div>
          </form>
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