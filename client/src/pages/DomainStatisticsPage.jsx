import React, { useState } from "react";
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

const DomainStatisticsPage = () => {
  // Mock data for stats
  const [domains] = useState([
    { id: 1, name: "myshort.ly", clicks: 1240, growth: 15 },
    { id: 2, name: "clicktrack.me", clicks: 860, growth: -5 },
  ]);

  // Mock chart data
  const chartData = [
    { day: "Mon", clicks: 120 },
    { day: "Tue", clicks: 200 },
    { day: "Wed", clicks: 150 },
    { day: "Thu", clicks: 300 },
    { day: "Fri", clicks: 250 },
    { day: "Sat", clicks: 400 },
    { day: "Sun", clicks: 350 },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <BarChart2 size={22} className="text-green-600" />
        <h1 className="text-xl font-bold">Domain Statistics</h1>
      </div>

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
    </div>
  );
};

export default DomainStatisticsPage;
