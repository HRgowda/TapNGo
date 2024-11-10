// QrScanner.tsx
"use client";

import React, { useEffect, useRef } from "react";
import { Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode";

interface QRScannerProps {
  onScanSuccess: (data: string) => void;
  onClose: () => void;
}

const QrScanner: React.FC<QRScannerProps> = ({ onScanSuccess, onClose }) => {
  const scannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scannerRef.current) return;

    const config = {
      fps: 10,
      qrbox: { width: 250, height: 250 },
      aspectRatio: 1.0,
      supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
    };

    const html5QrcodeScanner = new Html5QrcodeScanner(
      "qr-reader",
      config,
      false
    );

    html5QrcodeScanner.render(
      (decodedText) => {
        onScanSuccess(decodedText);
        html5QrcodeScanner.clear(); // Stop scanning once a QR code is read
      },
      (errorMessage) => {
        console.error("QR Code scan error:", errorMessage);
      }
    );

    return () => {
      html5QrcodeScanner.clear().catch(console.error); // Clean up
    };
  }, [onScanSuccess]);

  return (
    <div className="qr-scanner-container">
      <div id="qr-reader" ref={scannerRef}></div>
      <button onClick={onClose} className="mt-4 bg-red-500 text-white py-2 px-4 rounded">
        Close Scanner
      </button>
    </div>
  );
};

export default QrScanner;
