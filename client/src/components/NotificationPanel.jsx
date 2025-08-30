import React from "react";
import { useLocalAction } from "../context/LocalActionProvider";
import { X } from "lucide-react";

const NotificationPanel = () => {
  const { isNotificationOpen, toggleNotification } = useLocalAction();

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl border-l transition-transform duration-300 z-50 flex flex-col
        ${isNotificationOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-base font-semibold">Notifications</h2>
        <button
          onClick={toggleNotification}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <X size={18} />
        </button>
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-800">
            🔗 Your link <span className="font-mono">bit.ly/abc123</span> got 100 new clicks!
          </p>
          <p className="text-xs text-gray-500">2 hours ago</p>
        </div>

        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-800">
            ⚡ Upgrade to Pro to unlock custom domains.
          </p>
          <p className="text-xs text-gray-500">Yesterday</p>
        </div>

        {/* Example empty state */}
        {/* <p className="text-center text-gray-500">No notifications 🎉</p> */}
      </div>
    </div>
  );
};

export default NotificationPanel;
