"use client"

import { SendCard } from "../../../components/SendCard"
import { useRouter } from "next/navigation"

export default async function () {
  const route = useRouter();
  return <div className="w-full">
    <div className="text-4xl font-semibold pt-10 mb-4 text-[#6a51a6] cursor-pointer" onClick={() => {
      route.push('p2ptransfer');
    }}>
      P2P Transfer
    </div>
    <SendCard />
  </div>
}