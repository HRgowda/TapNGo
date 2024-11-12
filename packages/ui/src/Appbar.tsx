"use client"

import { useRouter } from "next/navigation";

export function Appbar() {
    const route = useRouter();

    return (
        <div className="fixed top-0 left-0 right-0 z-10 flex items-center justify-center bg-gray-900 border-b border-slate-300 h-16 p-4">
    <div 
        className="text-3xl font-semibold font-mono text-white cursor-pointer transition-transform transform hover:underline"
        onClick={() => {
            route.push('/landing');
        }}
    >
        tapNgo
    </div>
</div>

    );
}
