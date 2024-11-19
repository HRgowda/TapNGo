"use client";

import { useState } from "react";
import { GoalsModal } from "@components/deposit/DepositGoalModal";

export function InitialGoalUi({userid}: {userid: number}) {

  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div id="vision-vault">
      <div className="bg-gray-900 border border-gray-500 text-white rounded-xl shadow-lg p-6">
        <div className="font-extrabold text-4xl text-start bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 mb-6">
          Fund the Future: Save with Purpose
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 shadow-inner">
          {/* Vision Vault Introduction */}
          <div className="p-8 bg-gray-800 rounded-lg shadow-2xl">
            <div className="font-extrabold text-2xl text-center mb-6 p-4 border-b border-blue-500">
              Introducing Vision Vault
            </div>

            <div className="text-lg mt-4 leading-relaxed text-gray-200 text-center">
              "Your dreams deserve a plan. Whether it's for health, education, or adventure, Vision Vault helps you save for the future you've always envisioned. Unlock your potential with every deposit."
            </div>

            <div className="mt-10 text-center">
              <button
                className="bg-gradient-to-r from-blue-400 to-blue-700 text-white py-3 px-8 rounded-full hover:from-blue-700 hover:to-blue-400 transition-colors duration-300 shadow-xl"
                onClick={() => setModalOpen(true)}
              >
                Start Saving Today
              </button>
            </div>
          </div>

          <div className="p-8 bg-gray-800 rounded-lg shadow-2xl">
            <div className="font-extrabold text-2xl text-center mb-6 p-4 border-b border-blue-500">
              Save Now, Thrive Later! 🌱
            </div>

            <div className="text-lg mt-4 leading-relaxed text-gray-200 text-center">
              "Your financial safety is our top priority. With robust security measures in place, your savings are protected. Our application provides a seamless and secure experience."
            </div>

            <div className="mt-10 text-center">
              <div className="font-semibold text-xl">Begin Your Journey 🚀</div>
              <div className="mt-2 text-gray-300">
                Let us help you build a brighter financial future!
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Conditionally render GoalsModal */}
      {isModalOpen && (
        
        <GoalsModal uiProps={{isOpen: isModalOpen, onClose: () => setModalOpen(false)}} userId={userid} title="Set Your Deposit Goal" subTitle1="Select a Goal Type" subTitle2="Goal Amount" goalAction="create"></GoalsModal>
      )}

    </div>
  );
}
