"use client";

import React from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <style jsx>{`
        @keyframes custom-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
      <div className="flex flex-row justify-center gap-2">
        <div className="w-4 h-4 rounded-full bg-white border border-black animate-[custom-bounce_2s_infinite]"></div>
        <div className="w-4 h-4 rounded-full bg-white border border-black animate-[custom-bounce_2s_infinite] [animation-delay:-0.3s]"></div>
        <div className="w-4 h-4 rounded-full bg-white border border-black animate-[custom-bounce_2s_infinite] [animation-delay:-0.5s]"></div>
      </div>
    </div>
  );
}
