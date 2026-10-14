import React, { useState } from "react";
import {
  Search,
  Filter,
  MapPin,
  CalendarDays,
} from "lucide-react";

import StatusBadge from "../../components/StatusBadge";
import { tasks } from "../../data/mockData";

function MyTasks() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const filteredTasks = tasks.filter((task) => {

    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.issueId.toLowerCase().includes(search.toLowerCase()) ||
      task.location.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      status === "All" ||
      task.status === status;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="worker-page">

      <div className="page-header">
        <div>
          <p className="page-eyebrow">TASK MANAGEMENT</p>
          <h1>My Tasks</h1>
          <p>
            View and manage all tasks assigned to you.
          </p>
        </div>
      </div>

      <div className="filter-card">

        <div className="search-box">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search tasks..."
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
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

      </div>

      <div className="worker-tasks-grid">

        {filteredTasks.map((task) => (

          <div className="task-detail-card" key={task.id}>

            <div className="task-card-header">

              <span className="task-id">
                {task.id}
              </span>

              <StatusBadge status={task.status} />

            </div>

            <h3>{task.title}</h3>

            <p className="task-issue-id">
              Issue: {task.issueId}
            </p>

            <div className="task-card-info">

              <div>
                <MapPin size={16} />
                {task.location}
              </div>

              <div>
                <CalendarDays size={16} />
                Deadline: {task.deadline}
              </div>

            </div>

            <div className="task-card-footer">

              <span
                className={`priority-${task.priority.toLowerCase()}`}
              >
                {task.priority} Priority
              </span>

              <button className="primary-btn">
                View Task
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default MyTasks;