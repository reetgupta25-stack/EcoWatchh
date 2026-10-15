
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Send,
  AlertCircle,
  Leaf,
} from "lucide-react";
import { apiRequest } from "../../lib/api";

const categories = [
  "Waste",
  "Water Pollution",
  "Air Pollution",
  "Deforestation",
  "Water Wastage",
  "Other",
];

const ReportIssue = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    location: "",
    priority: "Medium",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const token = sessionStorage.getItem("ecowatchToken");

    if (!token) {
      setError("Please log in first.");
      navigate("/login");
      return;
    }

    if (
      !formData.title.trim() ||
      !formData.category ||
      !formData.description.trim() ||
      !formData.location.trim()
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);

      await apiRequest("/issues", {
        method: "POST",
        body: {
          title: formData.title.trim(),
          category: formData.category,
          description: formData.description.trim(),
          location: formData.location.trim(),
          priority: formData.priority,
        },
      });

      setFormData({
        title: "",
        category: "",
        description: "",
        location: "",
        priority: "Medium",
      });

      navigate("/citizen/my-issues");
    } catch (err) {
      console.error("Submit issue error:", err);
      if (err.status === 401) {
        navigate("/login", { replace: true });
        return;
      }
      setError(
        err.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <div>
          <button
            type="button"
            className="back-btn"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <h1>Report an Environmental Issue</h1>
          <p>
            Help make your community cleaner, safer and greener.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-card">
          <h2>
            <Leaf size={20} />
            Issue Details
          </h2>

          {error && (
            <div
              className="error-message"
              role="alert"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "16px",
              }}
            >
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="title">Issue Title *</label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Garbage dumped near the road"
              maxLength={100}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>

              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the environmental issue..."
              rows={5}
              maxLength={2000}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">
              <MapPin size={16} />
              Location *
            </label>
            <input
              id="location"
              name="location"
              type="text"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter the location"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate("/citizen/dashboard")}
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
            >
              <Send size={16} />
              {loading ? "Submitting..." : "Submit Issue"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReportIssue;
