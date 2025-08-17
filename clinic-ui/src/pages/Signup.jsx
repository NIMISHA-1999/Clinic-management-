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
    }  catch (err) {
  const apiError = err.response?.data;
  if (apiError?.email) {
    setError(apiError.email[0]);  // pick first email error
  } else if (typeof apiError === "string") {
    setError(apiError);
  } else {
    setError("Signup failed");
  }
}
finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body, html, #root {
    width: 100%;
    height: 100%;
  }

  .signup-container {
    width: 100%;
    height: 100vh;
    background: #f9fbfd;
  }

  .signup-form {
    background: white;
    padding: 40px;
    border-radius: 0;
    box-shadow: none;
    width: 100%;
    height: 100%;   /* ✅ take full height */
    display: flex;
    flex-direction: column;
    justify-content: center; /* ✅ vertically center inputs */
    gap: 20px;
  }

  .signup-form h2 {
    text-align: left;
    margin-bottom: 20px;
    color: #222;
    font-size: 2rem;
  }

  .signup-form label {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 6px;
    color: #333;
  }

  .signup-form input {
    padding: 14px 16px;
    border: 1px solid #d0d7de;
    border-radius: 6px;
    font-size: 1rem;
    outline: none;
    width: 100%;
  }

  .signup-form input:focus {
    border-color: #1976d2;
  }

  .signup-form button {
    background: #1976d2;
    color: white;
    padding: 14px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1.1rem;
    width: 100%;
  }

  .signup-form button:hover {
    background: #125ea8;
  }

  .error {
    color: crimson;
    font-size: 0.9rem;
    text-align: center;
  }

  .success {
    color: green;
    font-size: 0.9rem;
    text-align: center;
  }

  .note {
    text-align: center;
    font-size: 0.9rem;
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
