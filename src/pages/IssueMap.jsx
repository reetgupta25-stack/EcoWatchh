import { useState } from "react";
import { MapPin, Search } from "lucide-react";
import StatusBadge from "../components/StatusBadge";
import { issues } from "../data/mockData";

const pinPositions = [
  { left: "18%", top: "30%" },
  { left: "72%", top: "23%" },
  { left: "53%", top: "58%" },
  { left: "30%", top: "72%" },
  { left: "82%", top: "69%" },
  { left: "57%", top: "35%" },
  { left: "39%", top: "43%" },
  { left: "69%", top: "82%" },
];

function IssueMap() {
  const [search, setSearch] = useState("");
  const [selectedIssueId, setSelectedIssueId] = useState(issues[0]?.id || "");

  const filteredIssues = issues.filter((issue) =>
    `${issue.title} ${issue.id} ${issue.location} ${issue.status}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );
  const selectedIssue = filteredIssues.find(
    (issue) => issue.id === selectedIssueId
  );

  return (
    <div className="admin-page">
      <div className="page-header">
        <div>
          <p className="page-eyebrow">ISSUE LOCATIONS</p>
          <h1>Issue Map</h1>
          <p>Explore reported environmental issues by area and status.</p>
        </div>
      </div>

      <div className="filter-card">
        <div className="search-box">
          <Search size={18} />
          <input
            type="search"
            placeholder="Search issues or locations..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </div>

      <section className="issue-map-layout">
        <div className="issue-map-panel">
          <div className="issue-map-heading">
            <div>
              <h2>Baru Sahib area</h2>
              <p>Schematic view · issue positions are illustrative</p>
            </div>
            <span className="map-issue-count">
              {filteredIssues.length} {filteredIssues.length === 1 ? "issue" : "issues"}
            </span>
          </div>

          <div className="issue-map-canvas" aria-label="Schematic issue location map">
            <svg
              className="issue-map-roads"
              viewBox="0 0 800 520"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path d="M-20 135 C140 210 200 80 370 150 S620 250 830 100" />
              <path d="M-30 390 C130 310 230 430 390 340 S650 250 830 370" />
              <path d="M180 -20 C250 110 200 210 340 280 S490 420 510 550" />
              <path d="M610 -20 C540 100 650 200 570 300 S650 440 720 550" />
            </svg>
            <span className="map-area-label map-area-campus">Campus</span>
            <span className="map-area-label map-area-market">Market</span>
            <span className="map-area-label map-area-park">Community park</span>
            {filteredIssues.map((issue) => {
              const issueIndex = issues.findIndex(({ id }) => id === issue.id);
              const position = pinPositions[issueIndex % pinPositions.length];

              return (
                <button
                  type="button"
                  key={issue.id}
                  className={`issue-map-pin${selectedIssueId === issue.id ? " selected" : ""}`}
                  style={position}
                  onClick={() => setSelectedIssueId(issue.id)}
                  aria-label={`Select ${issue.title} at ${issue.location}`}
                  title={`${issue.title} · ${issue.location}`}
                >
                  <MapPin size={19} />
                </button>
              );
            })}
          </div>

          <p className="issue-map-note">
            Exact coordinates are not available for these reports. Use the
            location list to search an area in your maps app.
          </p>
        </div>

        <aside className="issue-map-list">
          <div className="issue-map-list-heading">
            <h2>Reported issues</h2>
            <span>{filteredIssues.length}</span>
          </div>
          {filteredIssues.length ? (
            <div className="issue-map-list-items">
              {filteredIssues.map((issue) => (
                <button
                  type="button"
                  className={`issue-map-list-item${selectedIssueId === issue.id ? " selected" : ""}`}
                  key={issue.id}
                  onClick={() => setSelectedIssueId(issue.id)}
                >
                  <span className="issue-map-list-icon">{issue.icon}</span>
                  <span className="issue-map-list-copy">
                    <strong>{issue.title}</strong>
                    <small>{issue.location}</small>
                    <StatusBadge status={issue.status} />
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <p className="issue-map-empty">No issues match your search.</p>
          )}
          {selectedIssue && (
            <a
              className="secondary-btn issue-map-directions"
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${selectedIssue.location}, Baru Sahib`)}`}
              target="_blank"
              rel="noreferrer"
            >
              Search selected area on Google Maps
            </a>
          )}
        </aside>
      </section>
    </div>
  );
}

export default IssueMap;
