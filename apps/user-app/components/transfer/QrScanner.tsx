import { useEffect, useRef } from 'react';
import QrScanner from 'qr-scanner';

interface QRScannerProps {
  onScanSuccess: (data: string) => void;
  onClose: () => void; // Add a prop for closing the scanner
}

const QRScanner = ({ onScanSuccess, onClose }: QRScannerProps) => {
  
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const qrScanner = new QrScanner(
      videoRef.current!,
      (result) => onScanSuccess(result.data),
      { highlightScanRegion: true }
    );
    qrScanner.start().catch(console.error);

    return () => {
      qrScanner.stop();
    };
  }, [onScanSuccess]);

  return (
    <div className="qr-scanner-container flex flex-col justify-center items-center m-4">
      <video ref={videoRef} className="w-full max-h-96" />
      <button
        className="mt-4 py-2 px-4 bg-red-600 text-white rounded-lg"
        onClick={onClose} // Call onClose to stop the scanner and close the component
      >
        Close
      </button>
    </div>
  );
};

export default QRScanner;
