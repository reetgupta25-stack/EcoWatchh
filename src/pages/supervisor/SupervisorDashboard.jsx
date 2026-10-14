import React from "react";
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
import { tasks, workers, issues } from "../../data/mockData";

function SupervisorDashboard() {
  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const highPriorityIssues = issues.filter(
    (issue) => issue.priority === "High"
  ).length;

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

      {/* Stats */}
      <div className="stats-grid">

        <StatCard
          title="Assigned Tasks"
          value={tasks.length}
          icon={<ClipboardList size={24} />}
          subtitle="Total assigned"
        />

        <StatCard
          title="In Progress"
          value={inProgressTasks}
          icon={<Clock3 size={24} />}
          subtitle="Currently active"
        />

        <StatCard
          title="Completed"
          value={completedTasks}
          icon={<CheckCircle2 size={24} />}
          trend="+14%"
          subtitle="This month"
        />

        <StatCard
          title="Active Workers"
          value={workers.length}
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
            <strong>86%</strong>
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
              {workers.filter(
                (worker) => worker.status === "Available"
              ).length}
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

          <button className="text-btn">
            View All
          </button>

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

                  <tr key={task.id}>

                    <td>
                      <div className="issue-table-title">

                        <div>
                          <strong>{task.title}</strong>
                          <small>{task.issueId}</small>
                        </div>

                      </div>
                    </td>

                    <td>{task.worker}</td>

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

                    <td>{task.deadline}</td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </section>

    </div>
  );
}

export default SupervisorDashboard;