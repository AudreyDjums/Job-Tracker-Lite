import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import api from "../api/axios";

function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      console.log("LOGIN ERROR:", err.response?.data);

      if (err.response?.data?.details) {
        setErrors(err.response.data.details);
      } else {
        setErrors([
          { message: err.response?.data?.error || "Login failed" },
        ]);
      }
    }
  };

  return (
    <div className="page">
      <form className="card auth-card" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <p className="auth-subtitle">Access your job tracking dashboard.</p>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <div className="password-field">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
          <button
            type="button"
            className="toggle-password-btn"
            onClick={() => setShowPassword((prev) => !prev)}
            title={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>

        {errors.length > 0 && (
          <div className="error-box">
            <p className="error-title">Login error:</p>
            {errors.map((err, index) => (
              <p key={index} className="error">
                • {err.message}
              </p>
            ))}
          </div>
        )}

        <button type="submit">Login</button>

        <p className="auth-link">
          No account? <Link to="/register" className="auth-link-highlight">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;