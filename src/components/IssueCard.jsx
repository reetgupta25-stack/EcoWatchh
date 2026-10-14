import React from "react";
import {
  MapPin,
  CalendarDays,
  ArrowUpRight,
  Clock3,
} from "lucide-react";

function IssueCard({ issue }) {
  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "status-pending";

      case "in progress":
        return "status-progress";

      case "completed":
        return "status-completed";

      case "verified":
        return "status-verified";

      default:
        return "status-pending";
    }
  };

  return (
    <div className="issue-card">

      {/* Top Section */}
      <div className="issue-card-top">

        <div className="issue-category">
          <span className="category-icon">
            {issue.icon || "🌱"}
          </span>

          <span>{issue.category}</span>
        </div>

        <span className={`status-badge ${getStatusClass(issue.status)}`}>
          {issue.status}
        </span>

      </div>

      {/* Issue Title */}
      <h3 className="issue-title">
        {issue.title}
      </h3>

      {/* Description */}
      <p className="issue-description">
        {issue.description}
      </p>

      {/* Issue Information */}
      <div className="issue-info">

        <div className="issue-info-item">
          <MapPin size={16} />
          <span>{issue.location}</span>
        </div>

        <div className="issue-info-item">
          <CalendarDays size={16} />
          <span>{issue.date}</span>
        </div>

      </div>

      {/* Priority */}
      {issue.priority && (
        <div className="issue-priority">
          <Clock3 size={15} />
          <span>
            Priority: <strong>{issue.priority}</strong>
          </span>
        </div>
      )}

      {/* Bottom */}
      <div className="issue-card-bottom">

        <span className="issue-id">
          Issue #{issue.id}
        </span>

        <button className="view-issue-btn">
          View Details
          <ArrowUpRight size={16} />
        </button>

      </div>

    </div>
  );
}

export default IssueCard;