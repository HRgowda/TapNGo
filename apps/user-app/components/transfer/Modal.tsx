import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { SendModal } from "@components/transfer/SendModal";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  users: { id: number; firstName: string }[];
}

export default function Modal({ isOpen, onClose, users }: ModalProps) {
  const [searchInput, setSearchInput] = useState('');
  const [sendModalOpen, setSendModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<{ id: number; firstName: string } | null>(null);

  if (!isOpen) return null;

  const filteredUsers = users.filter(user =>
    user.firstName.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSend = (user: { id: number; firstName: string }) => {
    setSendModalOpen(true);
    setSelectedUser(user);
  };

  return (
    <div
      className="text-white fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 px-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-gray-900 border-2 border-blue-500 rounded-lg p-5 relative w-auto max-w-lg lg:w-[32rem]">
        <button className="absolute top-2 right-2" onClick={onClose}>
          <XMarkIcon className="h-6 w-6 text-white" />
        </button>
        <div className="text-xl font-bold mb-4">Search for Users</div>
        <input
          type="text"
          className="w-full text-white text-md font-semibold border-b bg-gray-800 p-2 rounded-lg"
          placeholder="Type a name..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />

        {/* Scrollable user list */}
        <ul className="mt-4 max-h-60 overflow-y-auto space-y-2">
          {filteredUsers.map((user, index):any => (
            <li
              key={index}
              className="p-2 flex justify-between items-center space-x-8 border-b hover:bg-slate-700 hover:text-white"
            >
              <div className="flex items-center space-x-2">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white">
                  <img
                    src="/Images/avatar.png"
                    alt="Profile Image"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="font-semibold text-lg">{user.firstName}</div>
              </div>

              <button
                type="button"
                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2"
                onClick={() => handleSend(user)}
              >
                Send - {`>`}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {sendModalOpen && selectedUser && (
          <SendModal
            isOpen={sendModalOpen}
            onClose={() => setSendModalOpen(false)}
            recieverId={selectedUser.id}
            recieverName={selectedUser.firstName}
          >
            {/* Children content here if needed */}
            {selectedUser.firstName}
          </SendModal>
      )}

    </div>
  );
}
