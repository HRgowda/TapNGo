import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Button } from "@repo/ui/button";
import { alertMessage as AlertMessage } from "@components/AlertMessage";
import axios from "axios";

interface BankModalProps {
  isOpen: boolean;
  onClose: () => void;
  provider: string;
  amount: number;
  transactionToken: string | null;
  id: number;
}

export function BankModal({
  isOpen,
  onClose,
  provider,
  amount,
  transactionToken,
  id,
}: BankModalProps) {
  const [alertMessage, setAlertMessage] = useState<{ message: string; status: "success" | "failure" } | null>(null);
  const [pin, setPin] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpLoading, setIsOtpLoading] = useState(false); // New state for OTP button loading
  const [isOtpMode, setIsOtpMode] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  if (!isOpen) return null;

  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const onCloseOtp = () => {
    setIsOtpMode(false)
    onClose()
  }

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setAlertMessage(null);
      setPin("");
      setEmail("");
      setOtp("");
      setIsOtpMode(false);
      onClose();
    }
  };

  const handleSendOtp = async () => {
    if (!email) {
      setAlertMessage({ message: "Please enter the email.", status: "failure" });
      setTimeout(() => setAlertMessage(null), 2000);
      return;
    }
  
    setIsOtpLoading(true); // Set OTP loading to true
  
    try {
      const response = await axios.post("/api/auth/send_otp", { email });
  
      if (response.status === 200) {
        setAlertMessage({ 
          message: response.data.message,
          status: "success" 
        });
        setTimeout(() => {
          setAlertMessage(null)
        } 
        , 2000);
      } else if (response.status === 400) {
        setAlertMessage({ 
          message: response.data.message, 
          status: "failure" 
        });
        setTimeout(() => {
          setAlertMessage(null)
          setEmail("")
        }, 3000);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 500) {
          setAlertMessage({ 
            message: "Failed to send OTP, try again later.", 
            status: "failure"
           });
        } else {
          setAlertMessage({ 
            message: error.response?.data?.message || "An unexpected error occurred.", 
            status: "failure"
           });
        }
      } else {
        setAlertMessage({ 
          message: "An unexpected error occurred.", 
          status: "failure" 
        });
      }
      setTimeout(() => setAlertMessage(null), 2000);
    } finally {
      setIsOtpLoading(false); // Reset OTP loading state
    }
  }; 


  const handleDepositwithPin = async () => {
    if (!pin) {
      setAlertMessage({
        message: "Please enter a valid pin",
        status: "failure",
      });
      setTimeout(() => {
        setAlertMessage(null);
        setPin("");
      }, 2000);
      return;
    }

    setIsLoading(true);

    try {
      const deposit = await axios.post(`http://localhost:3003/complete_onramp`, {
        token: transactionToken,
        user_identifier: id,
        amount,
        pin,
      });

      if (deposit.status === 200) {
        setAlertMessage({
          message: deposit.data.message,
          status: "success",
        });
        setTimeout(() => {
          setAlertMessage(null);
          setPin("");
          onClose();
        }, 3000);
      }
    } catch (error) {
      
      const errorMessage = axios.isAxiosError(error) && error.response && error.response.data.message
          ? error.response.data.message
          : "Failed to initiate deposit. Please try again later.";

      setAlertMessage({
        message: errorMessage,
        status: "failure",
      });

      setTimeout(() => {
        setAlertMessage(null);
        setPin("");
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDepositWithOtp = async () => {
    if (!otp || isNaN(Number(otp))) {
      setAlertMessage({ message: "Please enter a valid numeric OTP.", status: "failure" });
      setTimeout(() => setAlertMessage(null), 2000);
      return;
    }

    setIsLoading(true);

    try {
      const otpResponse = await axios.post("/api/auth/verify_otp", { email, otp });

      if (otpResponse.status === 200) {
        // If PIN is not required, pass it as undefined
        const onRampResponse = await axios.post(`http://localhost:3003/complete_onramp`, {
          token: transactionToken,
          user_identifier: id,
          amount,
          pin: undefined,
        });

        if (onRampResponse.status === 200) {
          setAlertMessage({
            message: onRampResponse.data.message,
            status: "success",
          });

          setTimeout(() => {
            setAlertMessage(null);
            setEmail("");
            setOtp("");
            setIsOtpMode(false);
            onClose();
          }, 2000);
        } else {
          setAlertMessage({
            message: "Transaction failed: " + onRampResponse.data.message,
            status: "failure",
          });
          setTimeout(() => {
            setAlertMessage(null);
            setEmail("");
          }, 2000);
        }
      } else {
        setAlertMessage({
          message: otpResponse.data.message,
          status: "failure",
        });
        setTimeout(() => {
          setAlertMessage(null);
          setPin("");
          setEmail("");
          setOtp("");
        }, 5000);
      }
    } catch (error) {

      const errorMessage = axios.isAxiosError(error) && error.response && error.response.data.message ? error.response.data.message : "Failed to complete the transaction.";

      setAlertMessage({ message: errorMessage, status: "failure" });

      setTimeout(() => {
        setAlertMessage(null);
        setOtp("");
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="text-white fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center transition-opacity duration-300"
      onClick={handleOverlayClick}
    >
      <div
        className="flex flex-col bg-gray-900 rounded-lg border-2 border-blue-500 w-[30rem] relative p-6"
        onClick={handleContentClick}
      >
        {alertMessage && (
          <div className="mb-4">
            <AlertMessage description={alertMessage.message} status={alertMessage.status} />
          </div>
        )}

        <div className="flex justify-between items-center mb-4">
          <div className="text-xl font-semibold">Deposit money to your wallet</div>
          <button onClick={onCloseOtp}>
            <XMarkIcon className="h-6 w-6 text-white hover:text-red-500 transition-colors" />
          </button>
        </div>

        {isOtpMode ? (
          <div className="mt-2 flex flex-col items-center">
            <div className="font-semibold text-red-500 text-center">
              ⚠️ Don't close this view!
            </div>
          <div className="mt-6 flex flex-col items-start w-full mb-4">
            <div className="text-white mb-2">
              Enter your registered Email ID
            </div>
            <div className="grid grid-cols-2 space-x-8 flex justify-center ">
                <div className="mt-1 col-span-1">
                  <input
                        id="pin"
                        type="email"
                        className="text-white text-md font-semibold border-b bg-gray-800 p-2 rounded-lg"
                        placeholder="Enter EMAIL"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                </div>
                <div className="mt-1 flex flex-col items-center col-span-1">
                  <Button onClick={handleSendOtp}>{isOtpLoading ? "Sending..." : "Get OTP"}</Button>
                </div>
              </div>
          </div>
        
          {/* OTP Input and Button Section */}
          <div className="flex flex-col items-start w-full mb-4 mt-4">
            <label htmlFor="otp" className="text-white mb-2">
              Enter OTP
            </label>
            <div className="grid grid-cols-2 space-x-8 flex justify-center ">
                <div className="mt-1 col-span-1">
                  <input
                        id="pin"
                        type="email"                        
                        className="text-white text-md font-semibold border-b bg-gray-800 p-2 rounded-lg"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                      />
                </div>
                <div className="mt-1 flex flex-col items-center col-span-1">
                  <Button onClick={handleDepositWithOtp}>{isLoading ? "Processing..." : "Depsoit now"}</Button>
                </div>
              </div>
          </div>
          <div className="text-lg cursor-pointer text-green-300 hover:underline" onClick={() => setIsOtpMode(false)}>
          {`<- Back to PIN`}
        </div>
        </div>        
        ) : (
          <div>
            <div className="mt-6 flex justify-around items-center">
              <div className="flex flex-col items-center space-y-2">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white">
                  <img src={provider === "HDFC Bank" ? "/Images/hdfc.png" : provider === "Axis Bank" ? "/Images/axis.png" : provider === "SBI Bank" ? "/Images/sbi.png" : "/Images/default.png"}
                  alt="Bank logo"
                  className="w-full h-full object-cover" />
                </div>
                <span className="text-white font-medium text-lg">{provider}</span>
              </div>
              <span className="text-white font-medium text-2xl">
                <div className="text-white">
                  Amount
                </div>
                <div className="text-center">
                  Rs {amount}
                </div>
              </span>
            </div>

            <div className="mt-8 ">
              <div className="text-white font-light">
                Enter your tapNgo pin
              </div>
              <div className="grid grid-cols-2 space-x-8 flex justify-center ">
                <div className="mt-1 col-span-1">
                  <input id="pin" type="password" maxLength={4}         className="text-white text-md font-semibold border-b bg-gray-800 p-2 rounded-lg"                      placeholder="Enter PIN" value={pin} onChange={(e) => setPin(e.target.value)} />
                </div>
                <div className="mt-1 flex flex-col items-center col-span-1">
                  <Button onClick={handleDepositwithPin}>{`Deposit ->`}</Button>
                </div>
              </div>
            </div>

            <span className="flex flex-row justify-center mt-4">
              <div className="text-lg text-gray-300">
                Forgot PIN?
              </div>
              <div className="ml-2 text-lg cursor-pointer text-green-300 hover:underline" onClick={() => setIsOtpMode(true)}>
                {`Deposit with OTP ->`}
              </div>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
