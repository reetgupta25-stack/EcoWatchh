import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  BarChart3,
  ClipboardList,
  FileWarning,
  LayoutDashboard,
  Leaf,
  LogOut,
  Map,
  PlusCircle,
  Settings,
  UserCog,
  Users,
} from "lucide-react";

const navigationByRole = {
  admin: [
    {
      title: "MAIN MENU",
      links: [
        { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
        { label: "Manage Issues", path: "/admin/issues", icon: FileWarning },
        { label: "Issue Map", path: "/admin/map", icon: Map },
      ],
    },
    {
      title: "MANAGEMENT",
      links: [
        { label: "Analytics", path: "/admin/analytics", icon: BarChart3 },
        { label: "Tasks", path: "/admin/tasks", icon: ClipboardList },
        { label: "Users", path: "/admin/users", icon: Users },
        { label: "Workers", path: "/admin/workers", icon: UserCog },
      ],
    },
    {
      title: "SYSTEM",
      links: [{ label: "Settings", path: "/admin/settings", icon: Settings }],
    },
  ],
  citizen: [
    {
      title: "MAIN MENU",
      links: [
        { label: "Dashboard", path: "/citizen/dashboard", icon: LayoutDashboard },
        { label: "Report Issue", path: "/citizen/report-issue", icon: PlusCircle },
        { label: "My Issues", path: "/citizen/my-issues", icon: FileWarning },
        { label: "Issue Map", path: "/citizen/map", icon: Map },
      ],
    },
    {
      title: "SYSTEM",
      links: [{ label: "Settings", path: "/citizen/settings", icon: Settings }],
    },
  ],
  supervisor: [
    {
      title: "MAIN MENU",
      links: [
        { label: "Dashboard", path: "/supervisor/dashboard", icon: LayoutDashboard },
        { label: "Assigned Issues", path: "/supervisor/issues", icon: FileWarning },
        { label: "Issue Map", path: "/supervisor/map", icon: Map },
      ],
    },
    {
      title: "MANAGEMENT",
      links: [
        { label: "Workers", path: "/supervisor/workers", icon: UserCog },
      ],
    },
    {
      title: "SYSTEM",
      links: [{ label: "Settings", path: "/supervisor/settings", icon: Settings }],
    },
  ],
  worker: [
    {
      title: "MAIN MENU",
      links: [
        { label: "Dashboard", path: "/worker/dashboard", icon: LayoutDashboard },
        { label: "My Tasks", path: "/worker/tasks", icon: ClipboardList },
        { label: "Issue Map", path: "/worker/map", icon: Map },
      ],
    },
    {
      title: "SYSTEM",
      links: [{ label: "Settings", path: "/worker/settings", icon: Settings }],
    },
  ],
};

function Sidebar({ role: requestedRole }) {
  const navigate = useNavigate();
  let user;

  try {
    user = JSON.parse(sessionStorage.getItem("ecowatchUser")) || {};
  } catch {
    user = {};
  }

  const role = String(requestedRole || user.role || "citizen").toLowerCase();
  const navigation = navigationByRole[role] || navigationByRole.citizen;
  const userName = user.name || "EcoWatch User";
  const roleName = role.charAt(0).toUpperCase() + role.slice(1);

  const handleLogout = () => {
    sessionStorage.removeItem("ecowatchToken");
    sessionStorage.removeItem("ecowatchUser");
    navigate("/login", { replace: true });
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">
          <Leaf size={24} />
        </div>
        <div>
          <h2>EcoWatch</h2>
          <span>Environmental Care</span>
        </div>
      </div>

      <div className="sidebar-user">
        <div className="user-avatar">{userName.charAt(0).toUpperCase()}</div>
        <div>
          <strong>{userName}</strong>
          <span>{roleName}</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navigation.map((group) => (
          <React.Fragment key={group.title}>
            <p className="menu-title">{group.title}</p>
            {group.links.map(({ label, path, icon: Icon }) => (
              <NavLink
                to={path}
                end
                key={path}
                className={({ isActive }) =>
                  `sidebar-link${isActive ? " active" : ""}`
                }
              >
                <Icon size={20} />
                <span>{label}</span>
              </NavLink>
            ))}
          </React.Fragment>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <button type="button" className="logout-btn" onClick={handleLogout}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
