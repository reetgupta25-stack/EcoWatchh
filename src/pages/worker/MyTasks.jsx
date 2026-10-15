import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  MapPin,
  CalendarDays,
} from "lucide-react";

import StatusBadge from "../../components/StatusBadge";
import { apiRequest } from "../../lib/api";

function MyTasks() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    apiRequest("/issues")
      .then((data) => setTasks(data.issues || []))
      .catch((requestError) => {
        if (requestError.status === 401) navigate("/login", { replace: true });
        else setError(requestError.message);
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const filteredTasks = tasks.filter((task) => {

    const matchesSearch =
      `${task.title} ${task._id} ${task.location}`.toLowerCase().includes(search.toLowerCase());

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

      {error && <p className="error-message" role="alert">{error}</p>}
      {loading ? <div className="empty-state">Loading assigned tasks...</div> : filteredTasks.length ? <div className="worker-tasks-grid">

        {filteredTasks.map((task) => (

          <div className="task-detail-card" key={task.id}>

            <div className="task-card-header">

              <span className="task-id">
                {task._id}
              </span>

              <StatusBadge status={task.status} />

            </div>

            <h3>{task.title}</h3>

            <p className="task-issue-id">
              {task.category}
            </p>

            <div className="task-card-info">

              <div>
                <MapPin size={16} />
                {task.location}
              </div>

              <div>
                <CalendarDays size={16} />
                Deadline: {task.deadline ? new Date(task.deadline).toLocaleDateString() : "Not set"}
              </div>

            </div>

            <div className="task-card-footer">

              <span
                className={`priority-${task.priority.toLowerCase()}`}
              >
                {task.priority} Priority
              </span>

              <Link className="primary-btn" to={`/worker/tasks/${task._id}`}>
                View Task
              </Link>

            </div>

          </div>

        ))}

      </div> : <div className="empty-state">No tasks match your filters.</div>}

    </div>
  );
}

export default MyTasks;