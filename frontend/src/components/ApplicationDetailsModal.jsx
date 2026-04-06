function formatDate(dateString) {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString();
}

function ApplicationDetailsModal({isOpen, application, onClose}) {
    if (!isOpen || !application) return null;

    return (
        <div className="modal-overlay">
            <div className="modal details-modal">
                <div className="modal-header">
                    <h3>Application details</h3>
                    <button className="close-btn" onClick={onClose}>
                        ✕
                    </button>
                </div>

                <div className="details-grid">
                    <div><strong>Company:</strong> {application.company}</div>
                    <div><strong>Job Title:</strong> {application.jobTitle}</div>
                    <div><strong>Status:</strong> {application.status}</div>
                    <div><strong>Location:</strong> {application.location || "-"}</div>
                    <div><strong>Source:</strong> {application.source || "-"}</div>
                    <div><strong>Job URL:</strong> {application.jobUrl || "-"}</div>
                    <div><strong>Applied date:</strong> {formatDate(application.appliedAt)}</div>
                    <div><strong>Created at:</strong> {formatDate(application.createdAt)}</div>
                    <div><strong>Updated at:</strong> {formatDate(application.updatedAt)}</div>

                </div>

                <div className="details-box">
                    <strong>Details</strong>
                    <p>{application.details || "No details provided."}</p>
                </div>

                <div className="modal-actions">
                    <button className="secondary-btn" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
  );
}

export default ApplicationDetailsModal;