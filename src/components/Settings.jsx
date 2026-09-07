import { useState, useEffect } from "react";
import "./Settings.css";

function Settings() {
    const [profile, setProfile] = useState(() => {
        const saved = localStorage.getItem("settings_profile");
        return saved
            ? JSON.parse(saved)
            : { username: "Admin", email: "admin@example.com" };
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({
            ...profile,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem("settings_profile", JSON.stringify(profile));
        window.dispatchEvent(new Event("profileUpdated"));
        alert("Settings saved!");
    };

    return (
        <div className="settings-container">
            <h2>Settings</h2>

            <form className="settings-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username</label>
                    <input
                        className="form-input"
                        type="text"
                        name="username"
                        value={profile.username}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input
                        className="form-input"
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" className="save-btn">
                    Save Changes
                </button>
            </form>
        </div>
    );
}

export default Settings;