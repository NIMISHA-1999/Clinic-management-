import { useState } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(email, password); // calls backend /users/login
      nav("/");
    } catch (err) {
      const apiError = err.response?.data;
      if (apiError && typeof apiError === "object") {
        const messages = Object.values(apiError).flat().join(" ");
        setError(messages);
      } else {
        setError("Invalid credentials");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        html, body, #root {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
        }
      `}</style>

      <div style={styles.container}>
        <form onSubmit={submit} style={styles.form}>
          <h2 style={styles.title}>Clinic Login</h2>

          <label style={styles.label}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            placeholder="Enter email"
            required
          />

          <label style={styles.label}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            placeholder="Enter password"
            required
          />

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          {error && <div style={styles.error}>{error}</div>}
        </form>
      </div>
    </>
  );
}

const styles = {
  container: {
    width: "100%",
    height: "100vh",
    background: "linear-gradient(135deg, #dbeafe, #93c5fd)",
    padding: "0", // no padding so form fills
  },
  form: {
    background: "white",
    padding: "40px",
    width: "100%",    // ✅ full width
    height: "100%",   // ✅ full height
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "16px",
  },
  title: {
    marginBottom: "20px",
    color: "#1d4ed8",
    fontSize: "2rem",
  },
  label: { fontSize: "16px", fontWeight: "600", color: "#374151" },
  input: {
    padding: "14px",
    borderRadius: "6px",
    border: "1px solid #cbd5e1",
    outline: "none",
    fontSize: "16px",
    width: "100%",
  },
  button: {
    padding: "14px",
    background: "#1d4ed8",
    color: "white",
    fontWeight: "600",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    width: "100%",
    fontSize: "16px",
  },
  error: {
    marginTop: "12px",
    padding: "10px",
    background: "#fee2e2",
    color: "#b91c1c",
    borderRadius: "6px",
    fontSize: "14px",
    textAlign: "center",
  },
};
