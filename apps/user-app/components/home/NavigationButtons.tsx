import React from "react";
import Link from "next/link";
import { PaperAirplaneIcon, BanknotesIcon, ClockIcon, ChartBarIcon, ShieldCheckIcon } from "@heroicons/react/24/solid";
import { Card } from "@repo/ui/card";
import "app/Styles/Animation.css";

const features = [
  { icon: PaperAirplaneIcon, text: "Send Money", path: "/transfer" },
  { icon: BanknotesIcon, text: "Deposit Money", path: "/deposit" },
  { icon: ClockIcon, text: "Recent Transactions", path: "/transactions" },
  { icon: ChartBarIcon, text: "Account Visuals", path: "/insights" },
  { icon: ShieldCheckIcon, text: "Vision Vault", path: "/vault" },
];

export default function FeatureButtons() {
  return (
    <Card title="Manage your Finance smoothly !">
      <div className="my-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 justify-center items-center">
        {features.map(({ icon: Icon, text, path }, index) => (
          <div key={index} className="flex flex-col items-center space-y-2">
            <Link href={path}>
              <button 
                className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 text-white shadow-lg transition-transform transform pulse-button hover:scale-110 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50" 
                aria-label={text}
              >
                <Icon className="h-8 w-8" />
              </button>
            </Link>
            <span className="text-lg font-medium text-center text-gray-300">
              {text}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
