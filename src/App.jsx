import { useState } from "react";
import Layout from "./components/Layout";
import DashBoard from "./components/DashBoard";
import Analytics from "./components/Analytics";
import Orders from "./components/Orders";
import SettingsPage from "./components/Settings";

function App() {

  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div>
      <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
        {activeTab === "dashboard" && <DashBoard />}
        {activeTab === "analiytics" && <Analytics />}
        {activeTab === "orders" && <Orders />}
        {activeTab === "settings" && <SettingsPage />}
      </Layout>
    </div>
  )
}
export default App;

