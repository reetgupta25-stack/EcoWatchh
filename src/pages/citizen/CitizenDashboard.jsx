import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FileWarning,
  Clock3,
  LoaderCircle,
  CheckCircle2,
  PlusCircle,
  ArrowRight,
} from "lucide-react";

import StatCard from "../../components/StatCard";
import StatusBadge from "../../components/StatusBadge";
import { apiRequest } from "../../lib/api";

function CitizenDashboard() {
  const navigate = useNavigate();
  const [myIssues, setMyIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    apiRequest("/issues")
      .then((data) => setMyIssues(data.issues || []))
      .catch((requestError) => {
        if (requestError.status === 401) navigate("/login", { replace: true });
        else setError(requestError.message);
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const pendingCount = myIssues.filter((issue) =>
    ["Reported", "Under Review"].includes(issue.status)
  ).length;
  const inProgressCount = myIssues.filter((issue) => issue.status === "In Progress").length;
  const completedCount = myIssues.filter((issue) => ["Completed", "Verified"].includes(issue.status)).length;
  const user = (() => {
    try { return JSON.parse(sessionStorage.getItem("ecowatchUser")) || {}; }
    catch { return {}; }
  })();

  return (
    <div className="dashboard-page">

      {/* Header */}
      <div className="page-header">
        <div>
          <p className="page-eyebrow">CITIZEN PORTAL</p>

            <h1>Welcome back, {user.name || "Citizen"}</h1>

          <p>
            Help make your community cleaner, greener and better.
          </p>
        </div>

        <Link className="primary-btn" to="/citizen/report-issue">
          <PlusCircle size={18} />
          Report an Issue
        </Link>
      </div>

      {/* Stats */}
      <div className="stats-grid">

        <StatCard
          title="Total Issues"
          value={loading ? "—" : myIssues.length}
          icon={<FileWarning size={24} />}
          subtitle="Your reports"
        />

        <StatCard
          title="Pending"
          value={loading ? "—" : pendingCount}
          icon={<Clock3 size={24} />}
          subtitle="Awaiting action"
        />

        <StatCard
          title="In Progress"
          value={loading ? "—" : inProgressCount}
          icon={<LoaderCircle size={24} />}
          subtitle="Being resolved"
        />

        <StatCard
          title="Completed"
          value={loading ? "—" : completedCount}
          icon={<CheckCircle2 size={24} />}
          subtitle="Successfully resolved"
        />

      </div>

      {/* My Recent Issues */}
      <section className="dashboard-section">

        <div className="section-header">

          <div>
            <h2>My Recent Reports</h2>

            <p>
              Track the environmental issues you have reported.
            </p>
          </div>

          <Link className="text-btn" to="/citizen/my-issues">
            View All
            <ArrowRight size={16} />
          </Link>

        </div>

        {error ? <div className="empty-state" role="alert">{error}</div> : loading ? <div className="empty-state">Loading your reports...</div> : myIssues.length > 0 ? (
          <div className="issues-grid">

            {myIssues.slice(0, 4).map((issue) => (
              <Link className="issue-card" key={issue._id} to={`/citizen/issues/${issue._id}`}>
                <div className="issue-card-top"><span>{issue.category}</span><StatusBadge status={issue.status} /></div>
                <h3 className="issue-title">{issue.title}</h3>
                <p className="issue-description">{issue.description}</p>
                <span className="issue-id">{issue.location}</span>
              </Link>
            ))}

          </div>
        ) : (
          <div className="empty-state">
            <FileWarning size={40} />

            <h3>No reports yet</h3>

            <p>
              You haven't reported any environmental issues yet.
            </p>

            <Link className="primary-btn" to="/citizen/report-issue">
              <PlusCircle size={18} />
              Report Your First Issue
            </Link>
          </div>
        )}

      </section>

      {/* Quick Action */}
      <section className="citizen-help-card">

        <div>
          <span className="page-eyebrow">MAKE A DIFFERENCE</span>

          <h2>Spotted an environmental problem?</h2>

          <p>
            Report it to EcoWatch and help your community take action.
          </p>
        </div>

        <Link className="secondary-btn" to="/citizen/report-issue">
          Report Issue
          <ArrowRight size={17} />
        </Link>

      </section>

    </div>
  );
}

export default CitizenDashboard;