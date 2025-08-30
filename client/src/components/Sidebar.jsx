import React, { useState } from "react";
import {
    LogOut,
    ChevronDown,
    ChevronRight,
    LayoutDashboard,
    BarChart3,
    Globe,
    Settings,
    Users,
    CreditCard,
    FileText,
    DollarSign,
    User,
    Info,
    BookOpen,
    Home,
} from "lucide-react";
import { useLocalAction } from "../context/LocalActionProvider.jsx";
import { Link } from "react-router-dom";

const Sidebar = () => {
    const [openDashboard, setOpenDashboard] = useState(false);
    const [openSettings, setOpenSettings] = useState(false);
    const { isMenuOpen } = useLocalAction();

    return (
        <aside
            className={`${isMenuOpen ? "translate-x-0" : "-translate-x-full"
                } absolute left-0 top-0 h-full w-64 bg-white shadow-md transition-transform duration-300`}
        >
            <div className={`p-4 ${isMenuOpen ? "block" : "hidden"}`}>
                {/* Profile Section */}
                <div className="flex flex-col items-start gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                        A
                    </div>
                    <div className="flex items-center justify-between w-full">
                        <div className="flex-1">
                            <h3 className="text-gray-900 font-semibold">Abhishek Yadav</h3>
                            <p className="text-gray-500 text-sm">abhishek@example.com</p>
                        </div>
                        <button className="text-gray-500 hover:text-red-500">
                            <LogOut size={20} />
                        </button>
                    </div>
                </div>

                <hr className="my-3" />


                {/* Dashboard Toggle */}
                <div>
                    <button
                        onClick={() => setOpenDashboard(!openDashboard)}
                        className="flex items-center justify-between w-full px-2 py-2 rounded hover:bg-gray-100"
                    >
                        <span className="flex items-center gap-2 text-gray-700 font-medium">
                            <LayoutDashboard size={20} /> Dashboard
                        </span>
                        {openDashboard ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                    </button>

                    {openDashboard && (
                        <div className="ml-6 mt-2 flex flex-col gap-2">
                            <Link to="/clicks" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                                <BarChart3 size={18} /> Clicks
                            </Link>
                            <Link to="/domain-statistics" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                                <Globe size={18} /> Domain Statistic
                            </Link>
                            <Link to="/domain-settings" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                                <Settings size={18} /> Domain Setting
                            </Link>

                            <Link to='/' className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                                <Home size={18} /> Home
                            </Link>
                        </div>
                    )}
                </div>

                {/* Settings Toggle */}
                <div className="mt-3">
                    <button
                        onClick={() => setOpenSettings(!openSettings)}
                        className="flex items-center justify-between w-full px-2 py-2 rounded hover:bg-gray-100"
                    >
                        <span className="flex items-center gap-2 text-gray-700 font-medium">
                            <Settings size={20} /> Settings
                        </span>
                        {openSettings ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                    </button>

                    {openSettings && (
                        <div className="ml-6 mt-2 flex flex-col gap-2">
                            <Link to="/team" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                                <Users size={18} /> Team
                            </Link>
                            <Link to="/billing" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                                <CreditCard size={18} /> Billing
                            </Link>
                            <Link to="/invoice" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                                <FileText size={18} /> Invoice
                            </Link>
                            <Link to="/payment" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                                <DollarSign size={18} /> Payment
                            </Link>
                            <Link to="/profile" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                                <User size={18} /> Profile
                            </Link>
                            <Link to="/plan-info" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                                <Info size={18} /> Plan Info
                            </Link>
                        </div>
                    )}
                </div>

                {/* Other Links */}
                <div className="mt-3 flex flex-col gap-2">
                    <Link to="/subscription" className="flex items-center gap-2 text-gray-700 font-medium hover:bg-gray-100 px-2 py-2 rounded">
                        <CreditCard size={18} /> Subscription
                    </Link>
                    <Link to="/help" className="flex items-center gap-2 text-gray-700 font-medium hover:bg-gray-100 px-2 py-2 rounded">
                        <BookOpen size={18} /> Help
                    </Link>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
