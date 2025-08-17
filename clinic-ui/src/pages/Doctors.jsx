import { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";
import { FaUserMd, FaHospital, FaCalendarAlt } from "react-icons/fa";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    api.get("/doctors").then((r) => setDoctors(r.data));
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>
  👨‍⚕️ Our Doctors
  <span style={styles.headingUnderline}></span>
</h2>


      <div style={styles.grid}>
        {doctors.map((d) => (
          <div key={d.id} style={styles.card}>
            <h3 style={styles.name}>
              <FaUserMd style={styles.icon} /> {d.name}
            </h3>
            <p>
              <FaUserMd style={styles.iconSmall} /> <b>Speciality:</b>{" "}
              {d.speciality}
            </p>
            <p>
              <FaHospital style={styles.iconSmall} /> <b>Department:</b>{" "}
              {d.department}
            </p>
            <p>
              <FaCalendarAlt style={styles.iconSmall} />{" "}
              {d.next_available
                ? `Next available: ${d.next_available.date} • ${d.next_available.slot_label}`
                : "No slots in the next 30 days"}
            </p>
            <Link to={`/book/${d.id}`} style={styles.button}>
              Book Appointment
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    minHeight: "100vh",
    padding: "20px",
    background: "#f9fafb",
    boxSizing: "border-box",
  },
    heading: {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "24px",
    color: "#1d4ed8", // same blue as Appointments for consistency
    textAlign: "center",
    position: "relative",
  },
  headingUnderline: {
    content: '""',
    display: "block",
    width: "80px",
    height: "4px",
    backgroundColor: "#2563eb",
    margin: "8px auto 0 auto",
    borderRadius: "2px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "#fff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  name: {
    fontSize: "1.2rem",
    fontWeight: "600",
    marginBottom: "8px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  button: {
    display: "inline-block",
    marginTop: "12px",
    padding: "10px 16px",
    background: "#1d4ed8",
    color: "#fff",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "600",
  },
  icon: {
    color: "#1d4ed8",
  },
  iconSmall: {
    marginRight: "6px",
    color: "#2563eb",
  },
};
