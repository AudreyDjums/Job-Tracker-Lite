const service = require("../services/application.service");

const getAll = async (req, res) => {
  try {
    const data = await service.getAllApplications(req.user.userId);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getOne = async (req, res) => {
  try {
    const data = await service.getAllApplicationById(req.params.id ,req.user.userId);
    res.status(200).json(data);
  } catch (error) {
    if (error.message === "Application not found") {
        return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

const create = async (req, res) => {
  try {
    const app = await service.createApplication(req.body, req.user.userId);
    res.status(201).json(app);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const update = async (req, res) => {
  try {
    const updated = await service.updateApplication(
      req.params.id,
      req.body,
      req.user.userId
    );
    res.status(200).json(updated);
  } catch (error) {
    if (error.message === "Application not found") {
      return res.status(404).json({ error: error.message });
    }

    res.status(500).json({ error: "Internal server error" });
  }
};

const remove = async (req, res) => {
  try {
    await service.deleteApplication(req.params.id, req.user.userId);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    if (error.message === "Application not found") {
      return res.status(404).json({ error: error.message });
    }

    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getAll, getOne, create, update, remove };