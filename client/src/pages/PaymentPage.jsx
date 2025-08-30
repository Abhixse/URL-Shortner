import React from "react";
import { CreditCard, PlusCircle } from "lucide-react";

const PaymentPage = () => {
  const paymentMethods = [
    { id: 1, type: "Visa", last4: "4242", expiry: "12/26", primary: true },
    { id: 2, type: "Mastercard", last4: "5678", expiry: "05/27", primary: false },
  ];

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-6 flex items-center gap-2">
        <CreditCard size={22} className="text-green-600" /> Payment Methods
      </h1>

      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className="flex justify-between items-center p-4 bg-white shadow rounded-lg"
          >
            <div>
              <p className="font-medium">
                {method.type} •••• {method.last4}
              </p>
              <p className="text-sm text-gray-500">Expiry: {method.expiry}</p>
            </div>
            <div>
              {method.primary ? (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                  Primary
                </span>
              ) : (
                <button className="text-green-600 hover:underline text-sm">
                  Set as Primary
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <button className="mt-6 flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        <PlusCircle size={18} /> Add New Payment Method
      </button>
    </div>
  );
};

export default PaymentPage;
