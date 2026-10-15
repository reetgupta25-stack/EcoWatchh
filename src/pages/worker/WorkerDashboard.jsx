import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle2, ClipboardList, Clock3, MapPin } from "lucide-react";
import StatCard from "../../components/StatCard";
import StatusBadge from "../../components/StatusBadge";
import { apiRequest } from "../../lib/api";

function WorkerDashboard() {
  const navigate = useNavigate();
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    apiRequest("/issues")
      .then((data) => setIssues(data.issues || []))
      .catch((requestError) => {
        if (requestError.status === 401) navigate("/login", { replace: true });
        else setError(requestError.message);
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const activeIssues = issues.filter((issue) => issue.status === "In Progress");
  const completedIssues = issues.filter((issue) => ["Completed", "Verified"].includes(issue.status));

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <div>
          <p className="page-eyebrow">FIELD OPERATIONS</p>
          <h1>Worker Dashboard</h1>
          <p>Review your assignments and update work as it progresses.</p>
        </div>
        <Link className="primary-btn" to="/worker/tasks">View My Tasks</Link>
      </div>

      {error && <p className="error-message" role="alert">{error}</p>}

      <div className="stats-grid">
        <StatCard title="Assigned Tasks" value={loading ? "—" : issues.length} icon={<ClipboardList size={24} />} subtitle="Assigned to you" />
        <StatCard title="In Progress" value={loading ? "—" : activeIssues.length} icon={<Clock3 size={24} />} subtitle="Currently active" />
        <StatCard title="Completed" value={loading ? "—" : completedIssues.length} icon={<CheckCircle2 size={24} />} subtitle="Resolved assignments" />
      </div>

      <section className="dashboard-section">
        <div className="section-header">
          <div><h2>Recent Assignments</h2><p>Your latest assigned environmental reports.</p></div>
          <Link className="text-btn" to="/worker/tasks">All tasks</Link>
        </div>
        {loading ? <div className="empty-state">Loading assignments...</div> : issues.length ? (
          <div className="worker-tasks-grid">
            {issues.slice(0, 4).map((issue) => (
              <article className="task-detail-card" key={issue._id}>
                <div className="task-card-header"><span className="task-id">{issue._id}</span><StatusBadge status={issue.status} /></div>
                <h3>{issue.title}</h3>
                <p>{issue.category}</p>
                <div className="task-card-info"><div><MapPin size={16} />{issue.location}</div></div>
                <div className="task-card-footer">
                  <span className={`priority-${issue.priority.toLowerCase()}`}>{issue.priority} Priority</span>
                  <Link className="primary-btn" to={`/worker/tasks/${issue._id}`}>Open Task</Link>
                </div>
              </article>
            ))}
          </div>
        ) : <div className="empty-state">No tasks have been assigned to you.</div>}
      </section>
    </div>
  );
}

export default WorkerDashboard;