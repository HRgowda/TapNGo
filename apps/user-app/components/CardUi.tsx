interface CardProps {
  name: string | undefined;
  cardNumber: string | undefined;
  validity: string | undefined;
  expiry: string | undefined;
  cvv: number | undefined;
}

export function CardUi({
  name,
  cardNumber,
  validity,
  expiry,
  cvv,
}: CardProps) {
  // Function to format the card number with spaces
  const formatCardNumber = (number: string): string => {
    let result = '';
    for (let i = 0; i < number.length; i++) {
      if (i > 0 && i % 4 === 0) {
        result += ' '; 
      }
      result += number[i];
    }
    return result;
  };

  // Format the card number only if it's defined
  const formattedCardNumber = cardNumber ? formatCardNumber(cardNumber) : '';

  return (
    <div>
      <div className="px-8 py-3 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 text-white rounded-xl w-[50vh] h-[31vh] shadow-xl">
        <div>
          <div className="pt-1">
            <div className="flex justify-between">
              <div>
                <div className="text-xl font-light">Name</div>
                <div className="text-lg font-medium">{name}</div>
              </div>
              <div>
                <img className="w-14 h-14" src="/Images/mastercard.png" alt="" />
              </div>
            </div>

            <div className="pt-3">
              <div className="text-xl font-light">Card Number</div>
              <div className="text-lg font-medium">{formattedCardNumber}</div>
            </div>
          </div>

          <div className="pt-4 flex justify-between">
            <div>
              <div className="text-xl font-light">Valid</div>
              <div className="text-lg text-center font-medium">{validity}</div>
            </div>
            <div>
              <div className="text-xl font-light">Expiry</div>
              <div className="text-lg text-center font-medium">{expiry}</div>
            </div>
            <div>
              <div className="text-xl font-light">CVV</div>
              <div className="text-lg text-center font-medium">{cvv}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
