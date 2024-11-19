import React from "react";

export function Card({
  title,
  children
}: {
  title: string,
  children?: React.ReactNode
}): JSX.Element {
  return (
    <div className="p-6 rounded-xl bg-gray-900 transition-shadow duration-300 hover:shadow-lg hover:shadow-white/40 border border-gray-500 ">
      <div className="text-white text-2xl pb-2 font-semibold text-start">
        {title}
      </div>
      <div>
        {children}
      </div>
    </div>
  );
}
