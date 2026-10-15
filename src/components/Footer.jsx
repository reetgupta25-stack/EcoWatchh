import { Link } from "react-router-dom";
import {
  Leaf,
  Heart,
  Mail,
  MapPin,
} from "lucide-react";

function Footer() {
  let role = "citizen";
  try {
    role = JSON.parse(sessionStorage.getItem("ecowatchUser"))?.role || role;
  } catch {
    role = "citizen";
  }
  const rolePrefix = ["citizen", "admin", "supervisor", "worker"].includes(role) ? role : "citizen";

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

          <Link to={`/${rolePrefix}/dashboard`}>Dashboard</Link>
          <Link to={`/${rolePrefix}/map`}>Issue Map</Link>
          {rolePrefix === "citizen" && <Link to="/citizen/report-issue">Report Issue</Link>}
          {rolePrefix === "citizen" && <Link to="/citizen/my-issues">My Issues</Link>}
          {rolePrefix === "admin" && <Link to="/admin/analytics">Analytics</Link>}
        </div>

        {/* Support */}
        <div className="footer-column">
          <h4>Support</h4>

          <a href="mailto:support@ecowatch.com?subject=EcoWatch%20support">Contact Support</a>
          <a href="mailto:support@ecowatch.com?subject=EcoWatch%20privacy%20request">Privacy Requests</a>
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