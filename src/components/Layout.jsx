import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "./Layout.css";

function Layout({ children, activeTab, setActiveTab }) {
    return (
        <div className="layout-container">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="layout-main">
                <Navbar />
                <main className="layout-content">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default Layout;