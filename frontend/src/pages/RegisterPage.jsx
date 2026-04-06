import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import api from "../api/axios";

function RegisterPage() {
  const [form, setForm] = useState({
    fullName: "",
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
      const res = await api.post("/auth/register", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      console.log("REGISTER ERROR:", err.response?.data);

      if (err.response?.data?.details) {
        setErrors(err.response.data.details);
      } else {
        setErrors([
          {
            message:
              err.response?.data?.debug ||
              err.response?.data?.error ||
              "Register failed",
          },
        ]);
      }
    }
  };

  return (
    <div className="page">
      <form className="card auth-card" onSubmit={handleSubmit}>
        <h1>Register</h1>
        <p className="auth-subtitle">
          Create your account to manage applications.
        </p>

        <input
          type="text"
          name="fullName"
          placeholder="Full name"
          value={form.fullName}
          onChange={handleChange}
        />

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

        <p className="password-hint">
          Password must contain:
          <br />
          • At least 8 characters
          <br />
          • 1 uppercase letter
          <br />
          • 1 lowercase letter
          <br />
          • 1 number
          <br />
          • 1 special character (@$!%*?&)
        </p>

        {errors.length > 0 && (
          <div className="error-box">
            {errors.map((err, index) => (
              <p key={index} className="error">
                • {err.message}
              </p>
            ))}
          </div>
        )}

        <button type="submit">Register</button>

        <p className="auth-link">
          Already have an account? <Link to="/login" className="auth-link-highlight">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;