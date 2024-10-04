"use client";

import { Card } from "@repo/ui/card";
import { MagnifyingGlassIcon, QrCodeIcon } from "@heroicons/react/24/solid";
import Modal from "@components/transfer/Modal";
import { useState } from "react";
import QRScanner from "@components/transfer/QrScanner"; // Import the QRScanner component

interface SendCardProps {
  balance: number;
  userDetails: { id: number; firstName: string }[];
}

export function SendCard({ balance, userDetails }: SendCardProps) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [showQRScanner, setShowQRScanner] = useState(false); // State to toggle QR scanner
  const [scanResult, setScanResult] = useState<string | null>(null); // Store scanned QR data

  // Function to handle the result from QRScanner
  const handleScanSuccess = (data: string) => {
    setScanResult(data);
    setShowQRScanner(false); // Close the scanner after scan
  };

  return (
    <div className="w-full">
      <Card title="Send and Receive">
        <p className="text-gray-300">
          Effortlessly perform P2P money transfers
        </p>

        <div className="pt-4 text-lg text-white">
          <h1 className="font-medium">Available Balance</h1>
          <p className="font-bold">₹{balance}</p>
        </div>

        <div className="flex justify-evenly w-full space-x-8 mt-8">
          <div className="w-1/2 flex justify-center">
            <button
              className="w-full rounded-full py-2 px-2 bg-blue-600 text-white text-lg flex items-center justify-center hover:bg-blue-700"
              onClick={() => setModalOpen(true)} // Open modal
            >
              <MagnifyingGlassIcon className="h-6 w-6 text-white" />
              <span className="mr-2">Search</span>
            </button>
          </div>

          <div className="w-1/2 flex justify-center">
            <button
              className="w-full rounded-full py-2 px-2 bg-blue-600 text-white text-lg flex items-center justify-center hover:bg-blue-700"
              onClick={() => setShowQRScanner(true)} // Open QR Scanner
            >
              <QrCodeIcon className="h-6 w-6 text-white" />
              <span className="mr-2">Scan QR</span>
            </button>
          </div>
        </div>

        {/* Modal component */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)} // Close modal
          users={userDetails} // Pass user names to Modal
        />

        {/* Conditionally render the QRScanner component */}
        {showQRScanner && (
          <QRScanner
            onScanSuccess={handleScanSuccess} // Handle successful scan
            onClose={() => setShowQRScanner(false)} // Handle closing the scanner
          />
        )}

        {/* Display scan result if QR code is scanned */}
        {scanResult && (
          <div className="mt-4">
            <h2>Scan Result:</h2>
            <p>{scanResult}</p>
          </div>
        )}
      </Card>
    </div>
  );
}
