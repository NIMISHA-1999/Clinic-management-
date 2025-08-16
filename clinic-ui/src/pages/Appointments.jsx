import { useEffect, useState } from "react";
import api from "../api";

export default function Appointments() {
  const [items, setItems] = useState([]);
  useEffect(() => { api.get("/appointments").then(r => setItems(r.data)); }, []);
  return (
    <div style={{ padding: 24 }}>
      <h2>My Appointments</h2>
      <ul>
        {items.map(a => (
          <li key={a.id}>
            {a.appointment_date} • {a.slot.label} — {a.doctor.name} | {a.patient_name} ({a.age})
          </li>
        ))}
      </ul>
    </div>
  );
}
