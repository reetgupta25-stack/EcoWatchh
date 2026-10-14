import React, { useState } from "react";
import {
  Search,
  Filter,
  Eye,
} from "lucide-react";

import StatusBadge from "../../components/StatusBadge";
import { issues } from "../../data/mockData";

function AssignedIssues() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const assignedIssues = issues.filter(
    (issue) => issue.assignedTo !== "Not Assigned"
  );

  const filteredIssues = assignedIssues.filter((issue) => {

    const matchesSearch =
      issue.title.toLowerCase().includes(search.toLowerCase()) ||
      issue.id.toLowerCase().includes(search.toLowerCase()) ||
      issue.location.toLowerCase().includes(search.toLowerCase());

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
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Verified">Verified</option>
          </select>

        </div>

      </div>

      {/* Issues Table */}
      <div className="table-card">

        <div className="table-header">

          <div>
            <h2>Assigned Issues</h2>

            <span>
              {filteredIssues.length} issues
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

                <tr key={issue.id}>

                  <td>

                    <div className="issue-table-title">

                      <span>
                        {issue.icon}
                      </span>

                      <div>
                        <strong>{issue.title}</strong>
                        <small>{issue.id}</small>
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

                  <td>{issue.assignedTo}</td>

                  <td>
                    <StatusBadge status={issue.status} />
                  </td>

                  <td>{issue.date}</td>

                  <td>

                    <button className="icon-btn">
                      <Eye size={17} />
                    </button>

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

export default AssignedIssues;