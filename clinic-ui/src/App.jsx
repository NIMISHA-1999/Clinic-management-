import { BrowserRouter, Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
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

function Layout({ children }) {
  const location = useLocation();
  const { token, logout } = useAuth(); 
  const hideNavbar = ["/login", "/signup"].includes(location.pathname);

  return (
    <div style={styles.app}>
      {!hideNavbar && (
        <nav style={styles.nav}>
          <Link to="/" style={styles.logo}>💙 HealthPortal</Link>

          <div style={styles.links}>
            <Link to="/" style={styles.link}>Doctors</Link>
            <Link to="/appointments" style={styles.link}>Appointments</Link>

            {token ? (
              <button onClick={logout} style={styles.logoutBtn}>Logout</button>
            ) : (
              <>
                <Link to="/login" style={styles.link}>Login</Link>
                <Link to="/signup" style={styles.link}>Signup</Link>
              </>
            )}
          </div>
        </nav>
      )}
      <main style={styles.main}>{children}</main>
    </div>
  );
}

function AppRoutes() {
  const { token } = useAuth();

  return (
    <Routes>
      <Route path="/" element={token ? <Doctors /> : <Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/book/:id" element={<Guard><Book /></Guard>} />
      <Route path="/appointments" element={<Guard><Appointments /></Guard>} />
      <Route path="*" element={<Navigate to={token ? "/" : "/login"} replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <AppRoutes />
        </Layout>
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
    background: "linear-gradient(90deg, #1e293b, #0f172a)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
  },
  logo: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#38bdf8",
    textDecoration: "none",
    letterSpacing: "1px",
  },
  links: {
    display: "flex",
    gap: "28px",
  },
  link: {
    textDecoration: "none",
    color: "#e2e8f0",
    fontWeight: "500",
    fontSize: "15px",
    padding: "6px 10px",
    borderRadius: "6px",
    transition: "all 0.3s ease",
  },
  main: {
    flex: 1,
    width: "100%",
    boxSizing: "border-box",
    marginTop: "70px",
  },
  logoutBtn: {
    background: "transparent",
    border: "1px solid #38bdf8",
    color: "#38bdf8",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "500",
  },
};
