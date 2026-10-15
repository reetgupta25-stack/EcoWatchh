import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FileWarning,
  Clock3,
  LoaderCircle,
  CheckCircle2,
  Users,
  UserCog,
  TrendingUp,
} from "lucide-react";

import StatCard from "../../components/StatCard";
import StatusBadge from "../../components/StatusBadge";
import { apiRequest } from "../../lib/api";

function AdminDashboard() {
  const navigate = useNavigate();
  const [issues, setIssues] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([apiRequest("/issues"), apiRequest("/users")])
      .then(([issueData, userData]) => {
        setIssues(issueData.issues || []);
        setUsers(userData.users || []);
      })
      .catch((requestError) => {
        if (requestError.status === 401) navigate("/login", { replace: true });
        else setError(requestError.message);
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const pendingCount = issues.filter((issue) => ["Reported", "Under Review"].includes(issue.status)).length;
  const activeCount = issues.filter((issue) => ["Assigned", "In Progress"].includes(issue.status)).length;
  const completedCount = issues.filter((issue) => ["Completed", "Verified"].includes(issue.status)).length;
  const recentIssues = issues.slice(0, 4);
  const value = (count) => loading ? "—" : count;

  return (
    <div className="dashboard-page">

      {/* Page Header */}
      <div className="page-header">
        <div>
          <p className="page-eyebrow">ADMIN PANEL</p>
          <h1>Admin Dashboard</h1>
          <p>
            Monitor environmental issues, users, workers and overall platform activity.
          </p>
        </div>

        <Link className="primary-btn" to="/admin/issues">
          + Manage Issues
        </Link>
      </div>

      {/* Statistics */}
      <div className="stats-grid">

        <StatCard
          title="Total Issues"
          value={value(issues.length)}
          icon={<FileWarning size={24} />}
          trend="+12%"
          subtitle="from last month"
        />

        <StatCard
          title="Pending Issues"
          value={value(pendingCount)}
          icon={<Clock3 size={24} />}
          subtitle="Need attention"
        />

        <StatCard
          title="In Progress"
          value={value(activeCount)}
          icon={<LoaderCircle size={24} />}
          subtitle="Currently assigned"
        />

        <StatCard
          title="Completed"
          value={value(completedCount)}
          icon={<CheckCircle2 size={24} />}
          trend="+18%"
          subtitle="from last month"
        />

      </div>

      {/* Quick Overview */}
      <div className="admin-overview-grid">

        <div className="overview-card">
          <div className="overview-icon">
            <Users size={22} />
          </div>

          <div>
            <span>Total Users</span>
            <strong>{value(users.length)}</strong>
          </div>
        </div>

        <div className="overview-card">
          <div className="overview-icon">
            <UserCog size={22} />
          </div>

          <div>
            <span>Active Workers</span>
            <strong>{value(users.filter((user) => user.role === "worker" && user.isActive).length)}</strong>
          </div>
        </div>

        <div className="overview-card">
          <div className="overview-icon">
            <TrendingUp size={22} />
          </div>

          <div>
            <span>Resolution Rate</span>
            <strong>{value(issues.length ? Math.round((completedCount / issues.length) * 100) : 0)}%</strong>
          </div>
        </div>

      </div>

      {/* Recent Issues */}
      <section className="dashboard-section">

        <div className="section-header">
          <div>
            <h2>Recent Issues</h2>
            <p>Latest environmental complaints reported by citizens.</p>
          </div>

          <Link className="text-btn" to="/admin/issues">
            View All
          </Link>
        </div>

        {error && <p className="error-message" role="alert">{error}</p>}
        {loading ? <p>Loading issue data...</p> : recentIssues.length ? (
          <div className="issues-grid">
            {recentIssues.map((issue) => (
              <article className="issue-card" key={issue._id}>
                <div className="issue-card-top"><span>{issue.category}</span><StatusBadge status={issue.status} /></div>
                <h3 className="issue-title">{issue.title}</h3>
                <p className="issue-description">{issue.description}</p>
                <span className="issue-id">{issue.location}</span>
              </article>
            ))}
          </div>
        ) : <div className="empty-state">No issues have been reported yet.</div>}

      </section>

      {/* Recent Activity */}
      <section className="dashboard-section">

        <div className="section-header">
          <div>
            <h2>Recent Activity</h2>
            <p>Latest actions performed on the platform.</p>
          </div>
        </div>

        <div className="activity-card">

          {loading ? <p>Loading recent reports...</p> : recentIssues.length ? recentIssues.map((issue) => (
            <div className="activity-item" key={issue._id}>
              <div className="activity-avatar">{issue.title.charAt(0)}</div>
              <div className="activity-content">
                <p><strong>{issue.title}</strong> · {issue.status}</p>
                <span>{issue.updatedAt ? new Date(issue.updatedAt).toLocaleString() : "Update time unavailable"}</span>
              </div>
            </div>
          )) : <p>No recent reports.</p>}

        </div>

      </section>

    </div>
  );
}

export default AdminDashboard;