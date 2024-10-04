import React, { useEffect, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { SendModal } from "@components/transfer/SendModal"

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  users: {id: number, firstName: string}[];
}

export default function Modal({ isOpen, onClose, users }: ModalProps){
  const [searchInput, setSearchInput] = useState('');
  const [sendModalOpen, setSendModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<{id: number, firstName: string} | null>(null);

  // Prevent rendering if the modal is not open
  if (!isOpen) return null;

  // Filter the users based on the search term
  const filteredUsers = users.filter(user => 
    user.firstName.toLowerCase().includes(searchInput.toLowerCase())
  );

  // Handle clicks outside the modal to close it
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSend = (user: {id: number, firstName: string}) => {
    setSendModalOpen(true);
    setSelectedUser(user);
  }

  return (
    <div className="text-white fixed inset-0 flex items-center justify-center bg-black bg-opacity-70"
     onClick={handleOverlayClick}> 

      <div className="bg-gray-900 border-2 border-blue-500 rounded-lg p-5 relative w-[32rem]">
        <button className="absolute top-2 right-2"
          onClick={onClose} >
          <XMarkIcon className="h-6 w-6 text-white" /> 
        </button>
        <h2 className="text-xl font-bold mb-4">Search for Users</h2>
        <input type="text" 
          className="w-full text-white text-md font-semibold border-b bg-gray-800 p-2 rounded-lg" 
          placeholder="Type a name..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)} />
    
        {/* Scrollable user list */}
        <ul className="mt-4 max-h-60 overflow-y-auto">
          {filteredUsers.map((user, index) => (
            <li key={index} className="p-2 flex justify-between border-b hover:bg-slate-700 hover:text-white">
              <div className='flex flex-row justify-center items-center space-x-2'>
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white">
                  <img
                    src="/Images/avatar.png"
                    alt="Profile Image"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className='font-semibold text-lg'>
                  {user.firstName}
                </div>
              </div>

              <div className='flex items-center flex-row'>
              <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={() => handleSend(user)}>Send-{`>`}</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      
      {sendModalOpen && selectedUser &&(
        <SendModal isOpen={sendModalOpen} onClose={()=>{
          setSendModalOpen(false)}} recieverId={Number(selectedUser.id)} recieverName={selectedUser.firstName}>

        </SendModal>
      )}

    </div>


  );
};