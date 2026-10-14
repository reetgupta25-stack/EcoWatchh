import React from "react";

function StatusBadge({ status }) {
  const getStatusClass = () => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "status-pending";

      case "in progress":
        return "status-progress";

      case "completed":
        return "status-completed";

      case "verified":
        return "status-verified";

      case "rejected":
        return "status-rejected";

      default:
        return "status-default";
    }
  };

  return (
    <span className={`status-badge ${getStatusClass()}`}>
      <span className="status-dot"></span>
      {status}
    </span>
  );
}

export default StatusBadge;