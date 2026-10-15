import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, UserCog, MapPin, ClipboardList, CheckCircle2 } from "lucide-react";

import { apiRequest } from "../../lib/api";

function ManageWorkers() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [workers, setWorkers] = useState([]);
  const [issues, setIssues] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([apiRequest("/users?role=worker"), apiRequest("/issues")])
      .then(([userData, issueData]) => {
        setWorkers(userData.users || []);
        setIssues(issueData.issues || []);
      })
      .catch((requestError) => {
        if (requestError.status === 401) navigate("/login", { replace: true });
        else setError(requestError.message);
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const filteredWorkers = workers.filter(
    (worker) =>
      `${worker.name} ${worker.email}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="supervisor-page">

      {/* Header */}
      <div className="page-header">

        <div>
          <p className="page-eyebrow">TEAM MANAGEMENT</p>

          <h1>Manage Workers</h1>

          <p>
            Monitor worker availability, assignments and performance.
          </p>
        </div>

      </div>

      {/* Search */}
      <div className="filter-card">

        <div className="search-box">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search workers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

      </div>

      {error && <p className="error-message" role="alert">{error}</p>}
      {loading ? <div className="empty-state">Loading workers...</div> : !filteredWorkers.length ? <div className="empty-state">No workers match your search.</div> : null}

      {/* Workers */}
      <div className="workers-grid">

        {filteredWorkers.map((worker) => {
          const assignedIssues = issues.filter((issue) => issue.assignedTo?._id === worker._id);
          const completedIssues = assignedIssues.filter((issue) => ["Completed", "Verified"].includes(issue.status)).length;
          return (

          <div
            className="worker-card"
            key={worker.id}
          >

            {/* Top */}
            <div className="worker-card-top">

              <div className="worker-avatar">
                {worker.name.charAt(0)}
              </div>

              <span
                className={`worker-status ${
                  worker.status === "Available"
                    ? "available"
                    : "busy"
                }`}
              >
                <span></span>
                {worker.isActive ? "Active" : "Inactive"}
              </span>

            </div>

            {/* Name */}
            <div className="worker-info">

              <h3>{worker.name}</h3>

              <p>
                <UserCog size={15} />
                Field Worker
              </p>

            </div>

            {/* Details */}
            <div className="worker-details">

              <div>
                <MapPin size={16} />
                <span>{worker.email}</span>
              </div>

              <div>
                <ClipboardList size={16} />
                <span>{assignedIssues.length} assigned reports</span>
              </div>

            </div>

            {/* Performance */}
            <div className="worker-performance">

              <div>

                <ClipboardList size={18} />

                <div>
                    <strong>{assignedIssues.length}</strong>
                  <span>Assigned</span>
                </div>

              </div>

              <div>

                <CheckCircle2 size={18} />

                <div>
                    <strong>{completedIssues}</strong>
                  <span>Completed</span>
                </div>

              </div>

            </div>

            {/* Action */}
            <Link className="secondary-btn worker-action" to="/supervisor/issues">
              View Tasks
            </Link>

          </div>
          );
        })}

      </div>

    </div>
  );
}

export default ManageWorkers;