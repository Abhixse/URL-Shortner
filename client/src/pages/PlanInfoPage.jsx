import React from "react";
import { Package, CheckCircle } from "lucide-react";

const PlanInfoPage = () => {
  const plan = {
    name: "Pro Plan",
    price: "$19/month",
    features: [
      "Custom Domains",
      "Advanced Analytics",
      "Priority Support",
      "Unlimited Team Members",
    ],
    nextBillingDate: "2025-09-01",
  };

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-xl font-bold mb-6 flex items-center gap-2">
        <Package size={22} className="text-green-600" /> Plan Information
      </h1>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold">{plan.name}</h2>
        <p className="text-gray-500">{plan.price}</p>
        <p className="text-sm text-gray-500 mt-1">
          Next Billing Date: {plan.nextBillingDate}
        </p>

        <h3 className="mt-4 font-semibold">Features</h3>
        <ul className="mt-2 space-y-2">
          {plan.features.map((f, idx) => (
            <li key={idx} className="flex items-center gap-2 text-sm">
              <CheckCircle size={16} className="text-green-600" /> {f}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex gap-3">
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Upgrade
          </button>
          <button className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">
            Cancel Subscription
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlanInfoPage;
