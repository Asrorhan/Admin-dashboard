import "./Sidebar.css";

function Sidebar({ activeTab, setActiveTab }) {
    return (
        <aside className="sidebar">
            <h2>Admin Panel</h2>
            <ul className="sidebar-menu">
                <li
                    onClick={() => setActiveTab("dashboard")}
                    className={`sidebar-item ${activeTab === "dashboard" ? "active" : ""}`}
                >
                    Dashboard
                </li>
                <li
                    onClick={() => setActiveTab("analiytics")}
                    className={`sidebar-item ${activeTab === "analiytics" ? "active" : ""}`}
                >
                    Analytics
                </li>
                <li
                    onClick={() => setActiveTab("orders")}
                    className={`sidebar-item ${activeTab === "orders" ? "active" : ""}`}
                >
                    Orders
                </li>
                <li
                    onClick={() => setActiveTab("settings")}
                    className={`sidebar-item ${activeTab === "settings" ? "active" : ""}`}
                >
                    Settings
                </li>
            </ul>
        </aside>
    );
}

export default Sidebar;