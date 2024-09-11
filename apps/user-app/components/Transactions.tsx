"use client"

import { Card } from "@repo/ui/card"

interface onRampProps{
  time: Date;
  amount: number;
  status: string;
}

interface p2pProps{
  amount: number;
  timestamp: Date;
}

export function Transactions({banktxn = [], p2ptxn = []}:{banktxn:onRampProps[], p2ptxn:p2pProps[]}){

  if (!banktxn.length && !p2ptxn.length){
    return (      
      <Card title="Transactions">
        <div className="text-center pb-8 ">
          No recent transactions
        </div>      
      </Card>     
    )
  } else if (!banktxn.length){
    return ( <div className="p-8 flex justify-evenly">
      
      <Card title="Bank Transactions">
        <div className="text-center pb-8 ">
          No recent bank transactions
        </div>        
      </Card>

      <Card title="P2P Transactions">
        <div className="pt-2 w-[60vh]">
          {p2ptxn.map(tx => <div className="flex justify-between">
            <div>
                <div className="text-sm font-semibold">
                  Recieved INR
                </div>
                <div>
                  {tx.timestamp.toDateString()}
                </div>
            </div>
              <div className="flex justify-center flex-col">
                +Rs{tx.amount / 100}
              </div>
            </div>
              )}
          </div> 
        </Card>
    </div> 
    )
  } else if (!p2ptxn.length) {
    return (  <div className="p-8 flex justify-evenly">
      <Card title="Bank Transactions">
        <div className="pt-2 w-[60vh]">
          {banktxn.map(tx =>  <div className="pb-2 flex justify-between">
            <div>
                <div className="text-sm font-semibold">
                  Recieved INR
                </div>
  
                <div>
                  {tx.time.toDateString()}
                </div>
            </div>
              <div className="flex justify-center flex-col">
                +Rs{tx.amount / 100}
              </div>      
          </div>    
          )}
        </div>
      </Card>

      <Card title="P2P Transactions">
        <div className="text-center pb-8 ">
          No recent p2p transactions
        </div>      
      </Card>
  </div>      
  )
  } else{
    return <div className="p-8 flex justify-evenly">  
      <Card title="Bank Transactions">
        <div className="pt-2 w-[60vh]">
          {banktxn.map(tx =>  <div className="pb-2 flex justify-between">
            <div>
                <div className="text-sm font-semibold">
                  Recieved INR
                </div>
  
                <div>
                  {tx.time.toDateString()}
                </div>
            </div>
              <div className="flex justify-center flex-col">
                +Rs{tx.amount / 100}
              </div>      
          </div>    
          )}
        </div>
      </Card>
  
      <Card title="P2P Transactions">
        <div className="pt-2 w-[60vh]">
          {p2ptxn.map(tx => <div className="flex justify-between">
            <div>
                <div className="text-sm font-semibold">
                  Recieved INR
                </div>
                <div>
                  {tx.timestamp.toDateString()}
                </div>
            </div>
              <div className="flex justify-center flex-col">
                +Rs{tx.amount / 100}
              </div>
  
            </div>
              )}
          </div> 
      </Card>
   </div>
  }
}
