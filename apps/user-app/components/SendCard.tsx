"use client"

import { Card } from "@repo/ui/card"
import { TextInput } from "@repo/ui/textinput"
import { Button } from "@repo/ui/button"
import { Center } from "@repo/ui/center"
import { useState } from "react"
import { P2PTransfer } from "../app/lib/actions/p2ptxn"

export function SendCard(){
  const [number, setNumber] = useState("")
  const [amount, setAmount] = useState("")
  return <div className="h-[60vh]">
    <Center>
      <Card title="Send Money">
        <div className="min-w-71 pt-2 ">

          <TextInput label={"Phone Number"} placeholder={"123456789"} onChange={(value) => {setNumber(value)}} ></TextInput>

          <TextInput label={"Amount"} placeholder={"1000"} onChange={(value)=> {setAmount(value)}}/>

          <div className="flex justify-center pt-4">
            <Button onClick={async()=> {
              await P2PTransfer(number, Number(amount)*100)
            }}>Send</Button>  
          </div>

        </div>
      </Card>
    </Center>
  </div>
}