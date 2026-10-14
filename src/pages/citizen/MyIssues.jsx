
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  Eye,
  MapPin,
  CalendarDays,
  ClipboardList,
  RefreshCw,
} from "lucide-react";

import StatusBadge from "../../components/StatusBadge";

function MyIssues() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const [myIssues, setMyIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(0);

  // Fetch reports from the backend
  useEffect(() => {
    const fetchIssues = async () => {
      const token = sessionStorage.getItem("ecowatchToken");

      if (!token) {
        navigate("/login");
        return;
      }

      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          "http://localhost:5000/api/issues",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json().catch(() => ({}));

        if (response.status === 401) {
          sessionStorage.removeItem("ecowatchToken");
          sessionStorage.removeItem("ecowatchUser");
          navigate("/login");
          return;
        }

        if (!response.ok) {
          throw new Error(
            data.message || "Could not load your reports."
          );
        }

        if (!Array.isArray(data.issues)) {
          throw new Error("Unexpected response from the server.");
        }

        setMyIssues(data.issues);
      } catch (err) {
        console.error("Fetch issues error:", err);
        setError(
          err.message ||
            "Unable to connect to the backend. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, [navigate, refresh]);

  // Categories available in the fetched reports
  const categories = [
    "All",
    ...new Set(
      myIssues.map((issue) => issue.category).filter(Boolean)
    ),
  ];

  // Filter reports
  const filteredIssues = myIssues.filter((issue) => {
    const query = search.toLowerCase();

    const matchesSearch = [
      issue.title,
      issue._id,
      issue.category,
      issue.location,
      issue.description,
    ].some((value) =>
      String(value || "").toLowerCase().includes(query)
    );

    const matchesStatus =
      statusFilter === "All" || issue.status === statusFilter;

    const matchesCategory =
      categoryFilter === "All" ||
      issue.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Format MongoDB date
  const formatDate = (date) => {
    if (!date) return "Date not available";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Date not available";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Open the selected report using its MongoDB ID
  const openDetails = (issue) => {
    navigate(`/citizen/issues/${issue._id}`);
  };

  const pendingCount = myIssues.filter((issue) =>
    ["Reported", "Under Review", "Pending", "Reviewed"].includes(
      issue.status
    )
  ).length;

  const inProgressCount = myIssues.filter(
    (issue) => issue.status === "In Progress"
  ).length;

  const resolvedCount = myIssues.filter((issue) =>
    ["Completed", "Verified"].includes(issue.status)
  ).length;

  return (
    <div className="admin-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <p className="page-eyebrow">CITIZEN PORTAL</p>
          <h1>My Issues</h1>
          <p>Track the environmental issues you have reported.</p>
        </div>

        <button
          type="button"
          className="icon-btn"
          title="Refresh reports"
          onClick={() => setRefresh((value) => value + 1)}
          disabled={loading}
        >
          <RefreshCw size={18} />
        </button>
      </div>

      {/* Statistics */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-icon">
            <ClipboardList size={22} />
          </div>
          <div>
            <p>Total Reports</p>
            <h2>{myIssues.length}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-icon">
            <CalendarDays size={22} />
          </div>
          <div>
            <p>Pending / Under Review</p>
            <h2>{pendingCount}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-icon">
            <MapPin size={22} />
          </div>
          <div>
            <p>In Progress</p>
            <h2>{inProgressCount}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-icon">
            <ClipboardList size={22} />
          </div>
          <div>
            <p>Resolved</p>
            <h2>{resolvedCount}</h2>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="filter-card">
        <div className="search-box">
          <Search size={18} />
          <input
            type="search"
            placeholder="Search by title, ID, category or location..."
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
            <option value="All">All Statuses</option>
            <option value="Reported">Reported</option>
            <option value="Under Review">Under Review</option>
            <option value="Assigned">Assigned</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Verified">Verified</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div className="filter-select">
          <select
            aria-label="Filter by category"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === "All" ? "All Categories" : category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Reports Table */}
      <div className="table-card">
        <div className="table-header">
          <h2>Your Reports</h2>
          <span>
            {loading ? "Loading..." : `${filteredIssues.length} reports found`}
          </span>
        </div>

        {loading ? (
          <div className="empty-state">
            <RefreshCw size={32} />
            <h2>Loading your reports...</h2>
            <p>Please wait while we fetch your reports.</p>
          </div>
        ) : error ? (
          <div className="empty-state">
            <ClipboardList size={42} />
            <h2>Could not load reports</h2>
            <p>{error}</p>
            <button
              type="button"
              className="primary-btn"
              onClick={() => setRefresh((value) => value + 1)}
            >
              Try Again
            </button>
          </div>
        ) : filteredIssues.length === 0 ? (
          <div className="empty-state">
            <ClipboardList size={42} />
            <h2>
              {myIssues.length === 0
                ? "No reports yet"
                : "No matching reports"}
            </h2>
            <p>
              {myIssues.length === 0
                ? "Your submitted environmental reports will appear here once saved successfully."
                : "Try changing your search or filters."}
            </p>

            {myIssues.length === 0 ? (
              <button
                type="button"
                className="primary-btn"
                onClick={() => navigate("/citizen/report-issue")}
              >
                Report an Issue
              </button>
            ) : (
              <button
                type="button"
                className="primary-btn"
                onClick={() => {
                  setSearch("");
                  setStatusFilter("All");
                  setCategoryFilter("All");
                }}
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Issue</th>
                  <th>Category</th>
                  <th>Location</th>
                  <th>Reported On</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredIssues.map((issue) => (
                  <tr key={issue._id}>
                    <td>
                      <div className="issue-table-title">
                        <span>🌿</span>
                        <div>
                          <strong>
                            {issue.title || "Environmental Report"}
                          </strong>
                          <small>{issue._id}</small>
                        </div>
                      </div>
                    </td>

                    <td>{issue.category || "Other"}</td>

                    <td>
                      {issue.location || "Location not provided"}
                    </td>

                    <td>{formatDate(issue.createdAt)}</td>

                    <td>
                      <StatusBadge status={issue.status || "Reported"} />
                    </td>

                    <td>
                      <button
                        type="button"
                        className="icon-btn"
                        title="View Issue"
                        aria-label={`View ${issue.title || "issue"}`}
                        onClick={() => openDetails(issue)}
                      >
                        <Eye size={17} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyIssues;
