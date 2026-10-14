import React, { useState } from "react";
import {
  ArrowLeft,
  MapPin,
  CalendarDays,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

import StatusBadge from "../../components/StatusBadge";
import { tasks, issues } from "../../data/mockData";

function TaskDetails({ taskId = "TSK001" }) {
  const task = tasks.find(
    (item) => item.id === taskId
  );

  const issue = issues.find(
    (item) => item.id === task?.issueId
  );

  const [taskStatus, setTaskStatus] = useState(
    task?.status || "In Progress"
  );

  if (!task) {
    return (
      <div className="empty-state">
        <h2>Task Not Found</h2>
        <p>The requested task could not be found.</p>
      </div>
    );
  }

  return (
    <div className="task-details-page">

      <button className="back-btn">
        <ArrowLeft size={18} />
        Back to My Tasks
      </button>

      <div className="page-header">

        <div>
          <p className="page-eyebrow">
            TASK #{task.id}
          </p>

          <h1>{task.title}</h1>

          <p>
            Linked Issue: {task.issueId}
          </p>
        </div>

        <StatusBadge status={taskStatus} />

      </div>

      <div className="issue-details-grid">

        <div>

          <div className="details-card">

            <h2>Task Information</h2>

            <div className="issue-meta-grid">

              <div className="meta-item">
                <MapPin size={18} />

                <div>
                  <span>Location</span>
                  <strong>{task.location}</strong>
                </div>
              </div>

              <div className="meta-item">
                <CalendarDays size={18} />

                <div>
                  <span>Assigned Date</span>
                  <strong>{task.assignedDate}</strong>
                </div>
              </div>

              <div className="meta-item">
                <AlertTriangle size={18} />

                <div>
                  <span>Priority</span>
                  <strong>{task.priority}</strong>
                </div>
              </div>

              <div className="meta-item">
                <CalendarDays size={18} />

                <div>
                  <span>Deadline</span>
                  <strong>{task.deadline}</strong>
                </div>
              </div>

            </div>

          </div>

          {issue && (
            <div className="details-card">

              <h2>Issue Description</h2>

              <p className="details-description">
                {issue.description}
              </p>

            </div>
          )}

        </div>

        <aside className="details-sidebar">

          <div className="details-card">

            <h2>Update Task</h2>

            <p className="status-help">
              Update the task status after completing your work.
            </p>

            <div className="task-status-options">

              <button
                className={
                  taskStatus === "In Progress"
                    ? "status-option active"
                    : "status-option"
                }
                onClick={() => setTaskStatus("In Progress")}
              >
                <span>In Progress</span>
              </button>

              <button
                className={
                  taskStatus === "Completed"
                    ? "status-option active"
                    : "status-option"
                }
                onClick={() => setTaskStatus("Completed")}
              >
                <CheckCircle2 size={17} />
                <span>Completed</span>
              </button>

            </div>

            <button className="primary-btn full-width-btn">
              Save Status
            </button>

          </div>

        </aside>

      </div>

    </div>
  );
}

export default TaskDetails;