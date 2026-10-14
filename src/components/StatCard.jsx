import React from "react";

function StatCard({ title, value, icon, subtitle, trend }) {
  return (
    <div className="stat-card">

      {/* Icon */}
      <div className="stat-card-icon">
        {icon}
      </div>

      {/* Content */}
      <div className="stat-card-content">
        <p className="stat-card-title">
          {title}
        </p>

        <h2 className="stat-card-value">
          {value}
        </h2>

        {subtitle && (
          <p className="stat-card-subtitle">
            {trend && (
              <span className="stat-card-trend">
                {trend}
              </span>
            )}

            {subtitle}
          </p>
        )}
      </div>

    </div>
  );
}

export default StatCard;