import { useState } from "react";

function readStoredUser() {
  try {
    return JSON.parse(sessionStorage.getItem("ecowatchUser")) || {};
  } catch {
    return {};
  }
}

function readNotifications(role) {
  try {
    const saved = JSON.parse(localStorage.getItem(`ecowatchSettings:${role}`));
    return saved?.issueNotifications ?? true;
  } catch {
    return true;
  }
}

function Settings({ role }) {
  const [profile, setProfile] = useState(() => {
    const user = readStoredUser();
    return { name: user.name || "", email: user.email || "" };
  });
  const [issueNotifications, setIssueNotifications] = useState(() =>
    readNotifications(role)
  );
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage("");

    try {
      localStorage.setItem(
        `ecowatchSettings:${role}`,
        JSON.stringify({ issueNotifications })
      );
      const user = readStoredUser();
      sessionStorage.setItem(
        "ecowatchUser",
        JSON.stringify({ ...user, ...profile, role: user.role || role })
      );
      setMessage("Your settings have been saved.");
    } catch {
      setMessage("Settings could not be saved. Check your browser storage and try again.");
    }
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <div>
          <p className="page-eyebrow">PREFERENCES</p>
          <h1>Settings</h1>
          <p>Manage your profile details and EcoWatch notifications.</p>
        </div>
      </div>

      <form className="settings-card" onSubmit={handleSubmit}>
        <section className="settings-section">
          <h2>Profile details</h2>
          <p>These details are saved for this browser session.</p>
          <label className="settings-field">
            <span>Full name</span>
            <input
              type="text"
              autoComplete="name"
              value={profile.name}
              onChange={(event) =>
                setProfile((current) => ({ ...current, name: event.target.value }))
              }
              required
            />
          </label>
          <label className="settings-field">
            <span>Email address</span>
            <input
              type="email"
              autoComplete="email"
              value={profile.email}
              onChange={(event) =>
                setProfile((current) => ({ ...current, email: event.target.value }))
              }
              required
            />
          </label>
        </section>

        <section className="settings-section">
          <h2>Notifications</h2>
          <label className="settings-toggle">
            <input
              type="checkbox"
              checked={issueNotifications}
              onChange={(event) => setIssueNotifications(event.target.checked)}
            />
            <span>
              <strong>Issue updates</strong>
              <small>Keep me informed when issue reports change.</small>
            </span>
          </label>
        </section>

        <div className="settings-actions">
          {message && <p role="status" aria-live="polite">{message}</p>}
          <button type="submit" className="primary-btn">Save settings</button>
        </div>
      </form>
    </div>
  );
}

export default Settings;
