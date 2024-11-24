"use client"

import { useRouter } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
    const router = useRouter();   

    return (
        <div className="flex min-h-screen bg-gray-800 text-white">
            {/* Appbar */}
            <header className="fixed top-0 left-0 right-0 z-10">
                <div className="flex items-center justify-between bg-gray-900 h-16 px-4 shadow-md border-b border-slate-300">
                    
                    <div className="flex-1 text-3xl font-semibold font-mono text-center cursor-pointer" onClick={() => router.push('/landing')}>
                        tapNgo
                    </div>
                </div>
            </header>            

            <main className="bg-[#121212] w-full p-2 pt-20 lg:pt-16">
                {children}
                <div>
                  <p className="text-gray-400 text-center mt-2">&copy; 2024 TapNGo. All rights reserved.</p>
                </div>
            </main>

            

            
        </div>
    );
}


