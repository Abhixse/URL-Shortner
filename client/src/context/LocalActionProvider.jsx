import { createContext, useContext, useState } from "react";

const LocalActionContext = createContext();

export const LocalActionProvider = ({ children }) => {
  // Sidebar/Menu toggle
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Notifications toggle
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // Handlers
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleNotification = () => setIsNotificationOpen((prev) => !prev);

  const value = {
    isMenuOpen,
    toggleMenu,
    isNotificationOpen,
    toggleNotification,
  };
  
  return (
    <LocalActionContext.Provider value={value}>
      {children}
    </LocalActionContext.Provider>
  );
};

// Hook for easy access
export const useLocalAction = () => useContext(LocalActionContext);
