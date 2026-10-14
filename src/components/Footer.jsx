import React from "react";
import {
  Leaf,
  Heart,
  Mail,
  MapPin,
} from "lucide-react";

function Footer() {
  return (
    <footer className="footer">

      {/* Footer Main */}
      <div className="footer-main">

        {/* Brand */}
        <div className="footer-brand">

          <div className="footer-logo">
            <div className="footer-logo-icon">
              <Leaf size={22} />
            </div>

            <span>EcoWatch</span>
          </div>

          <p>
            Making communities cleaner, greener,
            and more accountable through technology.
          </p>

        </div>

        {/* Platform */}
        <div className="footer-column">
          <h4>Platform</h4>

          <a href="/dashboard">Dashboard</a>
          <a href="/report-issue">Report Issue</a>
          <a href="/my-issues">My Issues</a>
          <a href="/analytics">Analytics</a>
        </div>

        {/* Support */}
        <div className="footer-column">
          <h4>Support</h4>

          <a href="/help">Help Center</a>
          <a href="/contact">Contact Us</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms & Conditions</a>
        </div>

        {/* Contact */}
        <div className="footer-column">

          <h4>Contact</h4>

          <div className="footer-contact">
            <Mail size={16} />
            <span>support@ecowatch.com</span>
          </div>

          <div className="footer-contact">
            <MapPin size={16} />
            <span>Himachal Pradesh, India</span>
          </div>

        </div>

      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">

        <p>
          © 2026 EcoWatch. All rights reserved.
        </p>

        <p className="footer-made">
          Made with <Heart size={15} /> for a greener future 🌱
        </p>

      </div>

    </footer>
  );
}

export default Footer;