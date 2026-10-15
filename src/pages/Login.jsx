
import { useState } from "react";
import {
  Leaf,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";
import { apiRequest } from "../lib/api";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "citizen",
  });

  const handleChange = (e) => {
    setFormData((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    setLoading(true);

    try {
      const data = await apiRequest("/auth/login", {
        method: "POST",
        body: { email: formData.email, password: formData.password },
      });

      // Check the actual role returned by the backend.
      const selectedRole = formData.role.toLowerCase();

      if (data.user.role !== selectedRole) {
        setMessage(
          `This account belongs to the ${data.user.role} role. Please select the correct role.`
        );
        return;
      }

      // Save login details for this browser session.
      sessionStorage.setItem("ecowatchToken", data.token);
      sessionStorage.setItem(
        "ecowatchUser",
        JSON.stringify(data.user)
      );

      // Redirect according to the verified backend role.
      const dashboardRoutes = {
        citizen: "/citizen",
        worker: "/worker",
        supervisor: "/supervisor",
        admin: "/admin",
      };

      window.location.assign(
        dashboardRoutes[data.user.role] || "/"
      );
    } catch (error) {
      setMessage(
        error.message === "Failed to fetch"
          ? "Cannot reach the backend. Check that the server is running and MongoDB is connected."
          : error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-brand">
        <div className="home-logo">
          <div className="home-logo-icon">
            <Leaf size={22} />
          </div>
          <span>EcoWatch</span>
        </div>
      </div>

      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon">
            <Leaf size={24} />
          </div>

          <h1>Welcome back</h1>

          <p>
            Sign in to continue to your EcoWatch account.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>

            <div className="input-with-icon">
              <Mail size={18} />

              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>

            <div className="password-input">
              <Lock size={18} />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((previous) => !previous)
                }
                aria-label={
                  showPassword ? "Hide password" : "Show password"
                }
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>Login As</label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="citizen">Citizen</option>
              <option value="worker">Worker</option>
              <option value="supervisor">Supervisor</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {message && (
            <p role="alert" aria-live="polite">
              {message}
            </p>
          )}

          <button
            type="submit"
            className="primary-btn full-width-btn"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account?
          <a href="/register"> Create one</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
