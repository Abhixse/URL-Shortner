import React, { useState } from "react";
import { Globe, Plus, Trash2, CheckCircle, AlertCircle } from "lucide-react";

const DomainSettingsPage = () => {
  const [domains, setDomains] = useState([
    { id: 1, name: "myshort.ly", status: "verified" },
    { id: 2, name: "clicktrack.me", status: "pending" },
  ]);

  const [newDomain, setNewDomain] = useState("");

  const handleAddDomain = () => {
    if (!newDomain) return;
    setDomains([...domains, { id: Date.now(), name: newDomain, status: "pending" }]);
    setNewDomain("");
  };

  const handleRemoveDomain = (id) => {
    setDomains(domains.filter((d) => d.id !== id));
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Globe size={22} className="text-green-600" />
        <h1 className="text-xl font-bold">Domain Settings</h1>
      </div>

      {/* Add New Domain */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">Add Custom Domain</h2>
        <div className="flex gap-2">
          <input
            type="text"
            value={newDomain}
            onChange={(e) => setNewDomain(e.target.value)}
            placeholder="Enter domain (e.g. yourdomain.com)"
            className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={handleAddDomain}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center gap-2"
          >
            <Plus size={18} /> Add
          </button>
        </div>
      </div>

      {/* Domain List */}
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Your Domains</h2>
        {domains.length === 0 ? (
          <p className="text-gray-500">No domains added yet.</p>
        ) : (
          <ul className="space-y-3">
            {domains.map((domain) => (
              <li
                key={domain.id}
                className="flex justify-between items-center p-3 border rounded-lg"
              >
                <div className="flex items-center gap-2">
                  {domain.status === "verified" ? (
                    <CheckCircle className="text-green-500" size={18} />
                  ) : (
                    <AlertCircle className="text-yellow-500" size={18} />
                  )}
                  <span className="font-medium">{domain.name}</span>
                  <span
                    className={`text-sm ${
                      domain.status === "verified"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {domain.status === "verified" ? "Verified" : "Pending Verification"}
                  </span>
                </div>
                <button
                  onClick={() => handleRemoveDomain(domain.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DomainSettingsPage;
