import React, { useState, useEffect } from "react";
import { Globe, Plus, Trash2, CheckCircle, AlertCircle } from "lucide-react";
import axios from "axios";

const DomainSettingsPage = () => {
  const [domains, setDomains] = useState([]);
  const [newDomain, setNewDomain] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch domains from backend on mount
  useEffect(() => {
    const fetchDomains = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/domains", { withCredentials: true });
        setDomains(data);
      } catch (error) {
        console.error("Error fetching domains:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDomains();
  }, []);

  // 🔹 Add new domain
  const handleAddDomain = async () => {
    if (!newDomain.trim()) return;
    try {
      const { data } = await axios.post(
        "/api/domains",
        { name: newDomain },
        { withCredentials: true }
      );
      setDomains((prev) => [...prev, data]);
      setNewDomain("");
    } catch (error) {
      console.error("Error adding domain:", error);
    }
  };

  // 🔹 Remove domain
  const handleRemoveDomain = async (id) => {
    try {
      await axios.delete(`/api/domains/${id}`, { withCredentials: true });
      setDomains((prev) => prev.filter((d) => d._id !== id));
    } catch (error) {
      console.error("Error deleting domain:", error);
    }
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
        {loading ? (
          <p className="text-gray-500">Loading domains...</p>
        ) : domains.length === 0 ? (
          <p className="text-gray-500">No domains added yet.</p>
        ) : (
          <ul className="space-y-3">
            {domains.map((domain) => (
              <li
                key={domain._id}
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
                    {domain.status === "verified"
                      ? "Verified"
                      : "Pending Verification"}
                  </span>
                </div>
                <button
                  onClick={() => handleRemoveDomain(domain._id)}
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
