"use client";

import { SendModal } from "@components/transfer/SendModal";
import { useState } from "react";

interface actionsProps {
  users: { id: number; firstName: string }[];
  allUsers: { id: number; firstName: string }[];
}

export function LatestActions({ users, allUsers }: actionsProps) {
  const [sendModalOpen, setSendModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<{ id: number; firstName: string } | null>(null);

  const handleAvatarClick = (user: { id: number; firstName: string }) => {
    setSelectedUser(user);
    setSendModalOpen(true); // Open the modal
  };

  const handleClose = () => {
    setSendModalOpen(false);
    setSelectedUser(null);
  };

  // Filter unique user names using filter and indexOf
  const uniqueUsers = users.filter(
    (user, index, self) => index === self.findIndex(u => u.id === user.id)
  );

  return (
    <div className="bg-gray-900 rounded-xl h-full text-white p-6 transition-shadow duration-300 hover:shadow-lg hover:shadow-white/40">
      <div className="text-xl font-bold">Latest Actions</div>
      <div className="text-gray-300 mt-2">Your most recent transactions</div>

      {/* Grid layout with responsive spacing for user avatars */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:flex lg:space-x-6 lg:space-y-0 lg:flex-wrap lg:justify-start mt-4">
        {uniqueUsers.map((user, index) => (
          <div key={index} className="flex flex-col items-center mb-6 sm:mb-8">
            <div
              className="w-16 h-16 sm:w-14 sm:h-14 md:w-12 md:h-12 lg:w-20 lg:h-20 rounded-full overflow-hidden border-2 border-white mb-3 object-cover cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-lg hover:shadow-white/40"
              onClick={() => handleAvatarClick(user)}
            >
              <img
                src="/Images/avatar.png"
                alt="Profile image"
                className="w-full h-full"
              />
            </div>
            <span className="text-gray-200 text-center text-lg sm:text-base md:text-sm lg:text-base">{user.firstName}</span>
          </div>
        ))}
      </div>

      {selectedUser && (
        <SendModal
          isOpen={sendModalOpen}
          onClose={handleClose}
          recieverId={selectedUser.id}
          recieverName={selectedUser.firstName}
        >
          {selectedUser.firstName}
        </SendModal>
      )}

      <div className="text-xl font-bold mt-6">TapNGo Users</div>
      <div className="text-gray-300 mt-2">Quick payments to recently onboarded users.</div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:flex lg:space-x-6 lg:space-y-0 lg:flex-wrap lg:justify-start mt-4">
        {allUsers.map((user, index) => (
          <div key={index} className="flex flex-col items-center mb-6 sm:mb-8">
            <div
              className="w-16 h-16 sm:w-14 sm:h-14 md:w-12 md:h-12 lg:w-20 lg:h-20 rounded-full overflow-hidden border-2 border-white mb-3 object-cover cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-lg hover:shadow-white/40"
              onClick={() => handleAvatarClick(user)}
            >
              <img
                src="/Images/avatar.png"
                alt="Profile image"
                className="w-full h-full"
              />
            </div>
            <span className="text-gray-200 text-center text-lg sm:text-base md:text-sm lg:text-base">{user.firstName}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
