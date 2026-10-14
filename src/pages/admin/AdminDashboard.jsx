import { Link } from "react-router-dom";
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
import IssueCard from "../../components/IssueCard";
import { dashboardStats, issues, recentActivities } from "../../data/mockData";

function AdminDashboard() {
  const recentIssues = issues.slice(0, 4);

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
          value={dashboardStats.totalIssues}
          icon={<FileWarning size={24} />}
          trend="+12%"
          subtitle="from last month"
        />

        <StatCard
          title="Pending Issues"
          value={dashboardStats.pendingIssues}
          icon={<Clock3 size={24} />}
          subtitle="Need attention"
        />

        <StatCard
          title="In Progress"
          value={dashboardStats.inProgressIssues}
          icon={<LoaderCircle size={24} />}
          subtitle="Currently assigned"
        />

        <StatCard
          title="Completed"
          value={dashboardStats.completedIssues}
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
            <strong>128</strong>
          </div>
        </div>

        <div className="overview-card">
          <div className="overview-icon">
            <UserCog size={22} />
          </div>

          <div>
            <span>Active Workers</span>
            <strong>24</strong>
          </div>
        </div>

        <div className="overview-card">
          <div className="overview-icon">
            <TrendingUp size={22} />
          </div>

          <div>
            <span>Resolution Rate</span>
            <strong>78%</strong>
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

        <div className="issues-grid">
          {recentIssues.map((issue) => (
            <IssueCard
              key={issue.id}
              issue={issue}
            />
          ))}
        </div>

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

          {recentActivities.map((activity) => (
            <div
              className="activity-item"
              key={activity.id}
            >
              <div className="activity-avatar">
                {activity.user.charAt(0)}
              </div>

              <div className="activity-content">
                <p>
                  <strong>{activity.user}</strong>{" "}
                  {activity.action}
                </p>

                <span>
                  {activity.issue} · {activity.time}
                </span>
              </div>
            </div>
          ))}

        </div>

      </section>

    </div>
  );
}

export default AdminDashboard;