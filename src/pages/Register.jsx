
import { useState } from "react";
import {
  Leaf,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";
import { apiRequest } from "../lib/api";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const data = await apiRequest("/auth/register", {
        method: "POST",
        body: {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        },
      });

      sessionStorage.setItem("ecowatchToken", data.token);
      sessionStorage.setItem(
        "ecowatchUser",
        JSON.stringify(data.user)
      );

      window.location.assign("/citizen/dashboard");
    } catch (error) {
      setMessage(
        error.status === 502 || error.message === "Failed to fetch"
          ? "Signup is unavailable because the API server cannot be reached. Check the backend terminal; if using Atlas, allowlist this machine's IP and restart the backend."
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

      <div className="auth-card register-card">
        <div className="auth-header">
          <div className="auth-icon">
            <Leaf size={24} />
          </div>
          <h1>Create your account</h1>
          <p>Join EcoWatch and help build a cleaner community.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <div className="input-with-icon">
              <User size={18} />
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

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
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                minLength={6}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <div className="input-with-icon">
              <Lock size={18} />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {message && (
            <p role="status" aria-live="polite">
              {message}
            </p>
          )}

          <button
            type="submit"
            className="primary-btn full-width-btn"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account?
          <a href="/login"> Sign in</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
