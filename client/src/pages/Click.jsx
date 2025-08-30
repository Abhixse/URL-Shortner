import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { MousePointerClick } from "lucide-react";

const dummyClicks = [
  { day: "Mon", clicks: 120 },
  { day: "Tue", clicks: 90 },
  { day: "Wed", clicks: 150 },
  { day: "Thu", clicks: 200 },
  { day: "Fri", clicks: 80 },
  { day: "Sat", clicks: 170 },
  { day: "Sun", clicks: 130 },
];

const ClicksPage = () => {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <MousePointerClick size={22} className="text-green-600" />
        <h1 className="text-xl font-bold">Clicks Analytics</h1>
      </div>

      {/* Summary Card */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">This Week</h2>
        <p className="text-3xl font-bold text-green-600">
          {dummyClicks.reduce((sum, d) => sum + d.clicks, 0)} clicks
        </p>
        <p className="text-gray-500 text-sm">Across all your short links</p>
      </div>

      {/* Chart */}
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Daily Clicks</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dummyClicks}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="clicks" fill="#22c55e" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ClicksPage;
