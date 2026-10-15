import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search } from "lucide-react";

import { apiRequest } from "../../lib/api";

function ManageUsers() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "", role: "worker" });

  useEffect(() => {
    apiRequest("/users")
      .then((data) => setUsers(data.users || []))
      .catch((requestError) => {
        if (requestError.status === 401) navigate("/login", { replace: true });
        else setError(requestError.message);
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const toggleUserStatus = async (user) => {
    setError("");
    try {
      const result = await apiRequest(`/users/${user._id}/status`, {
        method: "PATCH",
        body: { isActive: !user.isActive },
      });
      setUsers((current) => current.map((item) => item._id === user._id ? result.user : item));
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  const createUser = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      const result = await apiRequest("/users", { method: "POST", body: newUser });
      setUsers((current) => [result.user, ...current]);
      setNewUser({ name: "", email: "", password: "", role: "worker" });
      setShowCreateForm(false);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-page">

      {/* Header */}
      <div className="page-header">

        <div>
          <p className="page-eyebrow">USER MANAGEMENT</p>

          <h1>Manage Users</h1>

          <p>
            Manage citizens, supervisors, workers and administrators.
          </p>
        </div>

        <button type="button" className="primary-btn" onClick={() => setShowCreateForm((visible) => !visible)}>
          <Plus size={18} />
          {showCreateForm ? "Cancel" : "Add User"}
        </button>

      </div>

      {showCreateForm && (
        <form className="form-card" onSubmit={createUser}>
          <h2>Create platform account</h2>
          <div className="form-group">
            <label htmlFor="new-user-name">Full name</label>
            <input id="new-user-name" value={newUser.name} onChange={(event) => setNewUser((current) => ({ ...current, name: event.target.value }))} required />
          </div>
          <div className="form-group">
            <label htmlFor="new-user-email">Email</label>
            <input id="new-user-email" type="email" value={newUser.email} onChange={(event) => setNewUser((current) => ({ ...current, email: event.target.value }))} required />
          </div>
          <div className="form-group">
            <label htmlFor="new-user-password">Temporary password</label>
            <input id="new-user-password" type="password" minLength={8} value={newUser.password} onChange={(event) => setNewUser((current) => ({ ...current, password: event.target.value }))} required />
          </div>
          <div className="form-group">
            <label htmlFor="new-user-role">Role</label>
            <select id="new-user-role" value={newUser.role} onChange={(event) => setNewUser((current) => ({ ...current, role: event.target.value }))}>
              <option value="citizen">Citizen</option>
              <option value="worker">Worker</option>
              <option value="supervisor">Supervisor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button className="primary-btn" type="submit" disabled={saving}>{saving ? "Creating..." : "Create account"}</button>
        </form>
      )}

      {/* Search */}
      <div className="filter-card">

        <div className="search-box">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

      </div>

      {error && <p className="error-message" role="alert">{error}</p>}

      {/* Users Table */}
      <div className="table-card">

        <div className="table-header">

          <div>
            <h2>Platform Users</h2>
            <span>
              {loading ? "Loading users..." : `${filteredUsers.length} users`}
            </span>
          </div>

        </div>

        <div className="table-wrapper">

          <table className="data-table">

            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredUsers.map((user) => (

                <tr key={user._id}>

                  <td>

                    <div className="user-table-info">

                      <div className="user-table-avatar">
                        {user.name.charAt(0)}
                      </div>

                      <div>
                        <strong>{user.name}</strong>
                        <small>{user._id}</small>
                      </div>

                    </div>

                  </td>

                  <td>{user.email}</td>

                  <td>
                    <span className="role-badge">
                      {user.role}
                    </span>
                  </td>

                  <td>
                    <span className={`user-status ${user.isActive ? "available" : "busy"}`}>
                      <span></span>
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td>

                    <div className="table-actions">

                      <button className="secondary-btn" onClick={() => toggleUserStatus(user)} disabled={user._id === JSON.parse(sessionStorage.getItem("ecowatchUser") || "{}").id}>
                        {user.isActive ? "Deactivate" : "Activate"}
                      </button>

                    </div>

                  </td>

                </tr>

              ))}
              {!loading && filteredUsers.length === 0 && (
                <tr><td colSpan="5" className="issue-map-empty">No users match your search.</td></tr>
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default ManageUsers;