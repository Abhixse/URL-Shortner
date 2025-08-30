import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LocalActionProvider } from "./context/LocalActionProvider.jsx";

import Sidebar from "./components/Sidebar.jsx";
import LoggedInHeader from "./components/LoggedInHeader.jsx";
import Footer from "./components/Footer.jsx";
import NotificationPanel from "./components/NotificationPanel.jsx";

// Pages
import Dashboard from "./pages/Dashbord.jsx";
import ClicksPage from "./pages/Click.jsx";
import DomainSettingsPage from "./pages/DomainSettingsPage.jsx";
import DomainStatisticsPage from "./pages/DomainStatisticsPage.jsx";
import BillingPage from "./pages/BillingPage.jsx";
import TeamPage from "./pages/TeamPage.jsx";
import HelpPage from "./pages/HelpPage.jsx";
import SubscriptionPage from "./pages/SubscriptionPage.jsx";
import InvoicePage from "./pages/InvoicePage.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import PlaneInfo from "./pages/PlanInfoPage.jsx"


import { useLocalAction } from "./context/LocalActionProvider.jsx";

const Layout = () => {
  const { isMenuOpen } = useLocalAction();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Section (Header + Content + Footer) */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isMenuOpen ? "ml-64" : "ml-0"
        }`}
      >
        <LoggedInHeader />

        {/* Route Pages */}
        <div className="p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/clicks" element={<ClicksPage />} />
            <Route path="/domain-settings" element={<DomainSettingsPage />} />
            <Route path="/domain-statistics" element={<DomainStatisticsPage />} />
            <Route path="/billing" element={<BillingPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/subscription" element={<SubscriptionPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/invoice" element={<InvoicePage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/plan-info" element={<PlaneInfo />} />
          </Routes>
        </div>

        <NotificationPanel />
        <Footer />
      </div>
    </div>
  );
};

function App() {
  return (
    <LocalActionProvider>
      <Router>
        <Layout />
      </Router>
    </LocalActionProvider>
  );
}

export default App;
