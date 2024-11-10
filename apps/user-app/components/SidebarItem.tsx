"use client"
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export const SidebarItem = ({ href, title, icon }: { href: string; title: string; icon: React.ReactNode }) => {
    const router = useRouter();
    const pathname = usePathname();
    const selected = pathname === href;

    return (
        <div 
            className={`flex items-center justify-start text-white cursor-pointer border-b rounded-full m-2 p-2 sm:text-base md:text-lg lg:pl-8 transition-colors duration-100 ease-in-out 
                ${selected ? "bg-slate-700" : "hover:bg-slate-600"}`}
            onClick={() => router.push(href)}
        >
            <div className="pr-2">
                {icon}
            </div>
            <div className="font-bold">
                {title}
            </div>
        </div>
    );
};
