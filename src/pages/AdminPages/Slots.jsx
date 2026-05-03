import { useEffect, useState } from "react";
import {
  createSlot,
  updateSlot,
  getTurfSlots,
  deleteSlot,
  updateAvailability
} from "../../services/slotService";
import { getOwnerTurfs } from "../../services/turfService"; 
import Swal from "sweetalert2";
import { getOwnerId } from "../../utils/auth";

export default function Slots() {
  const [form, setForm] = useState({
    turf_id: "",
    slot_start: "",
    slot_end: "",
    price: ""
  });

  const [slots, setSlots] = useState([]);
  const [turfs, setTurfs] = useState([]); // ✅ NEW STATE
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedSlotId, setSelectedSlotId] = useState(null);

  const formatTime = (time) => time?.slice(0, 5);

  // ✅ FETCH SLOTS
  const fetchSlots = async () => {
    const owner_id = getOwnerId();
    const res = await getTurfSlots({ owner_id });
    setSlots(res.data || []);
  };

  // ✅ FETCH TURFS FOR DROPDOWN
  const fetchTurfs = async () => {
    try {
      const res = await getOwnerTurfs();
      setTurfs(res?.data?.data || []);
    } catch (err) {
      console.error("TURF FETCH ERROR ❌", err);
    }
  };

  useEffect(() => {
    fetchSlots();
    fetchTurfs(); // ✅ IMPORTANT
  }, []);

  // ✅ INPUT CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ EDIT SLOT
  const handleEdit = (slot) => {
    setForm({
      turf_id: slot.turf_id,
      slot_start: slot.slot_start,
      slot_end: slot.slot_end,
      price: slot.price
    });

    setSelectedSlotId(slot.id);
    setIsEdit(true);
    setOpenModal(true);
  };

  // ✅ SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let res;

      if (isEdit) {
        res = await updateSlot({
          ...form,
          slot_id: selectedSlotId
        });
      } else {
        res = await createSlot(form);
      }

      const data = res?.data?.[0];
      const isSuccess = data?.success == 1;

      Swal.fire({
        title: isSuccess ? "Success" : "Error",
        text: data?.message,
        icon: isSuccess ? "success" : "warning"
      });

      if (isSuccess) {
        setForm({
          turf_id: "",
          slot_start: "",
          slot_end: "",
          price: ""
        });

        setSelectedSlotId(null);
        setIsEdit(false);
        setOpenModal(false);
        fetchSlots();
      }

    } catch {
      Swal.fire("Error", "Something went wrong", "error");
    }

    setLoading(false);
  };

  // ✅ DELETE
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete Slot?",
      icon: "warning",
      showCancelButton: true
    });

    if (!confirm.isConfirmed) return;

    await deleteSlot(id);
    fetchSlots();
  };

  // ✅ TOGGLE
  const toggleAvailability = async (slot) => {
    await updateAvailability({
      slot_id: slot.id,
      is_available: slot.is_available == 0 ? 1 : 0
    });
    fetchSlots();
  };

  return (
    <div className="p-6 flex-1 flex flex-col space-y-6 bg-gradient-to-br from-green-50 to-white">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Slot Management
          </h1>
          <p className="text-sm text-gray-500">
            Create and manage turf time slots
          </p>
        </div>

        <button
          onClick={() => {
            setIsEdit(false);
            setForm({
              turf_id: "",
              slot_start: "",
              slot_end: "",
              price: ""
            });
            setOpenModal(true);
          }}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg shadow-sm text-sm"
        >
          + Add Slot
        </button>
      </div>

      {/* TABLE */}
     <div className="flex-1 bg-white border border-emerald-100 rounded-xl shadow-sm overflow-hidden">

  <div className="overflow-auto">
    <table className="w-full text-sm">

      {/* HEADER */}
      <thead className="bg-emerald-100 text-gray-700">
        <tr>
          <th className="px-6 py-4 text-left font-semibold">Turf</th>
          <th className="px-6 py-4 text-left font-semibold">Location</th>
          <th className="px-6 py-4 text-left font-semibold">Start</th>
          <th className="px-6 py-4 text-left font-semibold">End</th>
          <th className="px-6 py-4 text-left font-semibold">Price</th>
          <th className="px-6 py-4 text-center font-semibold">Status</th>
          <th className="px-6 py-4 text-center font-semibold">Actions</th>
        </tr>
      </thead>

      {/* BODY */}
      <tbody className="divide-y">

        {slots.map((slot) => (
          <tr
            key={slot.id}
            className="hover:bg-emerald-50 transition"
          >

            {/* TURF */}
            <td className="px-6 py-4 font-medium text-gray-800">
              {slot.turf_name}
            </td>

            {/* LOCATION */}
            <td className="px-6 py-4 text-gray-600">
              {slot.location}
            </td>

            {/* START */}
            <td className="px-6 py-4 text-gray-700">
              {formatTime(slot.slot_start)}
            </td>

            {/* END */}
            <td className="px-6 py-4 text-gray-700">
              {formatTime(slot.slot_end)}
            </td>

            {/* PRICE */}
            <td className="px-6 py-4 font-semibold text-emerald-700">
              ₹{slot.price}
            </td>

            {/* STATUS */}
            <td className="px-6 py-4 text-center">
              <span
                className={`px-3 py-1 text-xs rounded-full font-medium ${
                  slot.is_available == 0
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {slot.is_available == 0 ? "Available" : "Blocked"}
              </span>
            </td>

            {/* ACTIONS */}
            <td className="px-6 py-4">
              <div className="flex justify-center gap-2">

                <button
                  onClick={() => handleEdit(slot)}
                  className="px-3 py-1.5 rounded-md bg-green-800 hover:bg-green-900 text-white text-xs font-medium"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(slot.id)}
                  className="px-3 py-1.5 rounded-md bg-green-800 hover:bg-green-900 text-white text-xs font-medium"
                >
                  Delete
                </button>

              </div>
            </td>

          </tr>
        ))}

      </tbody>
    </table>
  </div>
</div>

      {/* MODAL */}
      {openModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

          <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">

            <h2 className="text-lg font-semibold mb-4">
              {isEdit ? "Update Slot" : "Create Slot"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* ✅ TURF DROPDOWN */}
              <select
                name="turf_id"
                value={form.turf_id}
                onChange={handleChange}
                className="w-full border border-emerald-100 px-3 py-2 rounded-lg"
                required
              >
                <option value="">Select Turf</option>
                {turfs.map((turf) => (
                  <option key={turf.id} value={turf.id}>
                    {turf.turf_name} ({turf.location})
                  </option>
                ))}
              </select>

              {/* TIME */}
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="time"
                  name="slot_start"
                  value={form.slot_start}
                  onChange={handleChange}
                  className="border px-3 py-2 rounded-lg"
                  required
                />

                <input
                  type="time"
                  name="slot_end"
                  value={form.slot_end}
                  onChange={handleChange}
                  className="border px-3 py-2 rounded-lg"
                  required
                />
              </div>

              {/* PRICE */}
              <input
                name="price"
                placeholder="Price"
                value={form.price}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg"
                required
              />

              {/* ACTIONS */}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setOpenModal(false)}
                  className="bg-gray-200 px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>

                <button
                  disabled={loading}
                  className="bg-emerald-600 text-white px-4 py-2 rounded-lg"
                >
                  {loading
                    ? "Processing..."
                    : isEdit
                    ? "Update"
                    : "Create"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}