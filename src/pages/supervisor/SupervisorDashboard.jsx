import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ClipboardList,
  Clock3,
  CheckCircle2,
  Users,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

import StatCard from "../../components/StatCard";
import StatusBadge from "../../components/StatusBadge";
import { apiRequest } from "../../lib/api";

function SupervisorDashboard() {
  const navigate = useNavigate();
  const [issues, setIssues] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([apiRequest("/issues"), apiRequest("/users?role=worker")])
      .then(([issueData, userData]) => {
        setIssues(issueData.issues || []);
        setWorkers(userData.users || []);
      })
      .catch((requestError) => {
        if (requestError.status === 401) navigate("/login", { replace: true });
        else setError(requestError.message);
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const tasks = issues.filter((issue) => issue.assignedTo);
  const inProgressTasks = tasks.filter((task) => task.status === "In Progress").length;
  const completedTasks = tasks.filter((task) => ["Completed", "Verified"].includes(task.status)).length;
  const highPriorityIssues = issues.filter((issue) => ["High", "Critical"].includes(issue.priority)).length;
  const activeWorkers = new Set(tasks.filter((task) => !["Completed", "Verified"].includes(task.status)).map((task) => task.assignedTo?._id)).size;
  const completionRate = tasks.length ? Math.round((completedTasks / tasks.length) * 100) : 0;

  return (
    <div className="dashboard-page">

      {/* Header */}
      <div className="page-header">
        <div>
          <p className="page-eyebrow">SUPERVISOR PANEL</p>

          <h1>Supervisor Dashboard</h1>

          <p>
            Monitor assigned issues, workers and field operations.
          </p>
        </div>
      </div>

      {error && <p className="error-message" role="alert">{error}</p>}

      {/* Stats */}
      <div className="stats-grid">

        <StatCard
          title="Assigned Tasks"
          value={loading ? "—" : tasks.length}
          icon={<ClipboardList size={24} />}
          subtitle="Total assigned"
        />

        <StatCard
          title="In Progress"
          value={loading ? "—" : inProgressTasks}
          icon={<Clock3 size={24} />}
          subtitle="Currently active"
        />

        <StatCard
          title="Completed"
          value={loading ? "—" : completedTasks}
          icon={<CheckCircle2 size={24} />}
          subtitle="Completed or verified"
        />

        <StatCard
          title="Active Workers"
          value={loading ? "—" : workers.filter((worker) => worker.isActive).length}
          icon={<Users size={24} />}
          subtitle="Field workers"
        />

      </div>

      {/* Overview Cards */}
      <div className="admin-overview-grid">

        <div className="overview-card">

          <div className="overview-icon">
            <TrendingUp size={22} />
          </div>

          <div>
            <span>Team Efficiency</span>
            <strong>{loading ? "—" : `${completionRate}%`}</strong>
          </div>

        </div>

        <div className="overview-card">

          <div className="overview-icon">
            <AlertTriangle size={22} />
          </div>

          <div>
            <span>High Priority</span>
            <strong>{highPriorityIssues}</strong>
          </div>

        </div>

        <div className="overview-card">

          <div className="overview-icon">
            <Users size={22} />
          </div>

          <div>
            <span>Available Workers</span>
            <strong>
              {loading ? "—" : Math.max(0, workers.filter((worker) => worker.isActive).length - activeWorkers)}
            </strong>
          </div>

        </div>

      </div>

      {/* Current Tasks */}
      <section className="dashboard-section">

        <div className="section-header">

          <div>
            <h2>Current Tasks</h2>

            <p>
              Monitor the latest tasks assigned to your team.
            </p>
          </div>

          <Link className="text-btn" to="/supervisor/issues">
            View All
          </Link>

        </div>

        <div className="table-card">

          <div className="table-wrapper">

            <table className="data-table">

              <thead>
                <tr>
                  <th>Task</th>
                  <th>Worker</th>
                  <th>Location</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Deadline</th>
                </tr>
              </thead>

              <tbody>

                {tasks.map((task) => (

                    <tr key={task._id}>

                    <td>
                      <div className="issue-table-title">

                        <div>
                          <strong>{task.title}</strong>
                          <small>{task._id}</small>
                        </div>

                      </div>
                    </td>

                    <td>{task.assignedTo?.name || "Unknown"}</td>

                    <td>{task.location}</td>

                    <td>
                      <span
                        className={`priority-${task.priority.toLowerCase()}`}
                      >
                        {task.priority}
                      </span>
                    </td>

                    <td>
                      <StatusBadge status={task.status} />
                    </td>

                    <td>{task.deadline ? new Date(task.deadline).toLocaleDateString() : "Not set"}</td>

                  </tr>

                ))}
                {!loading && tasks.length === 0 && <tr><td colSpan="6" className="issue-map-empty">No assigned work is available.</td></tr>}

              </tbody>

            </table>

          </div>

        </div>

      </section>

    </div>
  );
}

export default SupervisorDashboard;