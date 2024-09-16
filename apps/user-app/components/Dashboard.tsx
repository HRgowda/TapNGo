
interface cardProps {
  name: string;
  cardNumber: string;
  validity: string;
  expiry: string;
  cvv: number
}

export function Dashboard({name, cardNumber, validity, expiry, cvv} : cardProps){
  // rom-gray-900 via-blue-800 to-gray-900
  return <div>
        <div className="px-8 py-3 bg-gradient-to-r from-indigo-900 via-blue-600 to-purple-700 text-white rounded-xl w-[50vh] h-[31vh]  shadow-2xl">
          <div>

          <div className="pt-1">
            <div className="flex justify-between">
              <div>

                <div className="text-xl font-light font-light">
                  Name
                </div>
                <div className="text-lg font-medium">
                  {name}
                </div>
              </div>

              <div>
              <img className="w-14 h-14" src="https://i.imgur.com/bbPHJVe.png" alt="" />
              </div>

          </div>

          <div className="pt-3">
              <div className="text-xl font-light">
                Card Number
              </div>
              <div className="text-lg font-medium">
                {cardNumber}
              </div>
          </div>
        </div>

          <div className="pt-4 flex justify-between">
            <div>
              <div className="text-xl font-light">
                Valid
              </div>
              <div className="text-lg font-medium">
                {validity}
              </div>

            </div>
            <div>
              <div className="text-xl font-light">
                Expiry
              </div>
              <div className="text-lg font-medium">
                {expiry}
              </div>

            </div>
            <div>

              <div className="text-xl font-light">
                CVV
              </div>
              <div className="text-lg font-medium">
                {cvv}
              </div>

            </div>
          </div>
          </div>
          
        </div>
      </div>
}