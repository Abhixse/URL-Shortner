import React, { createContext, useState } from "react";

// Create Context
export const ApiContext = createContext();

// Provider Component
export const ApiProvider = ({ children }) => {
  // Example states for different datasets
  const [user, setUser] = useState(null);
  const [urls, setUrls] = useState([]);
  const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [logOut, setLogOut] = useState(false);

  // Generic fetch handler
  const fetchData = async (endpoint, setter) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:5000/api/${endpoint}`);
      if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
      const data = await res.json();
      setter(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Functions to fetch different data
  const fetchUser = () => fetchData("user/me", setUser);
  const fetchUrls = () => fetchData("urls", setUrls);
  const fetchAnalytics = () => fetchData("analytics", setAnalytics);

  return (
    <ApiContext.Provider
      value={{
        user,
        urls,
        analytics,
        loading,
        error,
        fetchUser,
        fetchUrls,
        fetchAnalytics,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};
