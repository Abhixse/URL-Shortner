import React, { useState, useEffect } from "react";
import { Globe, BarChart2, TrendingUp } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

const DomainStatisticsPage = () => {
  const [domains, setDomains] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/domains/stats", {
          withCredentials: true, // if using cookies
        });
        if (res.data.success) {
          if (res.data.domains.length === 0) {
            setMessage("No domains yet.");
          } else {
            setDomains(res.data.domains);
            setChartData(res.data.chart);
          }
        }
      } catch (error) {
        setMessage("Error loading domain stats.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <p className="p-6">Loading domain stats...</p>;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <BarChart2 size={22} className="text-green-600" />
        <h1 className="text-xl font-bold">Domain Statistics</h1>
      </div>

      {message ? (
        <div className="bg-white shadow rounded-lg p-6 text-gray-600">{message}</div>
      ) : (
        <>
          {/* Domain Stats */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {domains.map((domain) => (
              <div
                key={domain.id}
                className="bg-white shadow rounded-lg p-4 flex justify-between items-center"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Globe size={18} className="text-gray-600" />
                    <h2 className="text-lg font-semibold">{domain.name}</h2>
                  </div>
                  <p className="text-sm text-gray-500">
                    {domain.clicks.toLocaleString()} total clicks
                  </p>
                </div>
                <div
                  className={`flex items-center gap-1 font-medium ${
                    domain.growth >= 0 ? "text-green-600" : "text-red-500"
                  }`}
                >
                  <TrendingUp size={18} />
                  {domain.growth}%
                </div>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Weekly Click Trends</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="clicks" stroke="#22c55e" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default DomainStatisticsPage;
