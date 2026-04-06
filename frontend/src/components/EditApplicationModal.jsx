import { useEffect, useState } from "react";

function EditApplicationModal({ isOpen, application, onClose, onSubmit }) {
  const [form, setForm] = useState({
    company: "",
    jobTitle: "",
    status: "applied",
    location: "",
    source: "",
    jobUrl: "",
    details: "",
    appliedAt: "",
  });

  useEffect(() => {
    if (application) {
      setForm({
        company: application.company || "",
        jobTitle: application.jobTitle || "",
        status: application.status || "applied",
        location: application.location || "",
        source: application.source || "",
        jobUrl: application.jobUrl || "",
        details: application.details || "",
        appliedAt: application.appliedAt
          ? new Date(application.appliedAt).toISOString().split("T")[0]
          : "",
      });
    }
  }, [application]);

  if (!isOpen || !application) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(application.id, form);
  };

  return (
    <div className="modal-overlay">
      <div className="modal large-modal">
        <div className="modal-header">
          <h3>Edit application</h3>
          <button type="button" className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <input
            type="text"
            name="company"
            placeholder="Company"
            value={form.company}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="jobTitle"
            placeholder="Job title"
            value={form.jobTitle}
            onChange={handleChange}
            required
          />

          <select name="status" value={form.status} onChange={handleChange}>
            <option value="applied">applied</option>
            <option value="interview">interview</option>
            <option value="rejected">rejected</option>
            <option value="offer">offer</option>
          </select>

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
          />

          <input
            type="text"
            name="source"
            placeholder="Source (LinkedIn, Indeed...)"
            value={form.source}
            onChange={handleChange}
          />

          <input
            type="url"
            name="jobUrl"
            placeholder="Job URL"
            value={form.jobUrl}
            onChange={handleChange}
          />

          <input
            type="date"
            name="appliedAt"
            value={form.appliedAt}
            onChange={handleChange}
          />

          <textarea
            name="details"
            placeholder="Application details"
            value={form.details}
            onChange={handleChange}
            rows={7}
          />

          <div className="modal-actions">
            <button type="button" className="secondary-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditApplicationModal;