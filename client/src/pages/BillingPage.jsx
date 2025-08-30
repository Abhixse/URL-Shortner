import React from "react";
import { CreditCard, DollarSign, Calendar, Download, FileText } from "lucide-react";


const BillingPage = () => {
    const invoices = [
        { id: 1, date: "2025-08-01", amount: "$19.00", status: "Paid" },
        { id: 2, date: "2025-07-01", amount: "$19.00", status: "Paid" },
        { id: 3, date: "2025-06-01", amount: "$19.00", status: "Paid" },
    ];

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex items-center gap-2 mb-6">
                <CreditCard size={22} className="text-green-600" />
                <h1 className="text-xl font-bold">Billing</h1>
            </div>

            {/* Current Plan */}
            <div className="bg-white shadow rounded-lg p-6 mb-6">
                <h2 className="text-lg font-semibold mb-4">Current Plan</h2>
                <div className="flex justify-between items-center">
                    <div>
                        <p className="font-medium text-gray-800">Pro Plan</p>
                        <p className="text-sm text-gray-500">$19/month</p>
                    </div>
                    <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                        Upgrade
                    </button>
                </div>
            </div>

            {/* Payment Info */}
            <div className="bg-white shadow rounded-lg p-6 mb-6">
                <h2 className="text-lg font-semibold mb-4">Payment Information</h2>
                <div className="flex items-center gap-4">
                    <DollarSign size={20} className="text-gray-600" />
                    <p className="text-gray-700">Visa ending in 4242 • Exp 12/26</p>
                    <button className="ml-auto text-green-600 hover:underline">
                        Update
                    </button>
                </div>
            </div>

            {/* Billing History */}
            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Billing History</h2>
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-gray-600 text-sm border-b">
                            <th className="py-2">Date</th>
                            <th className="py-2">Amount</th>
                            <th className="py-2">Status</th>
                            <th className="py-2 text-right">Invoice</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices.map((invoice) => (
                            <tr key={invoice.id} className="border-b text-sm">
                                <td className="py-2 flex items-center gap-2">
                                    <Calendar size={16} className="text-gray-500" />
                                    {invoice.date}
                                </td>
                                <td className="py-2">{invoice.amount}</td>
                                <td className="py-2">
                                    <span
                                        className={`px-2 py-1 rounded text-xs ${invoice.status === "Paid"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-yellow-100 text-yellow-700"
                                            }`}
                                    >
                                        {invoice.status}
                                    </span>
                                </td>
                                <td className="py-2 text-right">
                                    <button className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
                                        <Download size={16} />
                                        PDF
                                    </button>
                                </td>
                                <td>
                                    <button
                                        onClick={() => navigate(`/invoice/${invoice.id}`)}
                                        className="flex items-center gap-1 text-green-600 hover:text-green-800"
                                    >
                                        <FileText size={16} /> View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BillingPage;
