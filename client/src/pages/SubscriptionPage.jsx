import React from "react";
import { Crown, CheckCircle } from "lucide-react";

const SubscriptionPage = () => {
  const plans = [
    {
      name: "Free Plan",
      price: "$0 / month",
      features: ["1 Domain", "Basic Analytics", "Community Support"],
      current: false,
    },
    {
      name: "Pro Plan",
      price: "$19 / month",
      features: [
        "5 Domains",
        "Advanced Analytics",
        "Priority Support",
        "Custom Branding",
      ],
      current: true,
    },
    {
      name: "Enterprise Plan",
      price: "$49 / month",
      features: [
        "Unlimited Domains",
        "Team Collaboration",
        "Dedicated Manager",
        "Full Analytics Suite",
      ],
      current: false,
    },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-xl font-bold mb-6 flex items-center gap-2">
        <Crown size={22} className="text-green-600" /> Subscription Plans
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className={`p-6 rounded-lg shadow-lg border ${
              plan.current ? "border-green-600" : "border-gray-200"
            } bg-white flex flex-col`}
          >
            <h2 className="text-lg font-semibold">{plan.name}</h2>
            <p className="text-gray-500">{plan.price}</p>

            <ul className="mt-4 space-y-2 flex-1">
              {plan.features.map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-sm">
                  <CheckCircle size={16} className="text-green-600" /> {f}
                </li>
              ))}
            </ul>

            {plan.current ? (
              <button
                disabled
                className="mt-6 bg-green-500 text-white px-4 py-2 rounded w-full cursor-not-allowed"
              >
                Current Plan
              </button>
            ) : (
              <button className="mt-6 bg-gray-200 px-4 py-2 rounded hover:bg-green-500 hover:text-white transition w-full">
                {plan.price === "$0 / month" ? "Downgrade" : "Upgrade"}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPage;
