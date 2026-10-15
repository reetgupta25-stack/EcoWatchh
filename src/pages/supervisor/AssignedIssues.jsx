import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Search,
  Filter,
  Eye,
} from "lucide-react";

import StatusBadge from "../../components/StatusBadge";
import { apiRequest } from "../../lib/api";

function AssignedIssues() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [assignedIssues, setAssignedIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    apiRequest("/issues")
      .then((data) => setAssignedIssues(data.issues || []))
      .catch((requestError) => {
        if (requestError.status === 401) navigate("/login", { replace: true });
        else setError(requestError.message);
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const filteredIssues = assignedIssues.filter((issue) => {

    const matchesSearch =
      `${issue.title} ${issue._id} ${issue.location}`.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      status === "All" ||
      issue.status === status;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="supervisor-page">

      {/* Header */}
      <div className="page-header">

        <div>
          <p className="page-eyebrow">FIELD OPERATIONS</p>

          <h1>Assigned Issues</h1>

          <p>
            Monitor issues assigned to workers under your supervision.
          </p>
        </div>

      </div>

      {/* Filters */}
      <div className="filter-card">

        <div className="search-box">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search issues..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        <div className="filter-select">

          <Filter size={18} />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Reported">Reported</option>
            <option value="Under Review">Under Review</option>
            <option value="Assigned">Assigned</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Verified">Verified</option>
          </select>

        </div>

      </div>

      {error && <p className="error-message" role="alert">{error}</p>}

      {/* Issues Table */}
      <div className="table-card">

        <div className="table-header">

          <div>
            <h2>Assigned Issues</h2>

            <span>
              {loading ? "Loading issues..." : `${filteredIssues.length} issues`}
            </span>
          </div>

        </div>

        <div className="table-wrapper">

          <table className="data-table">

            <thead>
              <tr>
                <th>Issue</th>
                <th>Location</th>
                <th>Priority</th>
                <th>Assigned Worker</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredIssues.map((issue) => (

                <tr key={issue._id}>

                  <td>

                    <div className="issue-table-title">

                      <span>
                        🌱
                      </span>

                      <div>
                        <strong>{issue.title}</strong>
                        <small>{issue._id}</small>
                      </div>

                    </div>

                  </td>

                  <td>{issue.location}</td>

                  <td>
                    <span
                      className={`priority-${issue.priority.toLowerCase()}`}
                    >
                      {issue.priority}
                    </span>
                  </td>

                  <td>{issue.assignedTo?.name || "Not assigned"}</td>

                  <td>
                    <StatusBadge status={issue.status} />
                  </td>

                  <td>{new Date(issue.updatedAt).toLocaleDateString()}</td>

                  <td>

                    <Link className="icon-btn" to={`/supervisor/issues/${issue._id}`} aria-label={`View ${issue.title}`} title="View issue">
                      <Eye size={17} />
                    </Link>

                  </td>

                </tr>

              ))}
              {!loading && filteredIssues.length === 0 && (
                <tr><td colSpan="7" className="issue-map-empty">No supervised issues match your filters.</td></tr>
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default AssignedIssues;