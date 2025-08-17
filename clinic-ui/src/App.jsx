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
            <Link to="/" style={styles.link}>Doctors</Link>
            <Link to="/appointments" style={styles.link}>My Appointments</Link>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/signup" style={styles.link}>Signup</Link>
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
    width: "100%",
    padding: "16px 32px",
    borderBottom: "1px solid #ddd",
    background: "#f8f9fa",
    display: "flex",
    gap: "20px",
  },
  link: {
    textDecoration: "none",
    color: "#1d4ed8",
    fontWeight: "600",
  },
  main: {
    flex: 1,
    width: "100%",
    padding: "24px",
    background: "#f9fafb",
    boxSizing: "border-box",
  },
};
