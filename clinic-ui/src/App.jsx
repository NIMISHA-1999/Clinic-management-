import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthContext";
import Login from "./pages/Login";
import Doctors from "./pages/Doctors";
import Book from "./pages/Book";
import Appointments from "./pages/Appointments";
import Signup from "./pages/Signup";

function Guard({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div style={styles.app}>
          {/* Navbar */}
          <nav style={styles.nav}>
             <Link to="/" style={styles.logo}>💙 HealthPortal</Link>

            <div style={styles.links}>
    <Link to="/" style={styles.link}>Doctors</Link>
    <Link to="/appointments" style={styles.link}>Appointments</Link>
    <Link to="/login" style={styles.link}>Login</Link>
    <Link to="/signup" style={styles.link}>Signup</Link>
  </div>
          </nav>

          {/* Pages */}
          <main style={styles.main}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/" element={<Doctors />} />
              <Route path="/book/:id" element={<Guard><Book /></Guard>} />
              <Route path="/appointments" element={<Guard><Appointments /></Guard>} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

const styles = {
  app: {
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  nav: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    padding: "30px 32px",
    background: "linear-gradient(90deg, #1e293b, #0f172a)", // dark gradient
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
  },
  logo: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#38bdf8", // cyan accent
    textDecoration: "none",
    letterSpacing: "1px",
  },
  links: {
    display: "flex",
    gap: "28px",
  },
  link: {
    textDecoration: "none",
    color: "#e2e8f0", // light gray
    fontWeight: "500",
    fontSize: "15px",
    padding: "6px 10px",
    borderRadius: "6px",
    transition: "all 0.3s ease",
  },
  linkHover: {
    background: "#334155",
    color: "#38bdf8",
  },
  main: {
    flex: 1,
    width: "100%",
    padding: "24px",
    background: "#f1f5f9", // light gray bg for content
    boxSizing: "border-box",
    marginTop: "70px",
  },
};
