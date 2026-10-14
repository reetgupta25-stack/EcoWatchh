import { Link } from "react-router-dom";
import {
  TrendingUp,
  CheckCircle2,
  Clock3,
  AlertTriangle,
} from "lucide-react";

import {
  categories,
  dashboardStats,
  issues,
  monthlyIssues,
  tasks,
  users,
  workers,
} from "../../data/mockData";

function Analytics() {
  const resolutionRate = Math.round(
    (dashboardStats.completedIssues / dashboardStats.totalIssues) * 100
  );
  const highPriorityIssues = issues.filter(
    (issue) => issue.priority === "High"
  ).length;
  const maxValue = Math.max(
    ...monthlyIssues.map((item) => item.reported)
  );

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

      {/* Analytics Stats */}
      <div className="stats-grid">

        <div className="analytics-stat-card">
          <div className="analytics-stat-icon">
            <TrendingUp size={22} />
          </div>

          <span>Total Reports</span>
          <strong>{dashboardStats.totalIssues}</strong>
          <small>+12% this month</small>
        </div>

        <div className="analytics-stat-card">
          <div className="analytics-stat-icon">
            <CheckCircle2 size={22} />
          </div>

          <span>Resolution Rate</span>
          <strong>{resolutionRate}%</strong>
          <small>+8% from last month</small>
        </div>

        <div className="analytics-stat-card">
          <div className="analytics-stat-icon">
            <Clock3 size={22} />
          </div>

          <span>Avg. Resolution Time</span>
          <strong>2.4 Days</strong>
          <small>15% faster</small>
        </div>

        <div className="analytics-stat-card">
          <div className="analytics-stat-icon">
            <AlertTriangle size={22} />
          </div>

          <span>High Priority</span>
          <strong>{highPriorityIssues}</strong>
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
            <strong>{tasks.filter((task) => task.status === "In Progress").length}</strong>
            <small>Review task assignments</small>
          </Link>
          <Link className="analytics-link-card" to="/admin/users">
            <span>Platform users</span>
            <strong>{users.length}</strong>
            <small>Manage registered accounts</small>
          </Link>
          <Link className="analytics-link-card" to="/admin/workers">
            <span>Field workers</span>
            <strong>{workers.length}</strong>
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

          {monthlyIssues.map((item) => (

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
                      width: `${(category.count / 82) * 100}%`,
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