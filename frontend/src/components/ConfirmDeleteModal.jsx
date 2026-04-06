function ConfirmDeleteModal({ isOpen, onClose, onConfirm, application }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal confirm-modal">
        <div className="modal-header">
          <h3>Delete application</h3>
          <button type="button" className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <p className="confirm-text">
          Are you sure you want to delete this application?
        </p>

        {application && (
          <div className="confirm-box">
            <strong>{application.company}</strong>
            <p>{application.jobTitle}</p>
          </div>
        )}

        <div className="modal-actions">
          <button type="button" className="secondary-btn" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="delete-btn" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;