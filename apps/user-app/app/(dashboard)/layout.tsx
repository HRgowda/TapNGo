"use client"

import { useState } from "react";
import { SidebarItem } from "@components/SidebarItem";
import { ProfileCard } from "@components/ProfileCard";
import { FaHome, FaExchangeAlt, FaWallet, FaList, FaChartLine } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const router = useRouter();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex min-h-screen bg-gray-800 text-white">
            {/* Appbar */}
            <header className="fixed top-0 left-0 right-0 z-10">
                <div className="flex items-center justify-between bg-gray-900 h-16 px-4 shadow-md border-b border-slate-300">
                    <button className="lg:hidden text-white text-2xl" onClick={toggleSidebar}>
                        &#9776;
                    </button>
                    <div className="flex-1 text-3xl font-semibold font-mono text-center cursor-pointer" onClick={() => router.push('/landing')}>
                        tapNgo
                    </div>
                </div>
            </header>

            {/* Sidebar */}
            <aside
                className={`fixed top-16 left-0 z-20 flex flex-col justify-between h-[calc(100vh-4rem)] w-80 bg-gray-900 shadow-lg p-4 transition-transform duration-300 lg:translate-x-0 ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                } lg:flex`}
            >
                <div className="space-y-4">
                    {/* Sidebar Items */}
                    <SidebarItem href="/home" title="Home" icon={<FaHome />} />
                    <SidebarItem href="/transfer" title="Transfer" icon={<FaExchangeAlt />} />
                    <SidebarItem href="/deposit" title="Deposit" icon={<FaWallet />} />
                    <SidebarItem href="/transactions" title="Transactions" icon={<FaList />} />
                    <SidebarItem href="/insights" title="Insights" icon={<FaChartLine />} />
                </div>
                <ProfileCard />
            </aside>

            {/* Main Content */}
            <main className="flex-1 lg:ml-80 p-2 pt-20 lg:pt-16">
                {children}
            </main>

            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div className="fixed inset-0 z-10 bg-black opacity-50 lg:hidden" onClick={toggleSidebar}></div>
            )}
        </div>
    );
}


