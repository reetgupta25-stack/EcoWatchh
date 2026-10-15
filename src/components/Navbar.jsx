import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, UserCircle } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const user = (() => {
    try { return JSON.parse(sessionStorage.getItem("ecowatchUser")) || {}; }
    catch { return {}; }
  })();

  return (
    <header className="navbar">
      <div className="navbar-left">
        <div className="mobile-logo">
          🌱 EcoWatch
        </div>

        <form className="search-box" onSubmit={(event) => {
          event.preventDefault();
          const role = ["citizen", "admin", "supervisor", "worker"].includes(user.role) ? user.role : "citizen";
          navigate(`/${role}/map${search.trim() ? `?q=${encodeURIComponent(search.trim())}` : ""}`);
        }}>
          <Search size={18} />
          <input
            type="text"
            placeholder="Search issues..."
            aria-label="Search issues"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </form>
      </div>

      <div className="navbar-right">
        <div className="profile">
          <UserCircle size={36} />

          <div className="profile-info">
            <strong>{user.name || "EcoWatch User"}</strong>
            <span>{user.role || "Account"}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;