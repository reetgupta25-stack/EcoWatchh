
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  CalendarDays,
  User,
  Clock3,
  CheckCircle2,
} from "lucide-react";

import StatusBadge from "../../components/StatusBadge";

const API_URL = "http://localhost:5000/api/issues";

function IssueDetails() {
  const { issueId } = useParams();
  const navigate = useNavigate();

  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchIssue() {
      setLoading(true);
      setError("");

      const token = sessionStorage.getItem("ecowatchToken");

      if (!token) {
        navigate("/login", { replace: true });
        return;
      }

      try {
        const response = await fetch(
          `${API_URL}/${encodeURIComponent(issueId)}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            signal: controller.signal,
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Unable to load issue details."
          );
        }

        setIssue(data.issue);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(
            err.message || "Unable to connect to the server."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchIssue();

    return () => controller.abort();
  }, [issueId, navigate]);

  if (loading) {
    return (
      <div className="empty-state">
        <h2>Loading Issue...</h2>
        <p>Please wait while we fetch your issue details.</p>
      </div>
    );
  }

  if (error || !issue) {
    return (
      <div className="empty-state">
        <h2>Issue Not Found</h2>
        <p>{error || "The requested issue could not be found."}</p>

        <button
          className="back-btn"
          onClick={() => navigate("/citizen/my-issues")}
        >
          <ArrowLeft size={18} />
          Back to My Issues
        </button>
      </div>
    );
  }

  const reportedBy =
    typeof issue.reportedBy === "object"
      ? issue.reportedBy?.name || issue.reportedBy?.email || "You"
      : "You";

  const assignedTo =
    typeof issue.assignedTo === "object"
      ? issue.assignedTo?.name || issue.assignedTo?.email || "Not Assigned"
      : "Not Assigned";

  const status = issue.status || "Reported";

  const timeline = [
    {
      title: "Issue Submitted",
      description: "Your environmental issue was reported.",
      completed: true,
    },
    {
      title: "Under Review",
      description: "The report is reviewed by the responsible team.",
      completed: [
        "Under Review",
        "Assigned",
        "In Progress",
        "Completed",
        "Verified",
      ].includes(status),
    },
    {
      title: "Work Started",
      description: "The assigned team starts working on the issue.",
      completed: ["In Progress", "Completed", "Verified"].includes(status),
    },
    {
      title: "Completed",
      description: "The assigned team has completed the work.",
      completed: ["Completed", "Verified"].includes(status),
    },
    {
      title: "Verified",
      description: "The resolution has been verified.",
      completed: status === "Verified",
    },
  ];

  const reportedDate = issue.createdAt
    ? new Date(issue.createdAt).toLocaleDateString()
    : "Not available";

  return (
    <div className="issue-details-page">
      {/* Back */}
      <button
        className="back-btn"
        onClick={() => navigate("/citizen/my-issues")}
      >
        <ArrowLeft size={18} />
        Back to My Issues
      </button>

      {/* Header */}
      <div className="page-header">
        <div>
          <p className="page-eyebrow">
            ISSUE #{issue._id}
          </p>

          <h1>{issue.title}</h1>
          <p>{issue.category}</p>
        </div>

        <StatusBadge status={status} />
      </div>

      {/* Main Content */}
      <div className="issue-details-grid">
        <div>
          {/* Description */}
          <div className="details-card">
            <div className="details-card-header">
              <h2>Issue Description</h2>

              <span className="large-issue-icon">
                <MapPin size={24} />
              </span>
            </div>

            <p className="details-description">
              {issue.description}
            </p>

            <div className="issue-meta-grid">
              <div className="meta-item">
                <MapPin size={18} />
                <div>
                  <span>Location</span>
                  <strong>{issue.location}</strong>
                </div>
              </div>

              <div className="meta-item">
                <CalendarDays size={18} />
                <div>
                  <span>Reported On</span>
                  <strong>{reportedDate}</strong>
                </div>
              </div>

              <div className="meta-item">
                <User size={18} />
                <div>
                  <span>Reported By</span>
                  <strong>{reportedBy}</strong>
                </div>
              </div>

              <div className="meta-item">
                <Clock3 size={18} />
                <div>
                  <span>Priority</span>
                  <strong>{issue.priority || "Not set"}</strong>
                </div>
              </div>
            </div>

            {issue.imageUrl && (
              <div className="issue-photo">
                <h3>Reported Photo</h3>
                <img
                  src={issue.imageUrl}
                  alt="Reported environmental issue"
                  style={{
                    width: "100%",
                    maxWidth: "500px",
                    borderRadius: "12px",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}
          </div>

          {/* Timeline */}
          <div className="details-card">
            <h2>Issue Progress</h2>

            <div className="issue-timeline">
              {timeline.map((step) => (
                <div
                  key={step.title}
                  className={`timeline-item ${
                    step.completed ? "completed" : ""
                  }`}
                >
                  <div className="timeline-icon">
                    <CheckCircle2 size={18} />
                  </div>

                  <div>
                    <strong>{step.title}</strong>
                    <span>{step.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <aside className="details-sidebar">
          <div className="details-card">
            <h2>Assignment</h2>

            <div className="assignment-info">
              <div className="assignment-avatar">
                {assignedTo !== "Not Assigned"
                  ? assignedTo.charAt(0).toUpperCase()
                  : "?"}
              </div>

              <div>
                <span>Assigned To</span>
                <strong>{assignedTo}</strong>
              </div>
            </div>

            {issue.deadline && (
              <p>
                <strong>Deadline: </strong>
                {new Date(issue.deadline).toLocaleDateString()}
              </p>
            )}
          </div>

          <div className="details-card">
            <h2>Issue Status</h2>

            <StatusBadge status={status} />

            <p className="status-help">
              You can track the progress of your report from this page.
            </p>

            {issue.resolutionNotes && (
              <div className="resolution-notes">
                <h3>Resolution Notes</h3>
                <p>{issue.resolutionNotes}</p>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

export default IssueDetails;
