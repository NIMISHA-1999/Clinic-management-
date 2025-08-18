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
      setTimeout(() => nav("/"), 1500);
    } catch (err) {
      const apiError = err.response?.data;
      if (apiError?.email) {
        setError(apiError.email[0]);
      } else if (typeof apiError === "string") {
        setError(apiError);
      } else {
        setError("Signup failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        body {
          margin: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: #f9fafb;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
        }

        .container {
          display: flex;
          background: #fff;
          width: 100%;
          max-width: 950px;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          overflow: hidden;
        }

        .left {
          flex: 1;
          background: url('https://img.freepik.com/free-photo/modern-medical-background-with-clean-white-wall_53876-104056.jpg') no-repeat center center;
          background-size: cover;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          text-align: center;
          padding: 30px;
        }

        .left h2 {
          font-size: 2rem;
          font-weight: 700;
          color: #fff;
          text-shadow: 0 2px 4px rgba(0,0,0,0.4);
        }

        .right {
          flex: 1;
          padding: 50px 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .right h2 {
          margin-bottom: 24px;
          font-size: 1.8rem;
          color: #1e293b;
          text-align: center;
        }

        .right label {
          display: block;
          text-align: left;
          margin-bottom: 8px;
          font-weight: 600;
          font-size: 0.95rem;
          color: #334155;
        }

        .right input {
          width: 100%;
          padding: 14px;
          margin-bottom: 18px;
          border: 1px solid #cbd5e1;
          border-radius: 10px;
          font-size: 1rem;
          outline: none;
          transition: border 0.2s;
        }

        .right input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59,130,246,0.2);
        }

        .right button {
          width: 100%;
          padding: 14px;
          background: #3b82f6;
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 1.05rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .right button:hover {
          background: #2563eb;
          transform: translateY(-1px);
        }

        .error {
          color: #dc2626;
          margin-top: 10px;
          font-size: 0.9rem;
        }

        .success {
          color: #16a34a;
          margin-top: 10px;
          font-size: 0.9rem;
        }

        .note {
          margin-top: 16px;
          font-size: 0.95rem;
          color: #555;
          text-align: center;
        }

        .note a {
          color: #3b82f6;
          text-decoration: none;
          font-weight: 600;
        }

        .note a:hover {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .container {
            flex-direction: column;
          }
          .left {
            display: none;
          }
          .right {
            padding: 30px 20px;
          }
        }
      `}</style>

      <div className="container">
        <div className="left">
          <h2>Welcome to Our Clinic</h2>
        </div>

        <div className="right">
          <h2>Create Account</h2>
          <form onSubmit={submit}>
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
          </form>

          {error && <p className="error">{error}</p>}
          {success && <p className="success">✅ Signup successful! Redirecting…</p>}

          <p className="note">
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </>
  );
}
