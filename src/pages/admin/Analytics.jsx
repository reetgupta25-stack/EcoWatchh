import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  TrendingUp,
  CheckCircle2,
  Clock3,
  AlertTriangle,
} from "lucide-react";

import { apiRequest } from "../../lib/api";

function Analytics() {
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

  const completedCount = issues.filter((issue) => ["Completed", "Verified"].includes(issue.status)).length;
  const resolutionRate = issues.length ? Math.round((completedCount / issues.length) * 100) : 0;
  const highPriorityIssues = issues.filter((issue) => ["High", "Critical"].includes(issue.priority)).length;
  const months = Array.from({ length: 6 }, (_, index) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (5 - index), 1);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    const monthIssues = issues.filter((issue) => issue.createdAt?.startsWith(key));
    return {
      month: date.toLocaleString("en", { month: "short" }),
      reported: monthIssues.length,
      resolved: monthIssues.filter((issue) => ["Completed", "Verified"].includes(issue.status)).length,
    };
  });
  const maxValue = Math.max(1, ...months.map((item) => item.reported));
  const categories = [...new Set(issues.map((issue) => issue.category))].map((name) => ({
    id: name,
    name,
    count: issues.filter((issue) => issue.category === name).length,
  }));
  const assignedTasks = issues.filter((issue) => issue.assignedTo);

  return (
    <div className="admin-page">

      {/* Header */}
      <div className="page-header">

        <div>
          <p className="page-eyebrow">PLATFORM INSIGHTS</p>

          <h1>Analytics</h1>

          <p>
            Track environmental issues, resolution performance and trends.
          </p>
        </div>

      </div>

      {error && <p className="error-message" role="alert">{error}</p>}

      {/* Analytics Stats */}
      <div className="stats-grid">

        <div className="analytics-stat-card">
          <div className="analytics-stat-icon">
            <TrendingUp size={22} />
          </div>

          <span>Total Reports</span>
          <strong>{loading ? "—" : issues.length}</strong>
          <small>Stored reports</small>
        </div>

        <div className="analytics-stat-card">
          <div className="analytics-stat-icon">
            <CheckCircle2 size={22} />
          </div>

          <span>Resolution Rate</span>
          <strong>{loading ? "—" : `${resolutionRate}%`}</strong>
          <small>Completed or verified</small>
        </div>

        <div className="analytics-stat-card">
          <div className="analytics-stat-icon">
            <Clock3 size={22} />
          </div>

          <span>Avg. Resolution Time</span>
          <strong>—</strong>
          <small>Resolution dates are not recorded</small>
        </div>

        <div className="analytics-stat-card">
          <div className="analytics-stat-icon">
            <AlertTriangle size={22} />
          </div>

          <span>High Priority</span>
          <strong>{loading ? "—" : highPriorityIssues}</strong>
          <small>Needs attention</small>
        </div>

      </div>

      <section className="analytics-card analytics-links-card">
        <div className="section-header">
          <div>
            <h2>Operations overview</h2>
            <p>Open the management pages behind your platform activity.</p>
          </div>
        </div>
        <div className="analytics-links-grid">
          <Link className="analytics-link-card" to="/admin/tasks">
            <span>Active tasks</span>
            <strong>{loading ? "—" : assignedTasks.filter((issue) => issue.status === "In Progress").length}</strong>
            <small>Review task assignments</small>
          </Link>
          <Link className="analytics-link-card" to="/admin/users">
            <span>Platform users</span>
            <strong>{loading ? "—" : users.length}</strong>
            <small>Manage registered accounts</small>
          </Link>
          <Link className="analytics-link-card" to="/admin/workers">
            <span>Field workers</span>
            <strong>{loading ? "—" : users.filter((user) => user.role === "worker").length}</strong>
            <small>Review worker availability</small>
          </Link>
          <Link className="analytics-link-card" to="/admin/map">
            <span>Issue locations</span>
            <strong>{issues.length}</strong>
            <small>Explore reports on the issue map</small>
          </Link>
        </div>
      </section>

      {/* Monthly Chart */}
      <section className="analytics-card">

        <div className="section-header">

          <div>
            <h2>Issue Trends</h2>
            <p>Reported vs resolved issues over the past months.</p>
          </div>

        </div>

        <div className="chart-area">

              {months.map((item) => (

            <div
              className="chart-column"
              key={item.month}
            >

              <div className="chart-bars">

                <div
                  className="chart-bar reported"
                  style={{
                    height: `${(item.reported / maxValue) * 100}%`,
                  }}
                  title={`Reported: ${item.reported}`}
                ></div>

                <div
                  className="chart-bar resolved"
                  style={{
                    height: `${(item.resolved / maxValue) * 100}%`,
                  }}
                  title={`Resolved: ${item.resolved}`}
                ></div>

              </div>

              <span>{item.month}</span>

            </div>

          ))}

        </div>

        <div className="chart-legend">

          <span>
            <i className="legend-dot reported"></i>
            Reported
          </span>

          <span>
            <i className="legend-dot resolved"></i>
            Resolved
          </span>

        </div>

      </section>

      {/* Categories */}
      <section className="analytics-card">

        <div className="section-header">

          <div>
            <h2>Issues by Category</h2>
            <p>Distribution of reported environmental issues.</p>
          </div>

        </div>

        <div className="category-list">

          {categories.map((category) => (

            <div
              className="category-row"
              key={category.id}
            >

              <div className="category-info">

                <span className="category-icon">
                  {category.icon}
                </span>

                <div>
                  <strong>{category.name}</strong>
                  <span>{category.count} issues</span>
                </div>

              </div>

              <div className="category-progress">

                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${issues.length ? (category.count / issues.length) * 100 : 0}%`,
                    }}
                  ></div>
                </div>

              </div>

              <strong className="category-count">
                {category.count}
              </strong>

            </div>

          ))}

        </div>

      </section>

    </div>
  );
}

export default Analytics;