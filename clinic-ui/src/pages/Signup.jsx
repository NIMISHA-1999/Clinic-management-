import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const nav = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await api.post("/users/signup/", form);
      setSuccess(true);
      setTimeout(() => nav("/login"), 1500);
    } catch (err) {
      setError(err.response?.data || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .signup-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: #f9fbfd;
        }
        .signup-form {
          background: white;
          padding: 32px;
          border-radius: 12px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.08);
          width: 100%;
          max-width: 380px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .signup-form h2 {
          text-align: center;
          margin-bottom: 12px;
          color: #222;
        }
        .signup-form label {
          font-size: 0.9rem;
          font-weight: 500;
          margin-bottom: 4px;
          color: #333;
        }
        .signup-form input {
          padding: 10px 12px;
          border: 1px solid #d0d7de;
          border-radius: 8px;
          font-size: 0.95rem;
          outline: none;
          transition: border 0.2s;
        }
        .signup-form input:focus {
          border-color: #1976d2;
        }
        .signup-form button {
          background: #1976d2;
          color: white;
          padding: 12px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1rem;
          transition: background 0.2s;
        }
        .signup-form button:hover {
          background: #125ea8;
        }
        .error {
          color: crimson;
          font-size: 0.85rem;
          text-align: center;
        }
        .success {
          color: green;
          font-size: 0.85rem;
          text-align: center;
        }
        .note {
          text-align: center;
          font-size: 0.85rem;
          color: #555;
        }
        .note a {
          color: #1976d2;
          text-decoration: none;
          font-weight: 500;
        }
        .note a:hover {
          text-decoration: underline;
        }
      `}</style>

      <div className="signup-container">
        <form className="signup-form" onSubmit={submit}>
          <h2>Create Account</h2>

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter a strong password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          {error && <p className="error">{JSON.stringify(error)}</p>}
          {success && <p className="success">Signup successful! Redirecting…</p>}

          <p className="note">
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </div>
    </>
  );
}
