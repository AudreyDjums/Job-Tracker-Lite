import { FiEdit, FiTrash2, FiEye } from "react-icons/fi";

function formatDate(dateString) {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString();
}

function ApplicationTable({
  applications,
  onStatusChange,
  onDelete,
  onViewDetails,
  onEdit,
}) {
  if (applications.length === 0) {
    return <p className="empty-state">No applications found.</p>;
  }

  return (
    <div className="table-wrapper">
      <table className="applications-table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Job Title</th>
            <th>Status</th>
            <th>Source</th>
            <th>Details</th>
            <th>Applied Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {applications.map((app) => (
            <tr key={app.id}>
              <td>{app.company}</td>
              <td>{app.jobTitle}</td>

              <td>
                <span className={`badge badge-${app.status}`}>
                  {app.status}
                </span>
              </td>

              <td>{app.source || "-"}</td>

              <td>
                {app.details
                  ? `${app.details.slice(0, 40)}...`
                  : "-"}
              </td>

              <td>{formatDate(app.appliedAt)}</td>

              <td>
                <div className="table-actions">
                  <select
                    value={app.status}
                    onChange={(e) =>
                      onStatusChange(app.id, e.target.value)
                    }
                  >
                    <option value="applied">applied</option>
                    <option value="interview">interview</option>
                    <option value="rejected">rejected</option>
                    <option value="offer">offer</option>
                  </select>

                  {/* VIEW */}
                  <button
                    className="icon-btn view"
                    onClick={() => onViewDetails(app)}
                    title="View details"
                  >
                    <FiEye />
                  </button>

                  {/* EDIT */}
                  <button
                    className="icon-btn edit"
                    onClick={() => onEdit(app)}
                    title="Edit"
                  >
                    <FiEdit />
                  </button>

                  {/* DELETE */}
                  <button
                    className="icon-btn delete"
                    onClick={() => onDelete(app)}
                    title="Delete"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ApplicationTable;