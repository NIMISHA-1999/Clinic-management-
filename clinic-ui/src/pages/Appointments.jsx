import { useEffect, useState } from "react";
import api from "../api";

export default function Appointments() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get("/appointments").then((r) => setItems(r.data));
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📋 My Appointments</h2>

      {items.length === 0 ? (
        <p style={styles.empty}>No appointments found. 📭</p>
      ) : (
        <div style={styles.list}>
          {items.map((a) => (
            <div key={a.id} style={styles.card}>
              <div style={styles.header}>
                <span style={styles.date}>
                  📅 {a.appointment_date} • {a.slot.label}
                </span>
                <span style={styles.status}>
                  {a.status || "Upcoming"}
                </span>
              </div>

              <div style={styles.body}>
                <span style={styles.doctor}>👨‍⚕️ {a.doctor.name}</span>
                <span style={styles.patient}>
                  🧑 {a.patient_name} ({a.age} yrs)
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    minHeight: "100vh",
    padding: "30px 20px",
    background: "#f9fafb",
    boxSizing: "border-box",
  },
  heading: {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "24px",
    color: "#1e3a8a",
    textAlign: "center",
  },
  empty: {
    fontSize: "18px",
    textAlign: "center",
    color: "#6b7280",
    marginTop: "40px",
    fontStyle: "italic",
  },
  list: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "#fff",
    borderRadius: "16px",
    padding: "20px",
    boxShadow: "0 6px 14px rgba(0,0,0,0.1)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    cursor: "pointer",
  },
  cardHover: {
    transform: "translateY(-4px)",
    boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
  },
  body: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  date: {
    fontWeight: "600",
    color: "#111827",
    fontSize: "15px",
  },
  doctor: {
    fontWeight: "600",
    color: "#2563eb",
    fontSize: "16px",
  },
  patient: {
    fontSize: "14px",
    color: "#4b5563",
  },
  status: {
    background: "#d1fae5",
    color: "#065f46",
    fontSize: "12px",
    fontWeight: "600",
    padding: "4px 10px",
    borderRadius: "12px",
    textTransform: "uppercase",
  },
};
