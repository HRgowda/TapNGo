import React from 'react';
import 'app/animations/Animation.css'; 

interface CreditCardProps {
  name: string;
  cardNumber: string;
  validity: string;
  expiry: string;
  cvv: number;
}

export function CreditCard({ name, cardNumber, validity, expiry, cvv }: CreditCardProps) {
  const formatCardNumber = (number: string): string => number.replace(/(\d{4})(?=\d)/g, '$1 ');

  return (
    <div className="flex justify-center items-center p-2">
      <div className="space-y-8 md:space-y-16">
        <div className="credit-card w-full max-w-xs md:max-w-md lg:max-w-lg h-48 md:h-56 bg-red-100 rounded-xl relative text-white shadow-2xl">
          <img className="relative object-cover w-full h-full rounded-xl" src="/Images/creditCardBg.png" alt="Credit Card Background" />
          <div className="absolute inset-0 flex justify-center items-center">
            <span className="text-5xl text-white opacity-20 rotate-[-30deg] pointer-events-none select-none z-0">tapNgo</span>
          </div>
          <div className="w-full px-4 md:px-8 absolute top-4 md:top-8">
            <div className="flex justify-between">
              <div>
                <p className="text-xs md:text-sm font-light">Name</p>
                <p className="text-sm md:text-base font-medium tracking-widest">{name}</p>
              </div>
              <img className="w-10 h-10 md:w-14 md:h-14" src="/Images/mastercard.png" alt="Card Logo" />
            </div>
            <div className="pt-1">
              <p className="text-xs md:text-sm font-light">Card Number</p>
              <p className="text-sm md:text-base font-medium tracking-more-wider">{formatCardNumber(cardNumber)}</p>
            </div>
            <div className="pt-4 md:pt-6 pr-4 md:pr-6 flex justify-between">
              <div>
                <p className="text-xs font-light">Valid</p>
                <p className="text-xs md:text-sm font-medium tracking-wider">{validity}</p>
              </div>
              <div>
                <p className="text-xs font-light">Expiry</p>
                <p className="text-xs md:text-sm font-medium tracking-wider">{expiry}</p>
              </div>
              <div>
                <p className="text-xs font-light">CVV</p>
                <p className="text-sm font-bold tracking-more-wider">···</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
