import React, { useState } from "react";
import {
  Search,
  UserPlus,
  Eye,
  MoreHorizontal,
} from "lucide-react";

import { users } from "../../data/mockData";

function ManageUsers() {
  const [search, setSearch] = useState("");

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

        <button className="primary-btn">
          <UserPlus size={18} />
          Add User
        </button>

      </div>

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

      {/* Users Table */}
      <div className="table-card">

        <div className="table-header">

          <div>
            <h2>Platform Users</h2>
            <span>
              {filteredUsers.length} users
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

                <tr key={user.id}>

                  <td>

                    <div className="user-table-info">

                      <div className="user-table-avatar">
                        {user.name.charAt(0)}
                      </div>

                      <div>
                        <strong>{user.name}</strong>
                        <small>{user.id}</small>
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
                    <span className="user-status">
                      <span></span>
                      {user.status}
                    </span>
                  </td>

                  <td>

                    <div className="table-actions">

                      <button className="icon-btn">
                        <Eye size={17} />
                      </button>

                      <button className="icon-btn">
                        <MoreHorizontal size={17} />
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

export default ManageUsers;