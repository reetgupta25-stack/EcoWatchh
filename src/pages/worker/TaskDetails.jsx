import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  CalendarDays,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

import StatusBadge from "../../components/StatusBadge";
import { apiRequest } from "../../lib/api";

function TaskDetails() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [taskStatus, setTaskStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    apiRequest(`/issues/${encodeURIComponent(taskId)}`)
      .then((data) => {
        setTask(data.issue);
        setTaskStatus(data.issue.status);
      })
      .catch((requestError) => {
        if (requestError.status === 401) navigate("/login", { replace: true });
        else setError(requestError.message);
      })
      .finally(() => setLoading(false));
  }, [navigate, taskId]);

  const saveStatus = async () => {
    setSaving(true);
    setError("");
    try {
      const result = await apiRequest(`/issues/${task._id}`, {
        method: "PATCH",
        body: { status: taskStatus },
      });
      setTask(result.issue);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="empty-state">Loading task...</div>;

  if (!task) {
    return (
      <div className="empty-state">
        <h2>Task Not Found</h2>
        <p>{error || "The requested task could not be found."}</p>
        <Link className="back-btn" to="/worker/tasks">Back to My Tasks</Link>
      </div>
    );
  }

  return (
    <div className="task-details-page">

      <Link className="back-btn" to="/worker/tasks">
        <ArrowLeft size={18} />
        Back to My Tasks
      </Link>

      <div className="page-header">

        <div>
          <p className="page-eyebrow">
            TASK #{task._id}
          </p>

          <h1>{task.title}</h1>

          <p>
            Linked report: {task.title}
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
                    <strong>{new Date(task.updatedAt).toLocaleDateString()}</strong>
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
                  <strong>{task.deadline ? new Date(task.deadline).toLocaleDateString() : "Not set"}</strong>
                </div>
              </div>

            </div>

          </div>

          {task && (
            <div className="details-card">

              <h2>Issue Description</h2>

              <p className="details-description">
                {task.description}
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
                type="button"
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
                type="button"
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

            {error && <p role="alert" className="error-message">{error}</p>}
            <button className="primary-btn full-width-btn" onClick={saveStatus} disabled={saving || taskStatus === task.status}>
              {saving ? "Saving..." : "Save Status"}
            </button>

          </div>

        </aside>

      </div>

    </div>
  );
}

export default TaskDetails;