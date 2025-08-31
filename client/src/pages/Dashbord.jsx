import React, { useEffect, useContext } from "react";
import { useLocalAction } from "../context/LocalActionProvider.jsx";
import { ApiContext } from "../context/ApiContext.jsx";

const Dashboard = () => {
  const { isMenuOpen } = useLocalAction();
  const { urls, analytics, fetchUrls, fetchAnalytics, loading, error } = useContext(ApiContext);

  // Fetch data when component mounts
  useEffect(() => {
    fetchUrls();
    fetchAnalytics();
  }, []);

  // Derived stats
  const totalClicks = analytics.reduce((sum, a) => sum + (a.clicks || 0), 0);
  const activeDomains = [...new Set(urls.map((u) => new URL(u.originalUrl).hostname))].length;
  const subscription = "Free"; // later fetch from user data

  return (
    <main
      className={`flex-1 overflow-y-auto p-6 bg-gray-50 transition-all ${
        isMenuOpen ? "ml-64" : "ml-16"
      }`}
    >
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {loading && <p className="text-gray-500">Loading data...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-2">Total Clicks</h2>
          <p className="text-3xl font-bold text-blue-600">{totalClicks}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-2">Active Domains</h2>
          <p className="text-3xl font-bold text-green-600">{activeDomains}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-2">Subscriptions</h2>
          <p className="text-3xl font-bold text-purple-600">{subscription}</p>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th scope="col" className="border-b p-2">URL</th>
              <th scope="col" className="border-b p-2">Clicks</th>
              <th scope="col" className="border-b p-2">Created</th>
            </tr>
          </thead>
          <tbody>
            {urls.length > 0 ? (
              urls.slice(0, 5).map((url) => (
                <tr key={url._id}>
                  <td className="border-b p-2 text-blue-600">{url.shortUrl}</td>
                  <td className="border-b p-2">{url.clicks || 0}</td>
                  <td className="border-b p-2">
                    {new Date(url.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center text-gray-500 p-4">
                  No recent activity
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default Dashboard;
