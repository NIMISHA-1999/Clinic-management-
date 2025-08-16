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
      setError(err.response?.data || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
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

        {error && (
          <div style={styles.error}>
            {typeof error === "string" ? error : JSON.stringify(error)}
          </div>
        )}
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #dbeafe, #93c5fd)",
  },
  form: {
    background: "white",
    padding: "32px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "380px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  title: { textAlign: "center", marginBottom: "16px", color: "#1d4ed8" },
  label: { fontSize: "14px", fontWeight: "500", color: "#374151" },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    outline: "none",
    fontSize: "14px",
  },
  button: {
    marginTop: "12px",
    padding: "10px",
    background: "#1d4ed8",
    color: "white",
    fontWeight: "600",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  error: {
    marginTop: "12px",
    padding: "8px",
    background: "#fee2e2",
    color: "#b91c1c",
    borderRadius: "6px",
    fontSize: "14px",
    textAlign: "center",
  },
};
