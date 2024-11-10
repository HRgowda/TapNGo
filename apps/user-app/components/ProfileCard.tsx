"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react"; // Client-side hook for session data

export function ProfileCard() {
  const { data: session } = useSession(); // Fetch session data on the client side
  const userName = session?.user?.name || "Guest";

  return (
    <div className="border-b p-2 m-4 rounded-3xl">
      <div className="flex justify-between items-center">
        {/* Avatar */}
        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white">
          <img
            src="/Images/avatar2.png"
            alt="Profile Image"
            className="w-full h-full object-cover"
          />
        </div>

        {/* User Name */}
        <div className="text-white text-center font-semibold">{userName}</div>

        {/* Logout Button */}
        <div>
          <button
            className="text-white text-sm py-2 px-4 rounded-xl transition duration-300 ease-in-out hover:bg-blue-600 hover:shadow-xl"
            onClick={() => {
              signOut({ callbackUrl: "/signIn" });
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
