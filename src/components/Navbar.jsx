import { useState, useEffect } from "react";
import "./Navbar.css";

function Navbar() {
    const [unReadCount, setUnReadCount] = useState(3);

    const [username, setUsername] = useState(() => {
        const saved = localStorage.getItem("settings_profile");
        return saved ? JSON.parse(saved).username : "Admin";
    });

    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("app_theme") || "dark";
    });

    useEffect(() => {
        document.body.setAttribute("data-theme", theme);
        localStorage.setItem("app_theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    };


    useEffect(() => {
        const handleProfileUpdate = () => {
            const saved = localStorage.getItem("settings_profile");
            if (saved) {
                setUsername(JSON.parse(saved).username);
            }
        };

        window.addEventListener("profileUpdated", handleProfileUpdate);

        return () => {
            window.removeEventListener("profileUpdated", handleProfileUpdate);
        };
    }, []);

    return (
        <header className="navbar-header">
            <div className="navbar-title">
                <h3>Welcome</h3>
            </div>

            <div className="navbar-actions">
                <button
                    onClick={toggleTheme}
                    style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px" }}
                >
                    {theme === "light" ? "🌙" : "☀️"}
                </button>

                <div className="notification-wrapper" onClick={() => setUnReadCount(0)}>
                    <span className="notification-icon">🔔</span>
                    {unReadCount > 0 && (
                        <span className="notification-badge">{unReadCount}</span>
                    )}
                </div>

                <span className="user-profile">{username}</span>
            </div>
        </header>
    );
}

export default Navbar;