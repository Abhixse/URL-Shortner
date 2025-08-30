import { useState } from "react";
import { User, Settings, Globe, Shield, FileText } from "lucide-react";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("User information");

  const sidebarItems = [
    { label: "User information", icon: <User size={18} /> },
    { label: "Default settings", icon: <Settings size={18} /> },
    { label: "Geo templates", icon: <Globe size={18} /> },
    { label: "Campaign templates", icon: <FileText size={18} /> },
    { label: "Security", icon: <Shield size={18} /> },
  ];
  const [timezone, setTimezone] = useState("UTC");
  const [language, setLanguage] = useState("English");
  const [notifications, setNotifications] = useState(true);



  const [geoRules, setGeoRules] = useState([
    { country: "United States", redirect: "https://us.example.com" },
    { country: "India", redirect: "https://in.example.com" },
  ]);

  const [newCountry, setNewCountry] = useState("");
  const [newRedirect, setNewRedirect] = useState("");

  const addRule = () => {
    if (!newCountry || !newRedirect) return;
    setGeoRules([...geoRules, { country: newCountry, redirect: newRedirect }]);
    setNewCountry("");
    setNewRedirect("");
  };

  const removeRule = (index) => {
    setGeoRules(geoRules.filter((_, i) => i !== index));
  };



  const [templates, setTemplates] = useState([
    { name: "Black Friday Promo", content: "Get 50% OFF this weekend!" },
    { name: "Welcome Campaign", content: "Thanks for joining us 🎉" },
  ]);

  const [newName, setNewName] = useState("");
  const [newContent, setNewContent] = useState("");

  const addTemplate = () => {
    if (!newName || !newContent) return;
    setTemplates([...templates, { name: newName, content: newContent }]);
    setNewName("");
    setNewContent("");
  };

  const removeTemplate = (index) => {
    setTemplates(templates.filter((_, i) => i !== index));
  };
  // Render content based on activeTab


  const [twoFA, setTwoFA] = useState(false);
  const [sessions, setSessions] = useState([
    { device: "Chrome - Windows", location: "Delhi, India", active: true },
    { device: "Safari - iPhone", location: "New York, USA", active: false },
  ]);

  const toggle2FA = () => setTwoFA(!twoFA);

  const removeSession = (index) => {
    setSessions(sessions.filter((_, i) => i !== index));
  };



  const renderContent = () => {
    switch (activeTab) {
      case "User information":
        return (
          <div className="flex">

            {/* Main Content */}
            <main className="flex-1 p-6 flex justify-center">
              <div className="max-w-3xl w-full  rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold border-b border-zinc-700 pb-2">
                  Basic Details
                </h2>

                <div className="mt-6">
                  <h3 className="text-lg font-medium">Profile</h3>

                  {/* Profile Avatar + Email */}
                  <div className="flex items-center gap-4 mt-4">
                    <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center text-2xl font-bold">
                      A
                    </div>
                    <div>
                      <p className="text-lg">abhisheek227@gmail.com</p>
                      <p className="text-sm text-gray-400">
                        ✅ Your email address is verified
                      </p>
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div className="mt-4">
                    <p className="font-medium text-red-500">Phone number not set</p>
                    <p className="text-sm text-gray-400">
                      Your phone number is not verified
                    </p>
                  </div>

                  {/* Name */}
                  <div className="mt-4">
                    <label className="block text-sm text-gray-400 mb-1">Name</label>
                    <input
                      type="text"
                      value="Abhishek Yadav"
                      className="w-full p-2 rounded-md bg-white border border-zinc-700 focus:ring focus:ring-green-500 outline-none"
                    />
                  </div>

                  {/* Toggle */}
                  <div className="mt-4 flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="stats"
                      className="w-5 h-5 accent-green-500"
                      defaultChecked
                    />
                    <label htmlFor="stats" className="text-sm">
                      Receive statistics monthly report
                    </label>
                  </div>
                </div>
              </div>
            </main>
          </div>
        );

      case "Default settings":
        return (
          <div className="flex min-h-screen text-black">
            {/* Main Content */}
            <main className="flex-1 p-6 flex justify-center">
              <div className="max-w-3xl w-full rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold border-b border-zinc-700 pb-2">
                  Default Settings
                </h2>

                {/* Language */}
                <div className="mt-6">
                  <label className="block text-sm text-gray-400 mb-1">Language</label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full p-2 rounded-md border border-zinc-700 focus:ring focus:ring-green-500 outline-none"
                  >
                    <option>English</option>
                    <option>Hindi</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
                </div>

                {/* Timezone */}
                <div className="mt-6">
                  <label className="block text-sm text-gray-400 mb-1">Timezone</label>
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full p-2 rounded-md border border-zinc-700 focus:ring focus:ring-green-500 outline-none"
                  >
                    <option value="UTC">UTC</option>
                    <option value="IST">IST (India)</option>
                    <option value="EST">EST (US Eastern)</option>
                    <option value="PST">PST (US Pacific)</option>
                    <option value="CET">CET (Europe)</option>
                  </select>
                </div>

                {/* Notification Preference */}
                <div className="mt-6 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="notifications"
                    checked={notifications}
                    onChange={() => setNotifications(!notifications)}
                    className="w-5 h-5 accent-green-500"
                  />
                  <label htmlFor="notifications" className="text-sm">
                    Enable email notifications
                  </label>
                </div>

                {/* Save Button */}
                <div className="mt-6">
                  <button className="px-6 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition">
                    Save Changes
                  </button>
                </div>
              </div>
            </main>
          </div>
        );

      case "Geo templates":
        return (
          <div className="flex min-h-screen text-black">
            {/* Main Content */}
            <main className="flex-1 p-6 flex justify-center">
              <div className="max-w-3xl w-full  rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold border-b border-zinc-700 pb-2">
                  Geo Templates
                </h2>

                {/* Add New Rule */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Country</label>
                    <input
                      type="text"
                      value={newCountry}
                      onChange={(e) => setNewCountry(e.target.value)}
                      placeholder="e.g. India"
                      className="w-full p-2 rounded-md border border-zinc-700 focus:ring focus:ring-green-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Redirect URL</label>
                    <input
                      type="text"
                      value={newRedirect}
                      onChange={(e) => setNewRedirect(e.target.value)}
                      placeholder="https://example.com/in"
                      className="w-full p-2 rounded-md border border-zinc-700 focus:ring focus:ring-green-500 outline-none"
                    />
                  </div>
                </div>
                <button
                  onClick={addRule}
                  className="mt-4 px-6 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition"
                >
                  Add Rule
                </button>

                {/* Existing Rules */}
                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-2">Configured Rules</h3>
                  {geoRules.length === 0 ? (
                    <p className="text-gray-400 text-sm">No geo rules set yet.</p>
                  ) : (
                    <ul className="space-y-3">
                      {geoRules.map((rule, index) => (
                        <li
                          key={index}
                          className="flex justify-between items-center bg-zinc-800 px-4 py-3 rounded-md"
                        >
                          <div>
                            <p className="font-medium text-white ">{rule.country}</p>
                            <p className="text-sm text-gray-400">{rule.redirect}</p>
                          </div>
                          <button
                            onClick={() => removeRule(index)}
                            className="text-red-400 hover:text-red-500"
                          >
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </main>
          </div>
        );

      case "Campaign templates":
        return (
          <div className="flex min-h-screen text-black">
            {/* Main Content */}
            <main className="flex-1 p-6 flex justify-center">
              <div className="max-w-3xl w-full  rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold border-b border-zinc-700 pb-2">
                  Campaign Templates
                </h2>

                {/* Add New Template */}
                <div className="mt-6 space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Template Name</label>
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="e.g. Holiday Promo"
                      className="w-full p-2 rounded-md border border-zinc-700 focus:ring focus:ring-green-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Content</label>
                    <textarea
                      value={newContent}
                      onChange={(e) => setNewContent(e.target.value)}
                      placeholder="Write your campaign content here..."
                      rows={3}
                      className="w-full p-2 rounded-md  border border-zinc-700 focus:ring focus:ring-green-500 outline-none"
                    />
                  </div>
                  <button
                    onClick={addTemplate}
                    className="px-6 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition"
                  >
                    Add Template
                  </button>
                </div>

                {/* Existing Templates */}
                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-2">Saved Templates</h3>
                  {templates.length === 0 ? (
                    <p className="text-gray-400 text-sm">No templates saved yet.</p>
                  ) : (
                    <ul className="space-y-3">
                      {templates.map((t, index) => (
                        <li
                          key={index}
                          className=" px-4 py-3 rounded-md flex justify-between items-center"
                        >
                          <div>
                            <p className="font-medium">{t.name}</p>
                            <p className="text-sm text-gray-400">{t.content}</p>
                          </div>
                          <button
                            onClick={() => removeTemplate(index)}
                            className="text-red-400 hover:text-red-500"
                          >
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </main>

          
          </div>
        );

      case "Security":

        return (
          <div className="flex min-h-screen text-black">
            {/* Main Content */}
            <main className="flex-1 p-6 flex justify-center">
              <div className="max-w-3xl w-full rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold border-b border-zinc-700 pb-2">
                  Security Settings
                </h2>

                {/* Two Factor Authentication */}
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-2">Two-Factor Authentication</h3>
                  <p className="text-sm text-gray-400 mb-3">
                    Add an extra layer of security to your account by enabling 2FA.
                  </p>
                  <button
                    onClick={toggle2FA}
                    className={`px-6 py-2 rounded-lg ${twoFA ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
                      } transition`}
                  >
                    {twoFA ? "Disable 2FA" : "Enable 2FA"}
                  </button>
                </div>

                {/* Active Sessions */}
                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-2">Active Sessions</h3>
                  {sessions.length === 0 ? (
                    <p className="text-gray-400 text-sm">No active sessions.</p>
                  ) : (
                    <ul className="space-y-3 text-white">
                      {sessions.map((s, index) => (
                        <li
                          key={index}
                          className="bg-zinc-800 px-4 py-3 rounded-md flex justify-between items-center"
                        >
                          <div>
                            <p className="font-medium">{s.device}</p>
                            <p className="text-sm text-green-400">{s.location}</p>
                          </div>
                          {s.active ? (
                            <span className="text-green-400 text-sm">Active</span>
                          ) : (
                            <button
                              onClick={() => removeSession(index)}
                              className="text-red-400 hover:text-red-500 text-sm"
                            >
                              Remove
                            </button>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </main>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 p-4 space-y-4">
        {sidebarItems.map((item) => (
          <button
            key={item.label}
            onClick={() => setActiveTab(item.label)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg w-full text-left transition ${activeTab === item.label
              ? "bg-zinc-800 text-green-400"
              : "text-black"
              }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 flex justify-center">
        <div className="max-w-3xl w-full rounded-lg shadow-lg p-6 bg-white">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
