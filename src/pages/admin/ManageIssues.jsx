import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Filter, Eye, Trash2 } from "lucide-react";

import { apiRequest } from "../../lib/api";

function ManageIssues() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [issues, setIssues] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [supervisors, setSupervisors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      apiRequest("/issues"),
      apiRequest("/users?role=worker"),
      apiRequest("/users?role=supervisor"),
    ])
      .then(([issueData, workerData, supervisorData]) => {
        setIssues(issueData.issues || []);
        setWorkers(workerData.users || []);
        setSupervisors(supervisorData.users || []);
      })
      .catch((requestError) => {
        if (requestError.status === 401) navigate("/login", { replace: true });
        else setError(requestError.message);
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const updateIssue = async (issueId, changes) => {
    setError("");
    try {
      const result = await apiRequest(`/issues/${issueId}`, {
        method: "PATCH",
        body: changes,
      });
      setIssues((current) => current.map((issue) =>
        issue._id === issueId ? result.issue : issue
      ));
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  const removeIssue = async (issue) => {
    if (!window.confirm(`Delete "${issue.title}"? This cannot be undone.`)) return;
    setError("");
    try {
      await apiRequest(`/issues/${issue._id}`, { method: "DELETE" });
      setIssues((current) => current.filter((item) => item._id !== issue._id));
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  const filteredIssues = issues.filter((issue) => {
    const matchesSearch = `${issue.title} ${issue._id} ${issue.category} ${issue.assignedTo?.name || ""}`
      .toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      issue.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="admin-page">

      {/* Header */}
      <div className="page-header">
        <div>
          <p className="page-eyebrow">ISSUE MANAGEMENT</p>
          <h1>Manage Issues</h1>
          <p>
            Review, assign and monitor environmental complaints.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="filter-card">

        <div className="search-box">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search by issue, ID or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filter-select">
          <Filter size={18} />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
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

      {/* Table */}
      <div className="table-card">

        <div className="table-header">
          <h2>All Issues</h2>
          <span>{loading ? "Loading issues..." : `${filteredIssues.length} issues found`}</span>
        </div>

        {error && <p className="error-message" role="alert">{error}</p>}

        <div className="table-wrapper">

          <table className="data-table">

            <thead>
              <tr>
                <th>Issue</th>
                <th>Category</th>
                <th>Location</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Assigned To</th>
                <th>Supervisor</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredIssues.map((issue) => (
                <tr key={issue._id}>

                  <td>
                    <div className="issue-table-title">
                      <span>🌱</span>

                      <div>
                        <strong>{issue.title}</strong>
                        <small>{issue._id}</small>
                      </div>
                    </div>
                  </td>

                  <td>{issue.category}</td>

                  <td>{issue.location}</td>

                  <td>
                    <select
                      aria-label={`Set priority for ${issue.title}`}
                      value={issue.priority}
                      onChange={(event) => updateIssue(issue._id, { priority: event.target.value })}
                    >
                      {["Low", "Medium", "High", "Critical"].map((priority) => (
                        <option key={priority} value={priority}>{priority}</option>
                      ))}
                    </select>
                  </td>

                  <td>
                    <select
                      aria-label={`Update status for ${issue.title}`}
                      value={issue.status}
                      onChange={(event) => updateIssue(issue._id, { status: event.target.value })}
                    >
                      {["Reported", "Under Review", "Assigned", "In Progress", "Completed", "Verified", "Rejected"].map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </td>

                  <td>
                    <select
                      aria-label={`Assign ${issue.title}`}
                      value={issue.assignedTo?._id || ""}
                      onChange={(event) => updateIssue(issue._id, { assignedTo: event.target.value || null })}
                    >
                      <option value="">Unassigned</option>
                      {workers.map((worker) => (
                        <option key={worker._id} value={worker._id}>{worker.name}</option>
                      ))}
                    </select>
                  </td>

                  <td>
                    <select
                      aria-label={`Assign supervisor for ${issue.title}`}
                      value={issue.supervisor?._id || ""}
                      onChange={(event) => updateIssue(issue._id, { supervisor: event.target.value || null })}
                    >
                      <option value="">Unassigned</option>
                      {supervisors.map((supervisor) => (
                        <option key={supervisor._id} value={supervisor._id}>{supervisor.name}</option>
                      ))}
                    </select>
                  </td>

                  <td>
                    <Link
                      className="icon-btn"
                      title={`View ${issue.title}`}
                      aria-label={`View ${issue.title}`}
                      to={`/admin/issues/${issue._id}`}
                    >
                      <Eye size={17} />
                    </Link>
                    <button
                      type="button"
                      className="icon-btn"
                      title={`Delete ${issue.title}`}
                      aria-label={`Delete ${issue.title}`}
                      onClick={() => removeIssue(issue)}
                    >
                      <Trash2 size={17} />
                    </button>
                  </td>

                </tr>
              ))}
              {!loading && filteredIssues.length === 0 && (
                <tr><td colSpan="8" className="issue-map-empty">No issues match your filters.</td></tr>
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default ManageIssues;