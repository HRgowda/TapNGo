"use client";

import { Card } from "@repo/ui/card";
import { MagnifyingGlassIcon, QrCodeIcon } from "@heroicons/react/24/solid";
import Modal from "@components/transfer/Modal";
import { useState } from "react";

interface SendCardProps {
  balance: number;
  userDetails: { id: number; firstName: string }[];
}

export function SendCard({ balance, userDetails }: SendCardProps) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);

  const handleScanSuccess = (data: string) => {
    setScanResult(data);
    setShowQRScanner(false);
  };

  return (
    <div className="w-full">
      <Card title="Send Money">
        <div className="text-gray-300">Effortlessly perform P2P money transfers</div>

        <div className="pt-6 text-lg text-white">
          <div className="font-medium">Available Balance</div>
          <div className="font-bold text-2xl">₹{balance}</div>
        </div>

        {/* Button Container with Responsive Design */}
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-4 mt-8">
          <button
            className="w-full sm:w-1/2 rounded-full py-2 px-2 text-white text-lg flex items-center justify-center bg-gradient-to-r from-blue-400 to-blue-800 hover:from-blue-800 hover:to-blue-400"
            onClick={() => setModalOpen(true)}
          >
            <MagnifyingGlassIcon className="h-6 w-6 text-white mr-2" />
            Search
          </button>

          <button
            className="w-full sm:w-1/2 rounded-full py-2 px-2 text-white text-lg flex items-center justify-center bg-gradient-to-r from-blue-400 to-blue-800 hover:from-blue-800 hover:to-blue-400"
            
          >
            <QrCodeIcon className="h-6 w-6 text-white mr-2" />
            Scan QR (comming soon)
          </button>
        </div>

        {/* Modal and QR Scanner Components */}
        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} users={userDetails} />

        {scanResult && (
          <div className="mt-4 text-sm text-gray-300">
            <div>Scan Result:</div>
            <div>{scanResult}</div>
          </div>
        )}
      </Card>
    </div>
  );
}
