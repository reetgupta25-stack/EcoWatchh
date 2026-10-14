import React from "react";
import {
  FileWarning,
  Clock3,
  LoaderCircle,
  CheckCircle2,
  PlusCircle,
  ArrowRight,
} from "lucide-react";

import StatCard from "../../components/StatCard";
import IssueCard from "../../components/IssueCard";
import { dashboardStats, issues } from "../../data/mockData";

function CitizenDashboard() {
  const myIssues = issues.filter(
    (issue) => issue.reportedBy === "Shivani Sharma"
  );

  return (
    <div className="dashboard-page">

      {/* Header */}
      <div className="page-header">
        <div>
          <p className="page-eyebrow">CITIZEN PORTAL</p>

          <h1>Welcome back, Shivani 🌱</h1>

          <p>
            Help make your community cleaner, greener and better.
          </p>
        </div>

        <button className="primary-btn">
          <PlusCircle size={18} />
          Report an Issue
        </button>
      </div>

      {/* Stats */}
      <div className="stats-grid">

        <StatCard
          title="Total Issues"
          value={dashboardStats.totalIssues}
          icon={<FileWarning size={24} />}
          subtitle="Platform reports"
        />

        <StatCard
          title="Pending"
          value={dashboardStats.pendingIssues}
          icon={<Clock3 size={24} />}
          subtitle="Awaiting action"
        />

        <StatCard
          title="In Progress"
          value={dashboardStats.inProgressIssues}
          icon={<LoaderCircle size={24} />}
          subtitle="Being resolved"
        />

        <StatCard
          title="Completed"
          value={dashboardStats.completedIssues}
          icon={<CheckCircle2 size={24} />}
          subtitle="Successfully resolved"
        />

      </div>

      {/* My Recent Issues */}
      <section className="dashboard-section">

        <div className="section-header">

          <div>
            <h2>My Recent Reports</h2>

            <p>
              Track the environmental issues you have reported.
            </p>
          </div>

          <button className="text-btn">
            View All
            <ArrowRight size={16} />
          </button>

        </div>

        {myIssues.length > 0 ? (
          <div className="issues-grid">

            {myIssues.map((issue) => (
              <IssueCard
                key={issue.id}
                issue={issue}
              />
            ))}

          </div>
        ) : (
          <div className="empty-state">
            <FileWarning size={40} />

            <h3>No reports yet</h3>

            <p>
              You haven't reported any environmental issues yet.
            </p>

            <button className="primary-btn">
              <PlusCircle size={18} />
              Report Your First Issue
            </button>
          </div>
        )}

      </section>

      {/* Quick Action */}
      <section className="citizen-help-card">

        <div>
          <span className="page-eyebrow">MAKE A DIFFERENCE</span>

          <h2>Spotted an environmental problem?</h2>

          <p>
            Report it to EcoWatch and help your community take action.
          </p>
        </div>

        <button className="secondary-btn">
          Report Issue
          <ArrowRight size={17} />
        </button>

      </section>

    </div>
  );
}

export default CitizenDashboard;