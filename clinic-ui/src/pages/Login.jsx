import { useState } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate, Link } from "react-router-dom";

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
      await login(email, password);
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
    <div style={styles.container}>
      {/* Left Section with Full Image */}
      <div style={styles.left}>
        <img
          src="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg" // ✅ replace with clinic banner
          alt="Clinic Banner"
          style={styles.image}
        />
      </div>

      {/* Right Section with Modern Card Form */}
      <div style={styles.right}>
        <div style={styles.card}>
          <h2 style={styles.title}>🏥 Welcome Back</h2>
          <p style={styles.subtitle}>Login to manage your appointments</p>

          <form onSubmit={submit} style={styles.form}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              placeholder="Enter your email"
              required
            />

            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              placeholder="Enter your password"
              required
            />

            <button type="submit" style={styles.button} disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>

            {error && <div style={styles.error}>{error}</div>}

            <p style={styles.signupText}>
              Don’t have an account?{" "}
              <Link to="/signup" style={styles.signupLink}>
                Signup
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    width: "100%",
    background: "linear-gradient(135deg, #f0f9ff, #e0f2fe)",
    fontFamily: "'Poppins', sans-serif",
  },
  left: {
    flex: 1.2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "30px",
  },
  image: {
    width: "100%",
    maxWidth: "600px",
    borderRadius: "16px",
  },
  right: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "white",
    borderTopLeftRadius: "32px",
    borderBottomLeftRadius: "32px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
    padding: "40px",
  },
  form: {
    width: "100%",
    maxWidth: "380px",
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  title: {
    fontSize: "30px",
    fontWeight: "700",
    color: "#0f172a",
    textAlign: "center",
  },
  subtitle: {
    fontSize: "15px",
    color: "#64748b",
    marginBottom: "15px",
    textAlign: "center",
  },
  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#1e293b",
  },
  input: {
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid #cbd5e1",
    fontSize: "15px",
    outline: "none",
  },
  button: {
    padding: "14px",
    background: "linear-gradient(90deg, #06b6d4, #0ea5e9)",
    color: "white",
    fontWeight: "600",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "transform 0.2s ease, background 0.3s ease",
  },
  error: {
    marginTop: "6px",
    padding: "10px",
    background: "#fee2e2",
    color: "#b91c1c",
    borderRadius: "6px",
    fontSize: "14px",
    textAlign: "center",
  },
  signupText: {
    marginTop: "12px",
    textAlign: "center",
    fontSize: "14px",
    color: "#475569",
  },
  signupLink: {
    color: "#0ea5e9",
    fontWeight: "600",
    textDecoration: "none",
    marginLeft: "5px",
  },
};

