import React from "react";
import {
  Leaf,
  ShieldCheck,
  BarChart3,
  Users,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

function Home() {
  return (
    <div className="home-page">

      {/* Navbar */}
      <header className="home-navbar">

        <div className="home-logo">
          <div className="home-logo-icon">
            <Leaf size={22} />
          </div>

          <span>EcoWatch</span>
        </div>

        <nav>
          <a href="#about">About</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#impact">Impact</a>
        </nav>

        <div className="home-actions">
          <a href="/login" className="login-link">
            Login
          </a>

          <a href="/register" className="primary-btn">
            Get Started
          </a>
        </div>

      </header>

      {/* Hero */}
      <section className="hero-section">

        <div className="hero-content">

          <span className="hero-badge">
            <Leaf size={15} />
            Smart Environmental Monitoring
          </span>

          <h1>
            Together, We Can Build a
            <span> Cleaner & Greener </span>
            Community.
          </h1>

          <p>
            EcoWatch helps citizens report environmental issues,
            while admins, supervisors and workers collaborate to
            resolve them efficiently.
          </p>

          <div className="hero-actions">

            <a href="/register" className="primary-btn">
              Report an Issue
              <ArrowRight size={18} />
            </a>

            <a href="#how-it-works" className="secondary-btn">
              Learn More
            </a>

          </div>

          <div className="hero-trust">

            <div>
              <CheckCircle2 size={17} />
              Easy Reporting
            </div>

            <div>
              <CheckCircle2 size={17} />
              Transparent Tracking
            </div>

            <div>
              <CheckCircle2 size={17} />
              Faster Resolution
            </div>

          </div>

        </div>

        <div className="hero-visual">

          <div className="hero-visual-card">

            <div className="visual-header">
              <span>Environmental Overview</span>
              <Leaf size={20} />
            </div>

            <div className="visual-stat">
              <strong>248</strong>
              <span>Total Issues</span>
            </div>

            <div className="visual-progress">
              <div
                className="visual-progress-fill"
                style={{ width: "78%" }}
              ></div>
            </div>

            <div className="visual-footer">
              <span>78% Resolution Rate</span>
              <span>↑ 12%</span>
            </div>

          </div>

        </div>

      </section>

      {/* Features */}
      <section className="features-section" id="about">

        <div className="section-heading">
          <span>WHY ECOWATCH</span>

          <h2>
            Technology for a cleaner community.
          </h2>

          <p>
            One platform connecting citizens and field teams
            to solve environmental problems.
          </p>
        </div>

        <div className="features-grid">

          <div className="feature-card">
            <div className="feature-icon">
              <ShieldCheck size={24} />
            </div>

            <h3>Transparent Tracking</h3>

            <p>
              Track every reported issue from submission
              to final resolution.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <BarChart3 size={24} />
            </div>

            <h3>Smart Analytics</h3>

            <p>
              Understand environmental trends and
              improve response planning.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Users size={24} />
            </div>

            <h3>Connected Teams</h3>

            <p>
              Citizens, admins, supervisors and workers
              collaborate through one platform.
            </p>
          </div>

        </div>

      </section>

      {/* How it works */}
      <section className="how-section" id="how-it-works">

        <div className="section-heading">
          <span>HOW IT WORKS</span>

          <h2>
            From report to resolution.
          </h2>
        </div>

        <div className="steps-grid">

          <div className="step-card">
            <span>01</span>
            <h3>Report</h3>
            <p>
              Citizens report an environmental issue
              with location and details.
            </p>
          </div>

          <div className="step-card">
            <span>02</span>
            <h3>Review & Assign</h3>
            <p>
              Admins review the issue and assign it
              to the appropriate team.
            </p>
          </div>

          <div className="step-card">
            <span>03</span>
            <h3>Resolve</h3>
            <p>
              Supervisors coordinate workers to
              resolve the reported issue.
            </p>
          </div>

          <div className="step-card">
            <span>04</span>
            <h3>Verify</h3>
            <p>
              Completed work is verified and the
              citizen can track the result.
            </p>
          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="home-cta" id="impact">

        <Leaf size={34} />

        <h2>
          Be a part of a cleaner tomorrow.
        </h2>

        <p>
          Report environmental issues and help your
          community take action.
        </p>

        <a href="/register" className="primary-btn">
          Join EcoWatch
          <ArrowRight size={18} />
        </a>

      </section>

    </div>
  );
}

export default Home;