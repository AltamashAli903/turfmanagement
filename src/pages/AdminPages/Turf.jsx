import { useEffect, useState } from "react";
import {
  getOwnerTurfs,
  createTurf,
  updateTurf,
  deleteTurf
} from "../../services/turfService";
import { formatTo12Hour, convertTo24Hour } from "../../utils/timeFormat";

export default function Turf() {
  const [turfs, setTurfs] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [form, setForm] = useState({
    turf_id: "",
    turf_name: "",
    sport_type: "",
    location: "",
    address: "",
    opening_hour: "6",
    opening_minute: "00",
    opening_ampm: "AM",
    closing_hour: "11",
    closing_minute: "00",
    closing_ampm: "PM"
  });

  // 🚀 FETCH TURFS
  const fetchTurfs = async () => {
    try {
      const res = await getOwnerTurfs();
      setTurfs(Array.isArray(res.data.data) ? res.data.data : []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTurfs();
  }, []);

  // 🚀 HANDLE INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🚀 SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const opening_time = convertTo24Hour(
      form.opening_hour,
      form.opening_minute,
      form.opening_ampm
    );

    const closing_time = convertTo24Hour(
      form.closing_hour,
      form.closing_minute,
      form.closing_ampm
    );

    const payload = { ...form, opening_time, closing_time };

    try {
      if (isEdit) {
        await updateTurf(payload);
      } else {
        await createTurf(payload);
      }

      setOpenModal(false);
      fetchTurfs();
    } catch (err) {
      console.error(err);
    }
  };

  // 🚀 EDIT
  const handleEdit = (turf) => {
    const convert = (time) => {
      let [h, m] = time.split(":");
      h = parseInt(h);
      const ampm = h >= 12 ? "PM" : "AM";
      h = h % 12 || 12;
      return { h: String(h), m, ampm };
    };

    const open = convert(turf.opening_time);
    const close = convert(turf.closing_time);

    setForm({
      turf_id: turf.id,
      turf_name: turf.turf_name,
      sport_type: turf.sport_type,
      location: turf.location,
      address: turf.address,
      opening_hour: open.h,
      opening_minute: open.m,
      opening_ampm: open.ampm,
      closing_hour: close.h,
      closing_minute: close.m,
      closing_ampm: close.ampm
    });

    setIsEdit(true);
    setOpenModal(true);
  };

  // 🚀 DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this turf?")) return;

    await deleteTurf({ turf_id: id });
    fetchTurfs();
  };

  // 🔄 RESET FORM
  const resetForm = () => {
    setForm({
      turf_id: "",
      turf_name: "",
      sport_type: "",
      location: "",
      address: "",
      opening_hour: "6",
      opening_minute: "00",
      opening_ampm: "AM",
      closing_hour: "11",
      closing_minute: "00",
      closing_ampm: "PM"
    });
  };

  return (
    <div className="p-4 sm:p-6 min-h-screen bg-gradient-to-br from-green-50 to-white">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            Turf Management ({turfs.length})
          </h1>
          <p className="text-sm text-gray-500">
            Manage all your turfs
          </p>
        </div>

        <button
          onClick={() => {
            resetForm();
            setIsEdit(false);
            setOpenModal(true);
          }}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg shadow text-sm"
        >
          + Add Turf
        </button>
      </div>

      {/* GRID */}
      {turfs.length === 0 ? (
        <div className="text-center text-gray-400 py-20">
          No Turf Found 🚫
        </div>
      ) : (
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {turfs.map((turf) => (
            <div
              key={turf.id}
              className="bg-white rounded-2xl shadow p-5 hover:shadow-lg transition flex flex-col justify-between"
            >

              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {turf.turf_name}
                </h2>

                <p className="text-gray-500 text-sm mt-1">
                  📍 {turf.location}
                </p>

                <p className="text-gray-500 text-sm">
                  🏏 {turf.sport_type}
                </p>

                <p className="text-gray-500 text-sm mt-2">
                  ⏰ {formatTo12Hour(turf.opening_time)} - {formatTo12Hour(turf.closing_time)}
                </p>

                <span className="inline-block mt-3 px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">
                  {turf.approval_status}
                </span>
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleEdit(turf)}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg text-sm"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(turf.id)}
                  className="flex-1 bg-emerald-800 hover:bg-emerald-900 text-white py-2 rounded-lg text-sm"
                >
                  Delete
                </button>
              </div>

            </div>
          ))}

        </div>
      )}

      {/* MODAL */}
      {openModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

          <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-xl">

            <h2 className="text-lg font-semibold mb-4">
              {isEdit ? "Update Turf" : "Add Turf"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">

              <input name="turf_name" value={form.turf_name} onChange={handleChange} placeholder="Turf Name" className="w-full border px-3 py-2 rounded-lg" required />
              <input name="sport_type" value={form.sport_type} onChange={handleChange} placeholder="Sport Type" className="w-full border px-3 py-2 rounded-lg" required />
              <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className="w-full border px-3 py-2 rounded-lg" required />
              <textarea name="address" value={form.address} onChange={handleChange} placeholder="Address" className="w-full border px-3 py-2 rounded-lg" />

              {/* TIME */}
              <div className="grid grid-cols-2 gap-3">

                {/* OPEN */}
                <div className="flex gap-2">
                  <select name="opening_hour" value={form.opening_hour} onChange={handleChange} className="border p-2 rounded-lg">
                    {[...Array(12)].map((_, i) => <option key={i}>{i + 1}</option>)}
                  </select>

                  <select name="opening_minute" value={form.opening_minute} onChange={handleChange} className="border p-2 rounded-lg">
                    {[0, 15, 30, 45].map(m => <option key={m}>{m.toString().padStart(2, "0")}</option>)}
                  </select>

                  <select name="opening_ampm" value={form.opening_ampm} onChange={handleChange} className="border p-2 rounded-lg">
                    <option>AM</option>
                    <option>PM</option>
                  </select>
                </div>

                {/* CLOSE */}
                <div className="flex gap-2">
                  <select name="closing_hour" value={form.closing_hour} onChange={handleChange} className="border p-2 rounded-lg">
                    {[...Array(12)].map((_, i) => <option key={i}>{i + 1}</option>)}
                  </select>

                  <select name="closing_minute" value={form.closing_minute} onChange={handleChange} className="border p-2 rounded-lg">
                    {[0, 15, 30, 45].map(m => <option key={m}>{m.toString().padStart(2, "0")}</option>)}
                  </select>

                  <select name="closing_ampm" value={form.closing_ampm} onChange={handleChange} className="border p-2 rounded-lg">
                    <option>AM</option>
                    <option>PM</option>
                  </select>
                </div>

              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button type="button" onClick={() => setOpenModal(false)} className="bg-gray-200 px-4 py-2 rounded-lg">
                  Cancel
                </button>

                <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg">
                  {isEdit ? "Update" : "Create"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}