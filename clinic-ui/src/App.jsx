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
        <nav style={{ padding: 12, borderBottom: "1px solid #ddd" }}>
          <Link to="/">Doctors</Link>{" | "}
          <Link to="/appointments">My Appointments</Link>
          <Link to="/login">Login</Link>{" | "}
          <Link to="/signup">Signup</Link>
        </nav>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Doctors/>}/>
          <Route path="/book/:id" element={<Guard><Book/></Guard>}/>
          <Route path="/appointments" element={<Guard><Appointments/></Guard>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
