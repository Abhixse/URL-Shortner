import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { MousePointerClick } from "lucide-react";

const ClicksPage = () => {
  const [clicksData, setClicksData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchClicks = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/clicks/stats", {
          withCredentials: true, // if using cookies for auth
        });
        if (res.data.success) {
          if (res.data.clicks.length === 0) {
            setMessage("No URLs created yet.");
          } else {
            setClicksData(res.data.clicks);
          }
        }
      } catch (error) {
        setMessage("Error fetching clicks data.");
      } finally {
        setLoading(false);
      }
    };

    fetchClicks();
  }, []);

  if (loading) return <p className="p-6">Loading clicks data...</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <MousePointerClick size={24} strokeWidth={2.2} className="text-green-600" />
        <h1 className="text-2xl font-bold">Clicks Analytics</h1>
      </div>

      {message ? (
        <div className="bg-white shadow-md rounded-2xl p-6 text-gray-600">{message}</div>
      ) : (
        <>
          {/* Summary */}
          <div className="bg-white shadow-md rounded-2xl p-6 mb-6">
            <h2 className="text-lg font-semibold mb-2">This Week</h2>
            <p className="text-4xl font-bold text-green-600">
              {clicksData.reduce((sum, d) => sum + d.clicks, 0)} clicks
            </p>
            <p className="text-gray-500 text-sm">Across all your short links</p>
          </div>

          {/* Chart */}
          <div className="bg-white shadow-md rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4">Daily Clicks</h2>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={clicksData} barSize={40}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ borderRadius: "12px", border: "1px solid #e5e7eb" }}
                />
                <Bar
                  dataKey="clicks"
                  fill="#22c55e"
                  radius={[8, 8, 0, 0]}
                  className="transition-all duration-300 hover:opacity-80"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default ClicksPage;
