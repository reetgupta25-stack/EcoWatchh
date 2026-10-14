import React, { useState } from "react";
import {
  Search,
  UserCog,
  Phone,
  MapPin,
  ClipboardList,
  CheckCircle2,
} from "lucide-react";

import { workers } from "../../data/mockData";

function ManageWorkers() {
  const [search, setSearch] = useState("");

  const filteredWorkers = workers.filter(
    (worker) =>
      worker.name.toLowerCase().includes(search.toLowerCase()) ||
      worker.area.toLowerCase().includes(search.toLowerCase())
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

      {/* Workers */}
      <div className="workers-grid">

        {filteredWorkers.map((worker) => (

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
                {worker.status}
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
                <span>{worker.area}</span>
              </div>

              <div>
                <Phone size={16} />
                <span>{worker.phone}</span>
              </div>

            </div>

            {/* Performance */}
            <div className="worker-performance">

              <div>

                <ClipboardList size={18} />

                <div>
                  <strong>{worker.assignedTasks}</strong>
                  <span>Assigned</span>
                </div>

              </div>

              <div>

                <CheckCircle2 size={18} />

                <div>
                  <strong>{worker.completedTasks}</strong>
                  <span>Completed</span>
                </div>

              </div>

            </div>

            {/* Action */}
            <button className="secondary-btn worker-action">
              View Tasks
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default ManageWorkers;