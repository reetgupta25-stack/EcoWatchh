import React, { useState } from "react";
import {
  Search,
  Filter,
  Eye,
  UserPlus,
} from "lucide-react";

import StatusBadge from "../../components/StatusBadge";
import { issues } from "../../data/mockData";

function ManageIssues() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredIssues = issues.filter((issue) => {
    const matchesSearch =
      issue.title.toLowerCase().includes(search.toLowerCase()) ||
      issue.id.toLowerCase().includes(search.toLowerCase()) ||
      issue.category.toLowerCase().includes(search.toLowerCase());

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
            <option value="Pending">Pending</option>
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
          <span>{filteredIssues.length} issues found</span>
        </div>

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
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredIssues.map((issue) => (
                <tr key={issue.id}>

                  <td>
                    <div className="issue-table-title">
                      <span>{issue.icon}</span>

                      <div>
                        <strong>{issue.title}</strong>
                        <small>{issue.id}</small>
                      </div>
                    </div>
                  </td>

                  <td>{issue.category}</td>

                  <td>{issue.location}</td>

                  <td>
                    <span className={`priority-${issue.priority.toLowerCase()}`}>
                      {issue.priority}
                    </span>
                  </td>

                  <td>
                    <StatusBadge status={issue.status} />
                  </td>

                  <td>
                    {issue.assignedTo}
                  </td>

                  <td>
                    <div className="table-actions">

                      <button
                        className="icon-btn"
                        title="View Issue"
                      >
                        <Eye size={17} />
                      </button>

                      <button
                        className="icon-btn"
                        title="Assign Issue"
                      >
                        <UserPlus size={17} />
                      </button>

                    </div>
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default ManageIssues;