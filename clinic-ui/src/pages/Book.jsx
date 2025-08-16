import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api";

export default function Book() {
  const { id } = useParams();
  const nav = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [slots, setSlots] = useState([]);
  const [form, setForm] = useState({ patient_name: "", age: "", appointment_date: "", slot_id: "" });
  const [err, setErr] = useState(null);

  useEffect(() => {
    api.get("/doctors").then(r => {
      const d = r.data.find(x => x.id === Number(id));
      setDoctor(d);
    });
    // get slots for selector
    api.get("/doctors").then(() => {}); // slots are static; hardcode options:
    setSlots([
      { id: 1, label: "10:00-11:30" },
      { id: 2, label: "12:00-13:00" },
      { id: 3, label: "15:00-16:30" },
      { id: 4, label: "19:00-20:00" },
    ]);
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    setErr(null);
    try {
      await api.post("/appointments", {
        patient_name: form.patient_name,
        age: Number(form.age),
        appointment_date: form.appointment_date,
        doctor_id: Number(id),
        slot_id: Number(form.slot_id),
      });
      nav("/appointments");
    } catch (er) {
      setErr(er.response?.data || "Error");
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Book Appointment {doctor && `with ${doctor.name}`}</h2>
      <form onSubmit={submit} style={{ display: "grid", gap: 8, maxWidth: 420 }}>
        <input placeholder="Patient Name" value={form.patient_name} onChange={e=>setForm(f=>({...f, patient_name:e.target.value}))}/>
        <input placeholder="Age" type="number" value={form.age} onChange={e=>setForm(f=>({...f, age:e.target.value}))}/>
        <input placeholder="Date (YYYY-MM-DD)" type="date" value={form.appointment_date} onChange={e=>setForm(f=>({...f, appointment_date:e.target.value}))}/>
        <select value={form.slot_id} onChange={e=>setForm(f=>({...f, slot_id:e.target.value}))}>
          <option value="">Select slot</option>
          {slots.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
        </select>
        <button>Book</button>
        {err && <pre style={{ color: "crimson" }}>{JSON.stringify(err, null, 2)}</pre>}
      </form>
    </div>
  );
}
