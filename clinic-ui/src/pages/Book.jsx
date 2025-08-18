import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api";

export default function Book() {
  const { id } = useParams();
  const nav = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [slots, setSlots] = useState([]);
  const [form, setForm] = useState({
    patient_name: "",
    age: "",
    appointment_date: "",
    slot_id: "",
  });
  const [err, setErr] = useState(null);

  useEffect(() => {
    api.get("/doctors").then((r) => {
      const d = r.data.find((x) => x.id === Number(id));
      setDoctor(d);
    });
    // Hardcoded slots
    setSlots([
      { id: 1, label: "10:00 - 11:30" },
      { id: 2, label: "12:00 - 13:00" },
      { id: 3, label: "15:00 - 16:30" },
      { id: 4, label: "19:00 - 20:00" },
    ]);
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    setErr(null);
   try {
  await api.post("/appointments", form);
  alert("✅ Appointment booked successfully!");
} catch (err) {
  if (err.response?.data?.non_field_errors) {
    alert("⚠️ This doctor is already booked for that date and slot. Please choose another.");
  } else {
    alert("❌ Something went wrong. Please try again.");
  }
}

  };

  return (
  <div style={styles.container}>
    <div style={styles.wrapper}>
      <h2 style={styles.heading}>
        📅 Book Appointment {doctor && `with Dr. ${doctor.name}`}
      </h2>

      <form onSubmit={submit} style={styles.form}>
        <input
          style={styles.input}
          placeholder="Patient Name"
          value={form.patient_name}
          onChange={(e) =>
            setForm((f) => ({ ...f, patient_name: e.target.value }))
          }
        />
        <input
          style={styles.input}
          placeholder="Age"
          type="number"
          value={form.age}
          onChange={(e) => setForm((f) => ({ ...f, age: e.target.value }))}
        />
        {/* <input
          style={styles.input}
          type="date"
          value={form.appointment_date}
          onChange={(e) =>
            setForm((f) => ({ ...f, appointment_date: e.target.value }))
          }
        /> */}
        <input
  style={styles.input}
  type="date"
  min={new Date(Date.now() + 86400000).toISOString().split("T")[0]} // tomorrow
  value={form.appointment_date}
  onChange={(e) =>
    setForm((f) => ({ ...f, appointment_date: e.target.value }))
  }
/>

        <select
          style={styles.input}
          value={form.slot_id}
          onChange={(e) => setForm((f) => ({ ...f, slot_id: e.target.value }))}
        >
          <option value="">Select slot</option>
          {slots.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
        <button style={styles.button}>Book Appointment</button>
        {err && (
  <p style={styles.error}>
    {err?.[0] || "Something went wrong. Please try again."}
  </p>
)}

      </form>
    </div>
  </div>
);
}

const styles = {
  container: {
    minHeight: "80vh",
    background: "#f9fafb",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",  // <-- vertically centers
    padding: "20px",
  },
  wrapper: {
    width: "100%",
    maxWidth: "500px",   // <-- keeps it nice and centered like a card
    textAlign: "center",
  },
  form: {
    display: "grid",
    gap: "12px",
    background: "#fff",
    padding: "28px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    width: "100%",   // <-- fill wrapper
  },
  heading: {
    fontSize: "26px",
    fontWeight: "700",
    marginBottom: "20px",
    color: "#1d4ed8",
  },
  input: {
    padding: "12px 14px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "14px",
    outline: "none",
  },
  button: {
    padding: "12px 14px",
    background: "#1d4ed8",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "15px",
  },
  error: {
    color: "crimson",
    fontSize: "13px",
    whiteSpace: "pre-wrap",
  },
};
