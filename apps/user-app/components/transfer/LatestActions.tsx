"use client"

import { SendModal } from "@components/transfer/SendModal";
import { useState } from "react";

interface actionsProps {
  users: {id: number, firstName: string}[];
  allUsers: {id: number, firstName:string}[];
}

export function LatestActions({ users, allUsers }: actionsProps) {

  const [sendModalOpen, setSendModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<{id: number, firstName: string} | null>(null);

  const handleAvatarClick = (user: { id: number; firstName: string }) => {
    setSelectedUser(user); 
    setSendModalOpen(true); // Open the modal
  };

  const handleClose = () => {
    setSendModalOpen(false)
    setSelectedUser(null)
  }

  // Filter unique user names using filter and indexOf
  const uniqueUsers = users.filter(
    (user, index, self) => index === self.findIndex(u => u.id === user.id));

  return (
    <div className="bg-gray-900 rounded-xl h-full text-white p-4">
      <h1 className="text-xl font-bold">Latest Actions</h1>
      <div>
        <p className="text-gray-300 mt-2">Your most recent transactions</p>
      </div>
      <div className="flex justify-start space-x-8 mt-4">
        {uniqueUsers.map((user, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white mb-2 object-cover cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110" onClick={() => handleAvatarClick(user)}>
              <img
                src="/Images/avatar.png"
                alt="Profile image"
                className="w-full h-full"
              />
            </div>
            <span className="text-gray-200 text-center">{user.firstName}</span>
          </div>
        ))}
      </div>

      {selectedUser && (
        <SendModal isOpen={sendModalOpen} onClose={handleClose} recieverId={selectedUser.id} recieverName={selectedUser.firstName}>
          {selectedUser.firstName}
        </SendModal>
      )}

      <h1 className="text-xl font-bold mt-8">TapNGo Users</h1>
      <div>
        <p className="text-gray-300 mt-2">Quick payments to recently onboarded users.</p>
      </div>
      <div className="flex justify-start space-x-8 mt-4">
        {allUsers.map((user, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white mb-2 object-cover cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110" onClick={() => handleAvatarClick(user)}>
              <img
                src="/Images/avatar.png"
                alt="Profile image"
                className="w-full h-full"
              />
            </div>
            <span className="text-gray-200 text-center">{user.firstName}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
