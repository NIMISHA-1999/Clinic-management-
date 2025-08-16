import { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  useEffect(() => { api.get("/doctors").then(r => setDoctors(r.data)); }, []);
  return (
    <div style={{ padding: 24 }}>
      <h2>Doctors</h2>
      <ul>
        {doctors.map(d => (
          <li key={d.id} style={{ marginBottom: 12 }}>
            <b>{d.name}</b> — {d.speciality} ({d.department})<br/>
            Next available: {d.next_available ? `${d.next_available.date} • ${d.next_available.slot_label}` : "No slots next 30 days"}
            <br/>
            <Link to={`/book/${d.id}`}>Book appointment</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
