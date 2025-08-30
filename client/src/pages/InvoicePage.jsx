import React from "react";
import { ArrowLeft, FileText, Calendar, DollarSign, Download } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const InvoicePage = () => {
  const navigate = useNavigate();
  const { invoiceId } = useParams();

  // Mock invoice data (you can fetch from backend using invoiceId)
  const invoice = {
    id: invoiceId,
    date: "2025-08-01",
    plan: "Pro Plan - Monthly",
    amount: "$19.00",
    status: "Paid",
    paymentMethod: "Visa ending in 4242",
    billingAddress: "Abhishek Yadav, Noida, India",
    items: [
      { description: "Pro Plan Subscription", quantity: 1, price: "$19.00" },
    ],
  };

  return (
    <div className="p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
      >
        <ArrowLeft size={18} /> Back
      </button>

      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <FileText size={22} className="text-green-600" />
        <h1 className="text-xl font-bold">Invoice #{invoice.id}</h1>
      </div>

      {/* Invoice Details */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Invoice Date</p>
            <p className="flex items-center gap-2 font-medium">
              <Calendar size={16} /> {invoice.date}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Status</p>
            <span
              className={`px-2 py-1 rounded text-xs ${
                invoice.status === "Paid"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {invoice.status}
            </span>
          </div>
          <div>
            <p className="text-gray-500">Plan</p>
            <p className="font-medium">{invoice.plan}</p>
          </div>
          <div>
            <p className="text-gray-500">Amount</p>
            <p className="flex items-center gap-1 font-medium">
              <DollarSign size={16} /> {invoice.amount}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Payment Method</p>
            <p className="font-medium">{invoice.paymentMethod}</p>
          </div>
          <div>
            <p className="text-gray-500">Billing Address</p>
            <p className="font-medium">{invoice.billingAddress}</p>
          </div>
        </div>
      </div>

      {/* Invoice Items */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Invoice Items</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-600 text-sm border-b">
              <th className="py-2">Description</th>
              <th className="py-2">Quantity</th>
              <th className="py-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, idx) => (
              <tr key={idx} className="border-b text-sm">
                <td className="py-2">{item.description}</td>
                <td className="py-2">{item.quantity}</td>
                <td className="py-2">{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Download Invoice */}
      <div className="flex justify-end">
        <button className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          <Download size={18} /> Download PDF
        </button>
      </div>
    </div>
  );
};

export default InvoicePage;
