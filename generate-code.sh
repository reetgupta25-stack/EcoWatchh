#!/bin/bash

echo "🌿 Generating EcoWatch code..."

# =========================
# main.jsx
# =========================

cat > src/main.jsx <<'EOF'
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
EOF


# =========================
# App.jsx
# =========================

cat > src/App.jsx <<'EOF'
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import CitizenDashboard from "./pages/citizen/CitizenDashboard";
import ReportIssue from "./pages/citizen/ReportIssue";
import MyIssues from "./pages/citizen/MyIssues";
import IssueDetails from "./pages/citizen/IssueDetails";

import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageIssues from "./pages/admin/ManageIssues";
import ManageUsers from "./pages/admin/ManageUsers";
import Analytics from "./pages/admin/Analytics";

import SupervisorDashboard from "./pages/supervisor/SupervisorDashboard";
import AssignedIssues from "./pages/supervisor/AssignedIssues";
import ManageWorkers from "./pages/supervisor/ManageWorkers";

import WorkerDashboard from "./pages/worker/WorkerDashboard";
import MyTasks from "./pages/worker/MyTasks";
import TaskDetails from "./pages/worker/TaskDetails";

function App() {
  return (
    <Routes>

      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Citizen */}
      <Route path="/citizen" element={<CitizenDashboard />} />
      <Route path="/citizen/report" element={<ReportIssue />} />
      <Route path="/citizen/issues" element={<MyIssues />} />
      <Route path="/citizen/issues/:id" element={<IssueDetails />} />

      {/* Admin */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/issues" element={<ManageIssues />} />
      <Route path="/admin/users" element={<ManageUsers />} />
      <Route path="/admin/analytics" element={<Analytics />} />

      {/* Supervisor */}
      <Route path="/supervisor" element={<SupervisorDashboard />} />
      <Route path="/supervisor/issues" element={<AssignedIssues />} />
      <Route path="/supervisor/workers" element={<ManageWorkers />} />

      {/* Worker */}
      <Route path="/worker" element={<WorkerDashboard />} />
      <Route path="/worker/tasks" element={<MyTasks />} />
      <Route path="/worker/tasks/:id" element={<TaskDetails />} />

    </Routes>
  );
}

export default App;
EOF


# =========================
# mockData.js
# =========================

cat > src/data/mockData.js <<'EOF'
export const issues = [
  {
    id: 1,
    title: "Overflowing Dustbin",
    category: "Waste",
    location: "Main Market",
    status: "Submitted",
    priority: "High",
    description:
      "The dustbin near the main market has been overflowing for several days."
  },
  {
    id: 2,
    title: "Water Leakage",
    category: "Water",
    location: "College Road",
    status: "In Progress",
    priority: "High",
    description:
      "A water pipe is leaking continuously near the college road."
  },
  {
    id: 3,
    title: "Unclean Public Park",
    category: "Sanitation",
    location: "City Park",
    status: "Assigned",
    priority: "Medium",
    description:
      "The public park requires cleaning and waste removal."
  },
  {
    id: 4,
    title: "Broken Streetlight",
    category: "Infrastructure",
    location: "Station Road",
    status: "Completed",
    priority: "Low",
    description:
      "A streetlight near Station Road was not working."
  }
];

export const workers = [
  {
    id: 1,
    name: "Ravi Kumar",
    department: "Waste Management",
    status: "Available"
  },
  {
    id: 2,
    name: "Amit Singh",
    department: "Water Management",
    status: "Busy"
  },
  {
    id: 3,
    name: "Vikas Sharma",
    department: "Sanitation",
    status: "Available"
  }
];

export const stats = {
  total: 128,
  pending: 34,
  inProgress: 42,
  resolved: 52
};
EOF


# =========================
# Navbar.jsx
# =========================

cat > src/components/Navbar.jsx <<'EOF'
import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";

function Navbar() {
  return (
    <nav className="navbar">

      <Link to="/" className="logo">
        <span className="logo-icon">
          <Leaf size={20} />
        </span>

        <span>EcoWatch</span>
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/citizen">Dashboard</Link>
        <Link to="/citizen/issues">My Issues</Link>
        <Link to="/login">Login</Link>
        <Link to="/register" className="nav-button">
          Register
        </Link>
      </div>

    </nav>
  );
}

export default Navbar;
EOF


# =========================
# StatCard.jsx
# =========================

cat > src/components/StatCard.jsx <<'EOF'
function StatCard({ title, value, icon }) {
  return (
    <div className="stat-card">

      <div className="stat-icon">
        {icon}
      </div>

      <div>
        <p className="stat-title">{title}</p>
        <h2>{value}</h2>
      </div>

    </div>
  );
}

export default StatCard;
EOF


# =========================
# StatusBadge.jsx
# =========================

cat > src/components/StatusBadge.jsx <<'EOF'
function StatusBadge({ status }) {

  const className = status
    .toLowerCase()
    .replace(" ", "-");

  return (
    <span className={`status-badge ${className}`}>
      {status}
    </span>
  );
}

export default StatusBadge;
EOF


# =========================
# IssueCard.jsx
# =========================

cat > src/components/IssueCard.jsx <<'EOF'
import { MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";

function IssueCard({ issue }) {
  return (
    <div className="issue-card">

      <div className="issue-card-top">
        <div>
          <p className="issue-category">
            {issue.category}
          </p>

          <h3>{issue.title}</h3>
        </div>

        <StatusBadge status={issue.status} />
      </div>

      <p className="issue-description">
        {issue.description}
      </p>

      <div className="issue-footer">

        <span className="location">
          <MapPin size={15} />
          {issue.location}
        </span>

        <Link to={`/citizen/issues/${issue.id}`}>
          View
          <ArrowRight size={15} />
        </Link>

      </div>

    </div>
  );
}

export default IssueCard;
EOF


# =========================
# Home.jsx
# =========================

cat > src/pages/Home.jsx <<'EOF'
import { Link } from "react-router-dom";
import {
  Leaf,
  MapPin,
  BarChart3,
  Users,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

import Navbar from "../components/Navbar";

function Home() {
  return (
    <>
      <Navbar />

      <main>

        {/* Hero */}

        <section className="hero">

          <div className="hero-content">

            <span className="eyebrow">
              <Leaf size={15} />
              Environmental Civic Platform
            </span>

            <h1>
              Together, we can build
              <span> cleaner communities.</span>
            </h1>

            <p>
              EcoWatch connects citizens, authorities, supervisors,
              and field workers to report, track, and resolve
              environmental issues.
            </p>

            <div className="hero-buttons">

              <Link to="/citizen/report" className="primary-button">
                Report an Issue
                <ArrowRight size={18} />
              </Link>

              <Link to="/citizen" className="secondary-button">
                Explore Dashboard
              </Link>

            </div>

          </div>

          <div className="hero-visual">

            <div className="hero-card">

              <div className="hero-card-icon">
                <CheckCircle2 size={28} />
              </div>

              <div>
                <strong>Issue Resolved</strong>
                <p>Broken streetlight · Station Road</p>
              </div>

            </div>

            <div className="hero-stat">
              <strong>128+</strong>
              <span>Issues managed</span>
            </div>

          </div>

        </section>


        {/* Features */}

        <section className="section">

          <div className="section-heading">

            <span className="eyebrow">
              How EcoWatch helps
            </span>

            <h2>
              From complaint to action.
            </h2>

            <p>
              A simple and transparent way to manage
              environmental and civic issues.
            </p>

          </div>


          <div className="feature-grid">

            <div className="feature-card">
              <div className="feature-icon">
                <MapPin />
              </div>

              <h3>Report Issues</h3>

              <p>
                Citizens can quickly report garbage,
                water leakage, sanitation and other issues.
              </p>
            </div>


            <div className="feature-card">
              <div className="feature-icon">
                <Users />
              </div>

              <h3>Coordinate Teams</h3>

              <p>
                Administrators and supervisors can
                assign work to the right field workers.
              </p>
            </div>


            <div className="feature-card">
              <div className="feature-icon">
                <BarChart3 />
              </div>

              <h3>Track Progress</h3>

              <p>
                Monitor issue status and understand
                how effectively complaints are resolved.
              </p>
            </div>

          </div>

        </section>


        {/* CTA */}

        <section className="cta-section">

          <div>
            <span className="eyebrow light">
              Make an impact
            </span>

            <h2>
              Your report can make
              a difference.
            </h2>

            <p>
              Help create cleaner and more sustainable
              communities by reporting local issues.
            </p>
          </div>

          <Link to="/register" className="light-button">
            Join EcoWatch
            <ArrowRight size={18} />
          </Link>

        </section>

      </main>
    </>
  );
}

export default Home;
EOF


# =========================
# Login.jsx
# =========================

cat > src/pages/Login.jsx <<'EOF'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Login() {

  const navigate = useNavigate();

  const [role, setRole] = useState("citizen");

  function handleLogin(e) {
    e.preventDefault();

    navigate(`/${role}`);
  }

  return (
    <>
      <Navbar />

      <main className="auth-page">

        <div className="auth-card">

          <div className="auth-header">

            <span className="eyebrow">
              Welcome back
            </span>

            <h1>Login to EcoWatch</h1>

            <p>
              Access your environmental management dashboard.
            </p>

          </div>


          <form onSubmit={handleLogin}>

            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              required
            />


            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              required
            />


            <label>Select Role</label>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="citizen">Citizen</option>
              <option value="admin">Admin</option>
              <option value="supervisor">Supervisor</option>
              <option value="worker">Worker</option>
            </select>


            <button className="primary-button full-width">
              Login
            </button>

          </form>


          <p className="auth-bottom">
            Don't have an account?
            <Link to="/register"> Create one</Link>
          </p>

        </div>

      </main>
    </>
  );
}

export default Login;
EOF


# =========================
# Register.jsx
# =========================

cat > src/pages/Register.jsx <<'EOF'
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Register() {
  return (
    <>
      <Navbar />

      <main className="auth-page">

        <div className="auth-card">

          <div className="auth-header">

            <span className="eyebrow">
              Join EcoWatch
            </span>

            <h1>Create an account</h1>

            <p>
              Become part of a cleaner and greener community.
            </p>

          </div>


          <form>

            <label>Full Name</label>

            <input
              type="text"
              placeholder="Enter your full name"
              required
            />


            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              required
            />


            <label>Password</label>

            <input
              type="password"
              placeholder="Create a password"
              required
            />


            <label>Role</label>

            <select>
              <option>Citizen</option>
              <option>Worker</option>
            </select>


            <button className="primary-button full-width">
              Create Account
            </button>

          </form>


          <p className="auth-bottom">
            Already have an account?
            <Link to="/login"> Login</Link>
          </p>

        </div>

      </main>
    </>
  );
}

export default Register;
EOF


# =========================
# CitizenDashboard.jsx
# =========================

cat > src/pages/citizen/CitizenDashboard.jsx <<'EOF'
import {
  FileText,
  Clock3,
  LoaderCircle,
  CheckCircle2
} from "lucide-react";

import Navbar from "../../components/Navbar";
import StatCard from "../../components/StatCard";
import IssueCard from "../../components/IssueCard";
import { issues } from "../../data/mockData";

function CitizenDashboard() {

  return (
    <>
      <Navbar />

      <main className="dashboard">

        <div className="page-header">

          <div>
            <span className="eyebrow">
              Citizen Dashboard
            </span>

            <h1>Good morning 👋</h1>

            <p>
              Track your environmental reports and their progress.
            </p>
          </div>

        </div>


        <div className="stats-grid">

          <StatCard
            title="Total Reports"
            value="12"
            icon={<FileText />}
          />

          <StatCard
            title="Pending"
            value="4"
            icon={<Clock3 />}
          />

          <StatCard
            title="In Progress"
            value="3"
            icon={<LoaderCircle />}
          />

          <StatCard
            title="Resolved"
            value="5"
            icon={<CheckCircle2 />}
          />

        </div>


        <section className="dashboard-section">

          <div className="section-title-row">
            <div>
              <h2>Recent Issues</h2>
              <p>Your latest environmental reports.</p>
            </div>
          </div>


          <div className="issue-grid">

            {issues.slice(0, 3).map((issue) => (
              <IssueCard
                key={issue.id}
                issue={issue}
              />
            ))}

          </div>

        </section>

      </main>
    </>
  );
}

export default CitizenDashboard;
EOF


# =========================
# ReportIssue.jsx
# =========================

cat > src/pages/citizen/ReportIssue.jsx <<'EOF'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

function ReportIssue() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    category: "Waste",
    location: "",
    description: ""
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    alert("Issue submitted successfully!");

    navigate("/citizen/issues");
  }

  return (
    <>
      <Navbar />

      <main className="dashboard">

        <div className="page-header">

          <div>
            <span className="eyebrow">
              Citizen
            </span>

            <h1>Report an Issue</h1>

            <p>
              Tell us about an environmental or civic problem.
            </p>
          </div>

        </div>


        <div className="form-card">

          <form onSubmit={handleSubmit}>

            <div className="form-group">

              <label>Issue Title</label>

              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Example: Overflowing dustbin"
                required
              />

            </div>


            <div className="form-row">

              <div className="form-group">

                <label>Category</label>

                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                >
                  <option>Waste</option>
                  <option>Water</option>
                  <option>Sanitation</option>
                  <option>Infrastructure</option>
                  <option>Pollution</option>
                  <option>Other</option>
                </select>

              </div>


              <div className="form-group">

                <label>Location</label>

                <input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="Example: Main Market"
                  required
                />

              </div>

            </div>


            <div className="form-group">

              <label>Description</label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe the issue..."
                rows="6"
                required
              />

            </div>


            <div className="form-group">

              <label>Upload Image</label>

              <input type="file" accept="image/*" />

            </div>


            <button className="primary-button">
              Submit Issue
            </button>

          </form>

        </div>

      </main>
    </>
  );
}

export default ReportIssue;
EOF


# =========================
# MyIssues.jsx
# =========================

cat > src/pages/citizen/MyIssues.jsx <<'EOF'
import Navbar from "../../components/Navbar";
import IssueCard from "../../components/IssueCard";
import { issues } from "../../data/mockData";

function MyIssues() {
  return (
    <>
      <Navbar />

      <main className="dashboard">

        <div className="page-header">

          <div>
            <span className="eyebrow">
              Citizen
            </span>

            <h1>My Issues</h1>

            <p>
              View and track all your reported issues.
            </p>
          </div>

        </div>


        <div className="issue-grid">

          {issues.map((issue) => (
            <IssueCard
              key={issue.id}
              issue={issue}
            />
          ))}

        </div>

      </main>
    </>
  );
}

export default MyIssues;
EOF


# =========================
# IssueDetails.jsx
# =========================

cat > src/pages/citizen/IssueDetails.jsx <<'EOF'
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import StatusBadge from "../../components/StatusBadge";
import { issues } from "../../data/mockData";

function IssueDetails() {

  const { id } = useParams();

  const issue = issues.find(
    (item) => item.id === Number(id)
  );

  if (!issue) {
    return (
      <>
        <Navbar />

        <main className="dashboard">
          <h1>Issue not found</h1>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="dashboard">

        <div className="page-header">

          <div>
            <span className="eyebrow">
              Issue #{issue.id}
            </span>

            <h1>{issue.title}</h1>

            <p>{issue.location}</p>
          </div>

          <StatusBadge status={issue.status} />

        </div>


        <div className="detail-card">

          <h2>Issue Details</h2>

          <p>
            {issue.description}
          </p>


          <div className="detail-grid">

            <div>
              <span>Category</span>
              <strong>{issue.category}</strong>
            </div>

            <div>
              <span>Priority</span>
              <strong>{issue.priority}</strong>
            </div>

            <div>
              <span>Location</span>
              <strong>{issue.location}</strong>
            </div>

            <div>
              <span>Status</span>
              <strong>{issue.status}</strong>
            </div>

          </div>

        </div>


        <div className="detail-card">

          <h2>Progress</h2>

          <div className="timeline">

            <div className="timeline-item active">
              <strong>Issue Submitted</strong>
              <span>Your issue was received.</span>
            </div>

            <div className="timeline-item active">
              <strong>Under Review</strong>
              <span>Authorities reviewed the report.</span>
            </div>

            <div className="timeline-item">
              <strong>Resolution</strong>
              <span>The issue will be resolved by the assigned team.</span>
            </div>

          </div>

        </div>

      </main>
    </>
  );
}

export default IssueDetails;
EOF


echo ""
echo "🌿 EcoWatch code generated successfully!"
echo ""
echo "Run the project with:"
echo "npm run dev"
