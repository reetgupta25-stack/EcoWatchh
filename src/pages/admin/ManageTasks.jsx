import { useState } from "react";
import { Filter, Search } from "lucide-react";
import StatusBadge from "../../components/StatusBadge";
import { tasks } from "../../data/mockData";

function ManageTasks() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      `${task.title} ${task.id} ${task.issueId} ${task.worker} ${task.location}`
        .toLowerCase()
        .includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || task.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="admin-page">
      <div className="page-header">
        <div>
          <p className="page-eyebrow">TASK MANAGEMENT</p>
          <h1>Manage Tasks</h1>
          <p>Review task assignments, deadlines and completion status.</p>
        </div>
      </div>

      <div className="filter-card">
        <div className="search-box">
          <Search size={18} />
          <input
            type="search"
            placeholder="Search tasks, workers or locations..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        <div className="filter-select">
          <Filter size={18} />
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            aria-label="Filter tasks by status"
          >
            <option value="All">All Status</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="table-card">
        <div className="table-header">
          <h2>All Tasks</h2>
          <span>{filteredTasks.length} tasks found</span>
        </div>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Task</th>
                <th>Related Issue</th>
                <th>Worker</th>
                <th>Location</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Deadline</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task) => (
                <tr key={task.id}>
                  <td>
                    <div className="issue-table-title">
                      <div>
                        <strong>{task.title}</strong>
                        <small>{task.id}</small>
                      </div>
                    </div>
                  </td>
                  <td>{task.issueId}</td>
                  <td>{task.worker}</td>
                  <td>{task.location}</td>
                  <td>
                    <span className={`priority-${task.priority.toLowerCase()}`}>
                      {task.priority}
                    </span>
                  </td>
                  <td><StatusBadge status={task.status} /></td>
                  <td>{task.deadline}</td>
                </tr>
              ))}
              {!filteredTasks.length && (
                <tr>
                  <td colSpan="7" className="issue-map-empty">
                    No tasks match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ManageTasks;
