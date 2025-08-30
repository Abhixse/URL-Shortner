import React from "react";
import { useLocalAction } from "../context/LocalActionProvider.jsx";
import { Github, Twitter, Mail } from "lucide-react";

const Footer = () => {
    const { isMenuOpen } = useLocalAction();

    return (
        <footer
            className={`flex justify-between items-center p-4 bg-white shadow fixed bottom-0 transition-all duration-300 ${isMenuOpen ? "ml-64 w-[calc(100%-16rem)]" : "ml-0 w-full"
                }`}
        >
            {/* Left Section */}
            <div className="text-sm text-gray-500">
                © {new Date().getFullYear()} MyApp. All rights reserved.
            </div>

            {/* Right Section (Links / Icons) */}
            <div className="flex items-center gap-4 text-gray-600">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                    <Github size={20} className="hover:text-gray-900" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <Twitter size={20} className="hover:text-gray-900" />
                </a>
                <a href="mailto:support@example.com">
                    <Mail size={20} className="hover:text-gray-900" />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
