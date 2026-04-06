const authService = require("../services/auth.service");

const register = async (req, res) => {
  try {
    const result = await authService.registerUser(req.body);
    return res.status(201).json(result);
  } catch (error) {
    if (error.message === "Email already in use") {
      return res.status(409).json({ error: error.message });
    }

    if (error.message === "JWT_SECRET is missing") {
      return res.status(500).json({ error: error.message });
    }

    console.error("REGISTER CONTROLLER ERROR:", error);
    return res.status(500).json({
      error: "Internal server error",
      debug: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const result = await authService.loginUser(req.body);
    return res.status(200).json(result);
  } catch (error) {
    if (error.message === "Invalid credentials") {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    console.error("LOGIN CONTROLLER ERROR:", error);
    return res.status(500).json({
      error: "Internal server error",
      debug: error.message,
    });
  }
};

module.exports = { register, login };