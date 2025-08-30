import React from "react";
import { HelpCircle, Mail, MessageSquare, Book } from "lucide-react";

const HelpPage = () => {
  const faqs = [
    {
      question: "How do I add a new domain?",
      answer:
        "Go to Domain Settings → Add Domain, enter your domain name, and follow the verification steps.",
    },
    {
      question: "How can I upgrade my plan?",
      answer:
        "Visit the Subscription page and choose your desired plan. Payments are processed securely.",
    },
    {
      question: "Where can I see analytics?",
      answer:
        "You can view domain-specific analytics in the Domain Statistics section of your dashboard.",
    },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-xl font-bold mb-6 flex items-center gap-2">
        <HelpCircle size={22} className="text-green-600" /> Help & Support
      </h1>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="p-6 bg-white rounded-lg shadow flex flex-col items-center gap-2 hover:shadow-lg transition">
          <Book size={28} className="text-green-600" />
          <h2 className="font-semibold">Documentation</h2>
          <p className="text-sm text-gray-500 text-center">
            Read guides and tutorials to get started quickly.
          </p>
          <button className="mt-2 text-green-600 hover:underline text-sm">
            View Docs
          </button>
        </div>

        <div className="p-6 bg-white rounded-lg shadow flex flex-col items-center gap-2 hover:shadow-lg transition">
          <MessageSquare size={28} className="text-green-600" />
          <h2 className="font-semibold">Community</h2>
          <p className="text-sm text-gray-500 text-center">
            Join discussions with other users in our forum.
          </p>
          <button className="mt-2 text-green-600 hover:underline text-sm">
            Go to Forum
          </button>
        </div>

        <div className="p-6 bg-white rounded-lg shadow flex flex-col items-center gap-2 hover:shadow-lg transition">
          <Mail size={28} className="text-green-600" />
          <h2 className="font-semibold">Contact Support</h2>
          <p className="text-sm text-gray-500 text-center">
            Can’t find what you’re looking for? Reach out to us.
          </p>
          <button className="mt-2 text-green-600 hover:underline text-sm">
            Email Us
          </button>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Frequently Asked Questions</h2>
        <ul className="space-y-4">
          {faqs.map((faq, idx) => (
            <li key={idx}>
              <p className="font-medium text-gray-800">{faq.question}</p>
              <p className="text-sm text-gray-600">{faq.answer}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HelpPage;
