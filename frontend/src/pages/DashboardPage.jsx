import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import AlertMessage from "../components/AlertMessage";
import ApplicationTable from "../components/ApplicationTable";
import ApplicationModal from "../components/ApplicationModal";
import ApplicationDetailsModal from "../components/ApplicationDetailsModal";
import EditApplicationModal from "../components/EditApplicationModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

function DashboardPage() {
  const [applications, setApplications] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [selectedApplication, setSelectedApplication] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [applicationToDelete, setApplicationToDelete] = useState(null);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await api.get("/applications");
      setApplications(res.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter, searchTerm, sortOrder]);

  const handleAdd = async (form) => {
    try {
      await api.post("/applications", form);
      setSuccess("Application created successfully");
      setError("");
      setIsAddModalOpen(false);
      fetchApplications();
    } catch (err) {
      if (err.response?.data?.details) {
        setError(err.response.data.details.map((d) => d.message).join(", "));
      } else {
        setError(err.response?.data?.error || "Failed to add application");
      }
      setSuccess("");
    }
  };

  const handleEdit = async (id, form) => {
    try {
      await api.put(`/applications/${id}`, form);
      setSuccess("Application updated successfully");
      setError("");
      setIsEditModalOpen(false);
      setSelectedApplication(null);
      fetchApplications();
    } catch (err) {
      if (err.response?.data?.details) {
        setError(err.response.data.details.map((d) => d.message).join(", "));
      } else {
        setError(err.response?.data?.error || "Failed to update application");
      }
      setSuccess("");
    }
  };

  const handleOpenDelete = (application) => {
  setApplicationToDelete(application);
  setIsDeleteModalOpen(true);
};

  const handleDelete = async () => {
  if (!applicationToDelete?.id) {
    setError("No application selected for deletion");
    setIsDeleteModalOpen(false);
    setApplicationToDelete(null);
    return;
  }

  try {
    await api.delete(`/applications/${applicationToDelete.id}`);
    setSuccess("Application deleted successfully");
    setError("");
    setIsDeleteModalOpen(false);
    setApplicationToDelete(null);
    fetchApplications();
  } catch (err) {
    setError(err.response?.data?.error || "Failed to delete application");
    setSuccess("");
    setIsDeleteModalOpen(false);
    setApplicationToDelete(null);
  }
};

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.put(`/applications/${id}`, { status: newStatus });
      setSuccess("Status updated successfully");
      setError("");
      fetchApplications();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update status");
      setSuccess("");
    }
  };

  const handleViewDetails = (application) => {
    setSelectedApplication(application);
    setIsDetailsModalOpen(true);
  };

  const handleOpenEdit = (application) => {
    setSelectedApplication(application);
    setIsEditModalOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const processedApplications = useMemo(() => {
    let result = [...applications];

    if (filter !== "all") {
      result = result.filter((app) => app.status === filter);
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (app) =>
          app.company.toLowerCase().includes(term) ||
          app.jobTitle.toLowerCase().includes(term)
      );
    }

    result.sort((a, b) => {
      const dateA = new Date(a.appliedAt).getTime();
      const dateB = new Date(b.appliedAt).getTime();
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [applications, filter, searchTerm, sortOrder]);

  const totalPages = Math.ceil(processedApplications.length / itemsPerPage);

  const paginatedApplications = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return processedApplications.slice(start, start + itemsPerPage);
  }, [processedApplications, currentPage]);

  const counts = useMemo(() => {
    return {
      total: applications.length,
      applied: applications.filter((a) => a.status === "applied").length,
      interview: applications.filter((a) => a.status === "interview").length,
      rejected: applications.filter((a) => a.status === "rejected").length,
      offer: applications.filter((a) => a.status === "offer").length,
    };
  }, [applications]);

  return (
    <div className="dashboard-page">
      <Navbar
        user={user}
        onAddClick={() => setIsAddModalOpen(true)}
        onLogout={handleLogout}
      />

      <div className="dashboard-container">
        <div className="stats">
          <div className="stat-box">
            <span>Total</span>
            <strong>{counts.total}</strong>
          </div>
          <div className="stat-box">
            <span>Applied</span>
            <strong>{counts.applied}</strong>
          </div>
          <div className="stat-box">
            <span>Interview</span>
            <strong>{counts.interview}</strong>
          </div>
          <div className="stat-box">
            <span>Rejected</span>
            <strong>{counts.rejected}</strong>
          </div>
          <div className="stat-box">
            <span>Offer</span>
            <strong>{counts.offer}</strong>
          </div>
        </div>

        <div className="toolbar advanced-toolbar">
          <div className="toolbar-item">
            <label htmlFor="search">Search</label>
            <input
              id="search"
              type="text"
              placeholder="Search by company or job title"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="toolbar-item">
            <label htmlFor="filter">Filter by status</label>
            <select
              id="filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">all</option>
              <option value="applied">applied</option>
              <option value="interview">interview</option>
              <option value="rejected">rejected</option>
              <option value="offer">offer</option>
            </select>
          </div>

          <div className="toolbar-item">
            <label htmlFor="sort">Sort by date</label>
            <select
              id="sort"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="desc">newest first</option>
              <option value="asc">oldest first</option>
            </select>
          </div>
        </div>

        <AlertMessage type="success" message={success} />
        <AlertMessage type="error" message={error} />

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <ApplicationTable
              applications={paginatedApplications}
              onStatusChange={handleStatusChange}
              onDelete={handleOpenDelete}
              onViewDetails={handleViewDetails}
              onEdit={handleOpenEdit}
            />

            {totalPages > 1 && (
              <div className="pagination">
                <button
                  className="secondary-btn pagination-btn"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                >
                  Previous
                </button>

                <span className="pagination-info">
                  Page {currentPage} / {totalPages}
                </span>

                <button
                  className="secondary-btn pagination-btn"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <ApplicationModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAdd}
      />

      <ApplicationDetailsModal
        isOpen={isDetailsModalOpen}
        application={selectedApplication}
        onClose={() => setIsDetailsModalOpen(false)}
      />

      <EditApplicationModal
        isOpen={isEditModalOpen}
        application={selectedApplication}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedApplication(null);
        }}
        onSubmit={handleEdit}
      />

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        application={applicationToDelete}
        onClose={() => {
             setIsDeleteModalOpen(false);
             setApplicationToDelete(null);
         }}
         onConfirm={handleDelete}
     />

    </div>
  );
}

export default DashboardPage;