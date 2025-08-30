import React from "react";
import { useLocalAction } from "../context/LocalActionProvider.jsx";

const Dashboard = () => {
    const { isMenuOpen } = useLocalAction();

    return (
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

    {/* Example Dashboard Grid */ }
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-2">Total Clicks</h2>
            <p className="text-3xl font-bold text-blue-600">12,345</p>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-2">Active Domains</h2>
            <p className="text-3xl font-bold text-green-600">7</p>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-2">Subscriptions</h2>
            <p className="text-3xl font-bold text-purple-600">Pro</p>
        </div>
    </div>

    {/* Example Table */ }
    <div className="mt-8 bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <table className="w-full text-left border-collapse">
            <thead>
                <tr>
                    <th className="border-b p-2">URL</th>
                    <th className="border-b p-2">Clicks</th>
                    <th className="border-b p-2">Date</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="border-b p-2">bit.ly/abc123</td>
                    <td className="border-b p-2">532</td>
                    <td className="border-b p-2">2025-08-29</td>
                </tr>
                <tr>
                    <td className="border-b p-2">bit.ly/xyz789</td>
                    <td className="border-b p-2">214</td>
                    <td className="border-b p-2">2025-08-27</td>
                </tr>
            </tbody>
        </table>
    </div>
        </main >
  );
};

export default Dashboard;
