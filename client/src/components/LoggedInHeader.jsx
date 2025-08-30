import React, { useState } from "react";
import { Menu, Link as LinkIcon, Lock, Plus, Bell } from "lucide-react";
import { useLocalAction } from "../context/LocalActionProvider.jsx";

const LoggedInHeader = ({ isPro = false }) => {
  const { toggleMenu, toggleNotification, isNotificationOpen, isMenuOpen } = useLocalAction();

  return (
    <header className="flex justify-between items-center p-4 sticky top-0 bg-white shadow rounded">
      {/* Sidebar Toggle */}
      <button className="p-2 hover:bg-gray-100 rounded-lg" onClick={toggleMenu}>
        <Menu size={22} />
      </button>

      {/* Center Input Section */}
      <div className="flex items-center gap-3 flex-1 max-w-xl mx-6 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
        {/* URL + Lock Icons */}
        <div className="flex items-center gap-2 text-gray-600 border border-green-500 rounded-lg px-2 py-1">
          {/* URL Icon */}
          <LinkIcon size={20} className="text-gray-600" />

          {/* Lock Icon with Tooltip */}
          <div className="relative group">
            <Lock size={20} className="text-gray-600 cursor-pointer" />
            {/* Tooltip */}
            <span className="absolute left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap text-xs bg-gray-900 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
              End-to-End Encryption
            </span>
          </div>
        </div>

        {/* Input Field */}
        <input
          type="text"
          placeholder="Enter your URL..."
          className="flex-1 bg-transparent outline-none px-2 text-sm text-gray-700"
        />

        {/* Plus Icon */}
        <button className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
          <Plus size={20} />
        </button>
      </div>

      {/* Right Side (Upgrade + Notification) */}
      <div className="flex items-center gap-4">
        {!isPro && (
          <button className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-medium rounded-lg shadow hover:from-yellow-500 hover:to-yellow-600">
            Upgrade
          </button>
        )}
        <button
          className="p-2 hover:bg-gray-100 rounded-lg relative"
          onClick={toggleNotification}
        >
          <Bell size={22} />
          {/* Red dot for notification */}
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>
      </div>
      
    
    </header>
  );
};

export default LoggedInHeader;
