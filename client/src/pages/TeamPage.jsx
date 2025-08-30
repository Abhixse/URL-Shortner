import React, { useState } from "react";
import { Users, Mail, UserPlus, Trash2 } from "lucide-react";

const TeamPage = () => {
  // Mock team data
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: "Abhishek Yadav", email: "abhishek@example.com", role: "Admin" },
    { id: 2, name: "Riya Sharma", email: "riya@example.com", role: "Editor" },
    { id: 3, name: "Karan Patel", email: "karan@example.com", role: "Viewer" },
  ]);

  const [inviteEmail, setInviteEmail] = useState("");

  // Handle inviting new member
  const handleInvite = () => {
    if (!inviteEmail) return;
    const newMember = {
      id: teamMembers.length + 1,
      name: "New User",
      email: inviteEmail,
      role: "Pending",
    };
    setTeamMembers([...teamMembers, newMember]);
    setInviteEmail("");
  };

  // Handle removing member
  const handleRemove = (id) => {
    setTeamMembers(teamMembers.filter((member) => member.id !== id));
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Users size={22} className="text-green-600" />
        <h1 className="text-xl font-bold">Team Management</h1>
      </div>

      {/* Invite Section */}
      <div className="bg-white shadow rounded-lg p-4 mb-6 flex items-center gap-3">
        <Mail size={20} className="text-gray-600" />
        <input
          type="email"
          placeholder="Enter email to invite"
          value={inviteEmail}
          onChange={(e) => setInviteEmail(e.target.value)}
          className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <button
          onClick={handleInvite}
          className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-green-600"
        >
          <UserPlus size={18} />
          Invite
        </button>
      </div>

      {/* Team List */}
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Team Members</h2>
        <ul className="divide-y divide-gray-200">
          {teamMembers.map((member) => (
            <li
              key={member.id}
              className="flex justify-between items-center py-3"
            >
              <div>
                <p className="font-medium text-gray-800">{member.name}</p>
                <p className="text-sm text-gray-500">{member.email}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm px-3 py-1 rounded bg-gray-100 text-gray-700">
                  {member.role}
                </span>
                <button
                  onClick={() => handleRemove(member.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TeamPage;