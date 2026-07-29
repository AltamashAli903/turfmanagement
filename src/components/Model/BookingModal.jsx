import { useEffect, useState } from "react";
import API from "../../api/axios";
import { formatTo12Hour } from "../../utils/TimeFormat";
export default function BookingModal({
    open,
    onClose,
    fetchBookings,
    setToast,
    handleEnter
}) {

    const [turfs, setTurfs] = useState([]);
    const [saving, setSaving] = useState(false);
    const [slots, setSlots] = useState([]);
    const [loadingSlots, setLoadingSlots] = useState(false);
    const [form, setForm] = useState({

        turf_id: "",

        slot_id: "",

        booking_date: "",

        customer_name: "",

        customer_phone: "",

        payment_status: "paid"

    });

    useEffect(() => {

        if (open) {

            loadTurfs();

        }

    }, [open]);

    useEffect(() => {

        if (form.turf_id && form.booking_date) {

            loadSlots();

        }

    }, [form.turf_id, form.booking_date]);

    const loadTurfs = async () => {

        const res = await API.get("/turf/list");

        if (res.data.success) {

            setTurfs(res.data.data);

        }

    }
    const resetForm = () => {
        setForm({
            turf_id: "",
            slot_id: "",
            booking_date: "",
            customer_name: "",
            customer_phone: "",
            payment_status: "paid",
        });

        setSlots([]);
    };

    const loadSlots = async () => {

        try {

            setLoadingSlots(true);

            const res = await API.post(
                "/booking/available-slots",
                {
                    turf_id: form.turf_id,
                    booking_date: form.booking_date,
                }
            );

            if (res.data.success) {

                setSlots(res.data.data);

            }

        } finally {

            setLoadingSlots(false);

        }

    };
    const saveBooking = async () => {
        try {
          if (
    !form.customer_name ||
    !form.customer_phone ||
    !form.turf_id ||
    !form.booking_date ||
    !form.slot_id
) {
    setToast({
        type: "warning",
        message: "Please fill all fields."
    });
    return;
}

if (!/^[6-9]\d{9}$/.test(form.customer_phone)) {
    setToast({
        type: "warning",
        message: "Enter a valid mobile number."
    });
    return;
}

            setSaving(true);

            const res = await API.post("/booking/create", form);

            if (res.data.success) {

                fetchBookings();
                resetForm();
                onClose();
                setToast({
    type: "success",
    message: "Booking created successfully."
});

            }

        } catch (err) {

           setToast({
        type: "error",
        message:
            err.response?.data?.message ||
            "Unable to create booking."
    });

        } finally {

            setSaving(false);

        }
    };

    if (!open) return null;

   return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
    <div className="w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">

      {/* Header */}
      <div className="border-b border-slate-200 bg-slate-50 px-8 py-6">
        <h2 className="text-2xl font-bold text-slate-800">
          Create Booking
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Select a turf, choose an available slot and create a booking.
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          saveBooking();
        }}
        className="p-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Customer Name */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Customer Name
            </label>

            <input
              placeholder="Enter customer name"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition"
              value={form.customer_name}
              onChange={(e) =>
                setForm({
                  ...form,
                  customer_name: e.target.value,
                })
              }
              onKeyDown={handleEnter}
            />
          </div>

          {/* Phone */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Phone Number
            </label>

            <input
              placeholder="Enter phone number"
              maxLength={10}
              inputMode="numeric"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition "
              value={form.customer_phone}
              onChange={(e) =>
                setForm({
                  ...form,
                  customer_phone: e.target.value.replace(/\D/g, ""),
                })
              }
              onKeyDown={handleEnter}
            />
          </div>

          {/* Turf */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Turf
            </label>

            <select
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none "
              value={form.turf_id}
              onKeyDown={handleEnter}
              onChange={(e) =>
                setForm({
                  ...form,
                  turf_id: e.target.value,
                  slot_id: "",
                })
              }
            >
              <option value="">Select Turf</option>

              {turfs.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.turf_name}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Booking Date
            </label>

            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition"
              value={form.booking_date}
              onKeyDown={handleEnter}
              onChange={(e) =>
                setForm({
                  ...form,
                  booking_date: e.target.value,
                  slot_id: "",
                })
              }
            />
          </div>

          {/* Slot */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Available Slot
            </label>

            <select
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition "
              value={form.slot_id}
              onKeyDown={handleEnter}
              onChange={(e) =>
                setForm({
                  ...form,
                  slot_id: e.target.value,
                })
              }
            >
              <option value="">Select Slot</option>

              {slots.map((s) => (
                <option key={s.id} value={s.id}>
                  {formatTo12Hour(s.slot_start)} -{" "}
                  {formatTo12Hour(s.slot_end)}
                </option>
              ))}
            </select>

            {loadingSlots && (
              <div className="mt-2 flex items-center gap-2 text-sm text-emerald-600">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-emerald-600 border-t-transparent"></div>
                Loading available slots...
              </div>
            )}

            {!loadingSlots &&
              form.booking_date &&
              slots.length === 0 && (
                <div className="mt-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                  No slots available for the selected date.
                </div>
              )}
          </div>

          {/* Payment */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Payment Status
            </label>

            <select
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition"
              value={form.payment_status}
              onChange={(e) =>
                setForm({
                  ...form,
                  payment_status: e.target.value,
                })
              }
              onKeyDown={handleEnter}
            >
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 flex justify-end gap-3 border-t border-slate-200 pt-6">
          <button
            type="button"
            onClick={() => {
              resetForm();
              onClose();
            }}
            className="rounded-xl border border-slate-300 px-5 py-3 text-slate-700 transition hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving || loadingSlots}
            className="rounded-xl bg-emerald-600 px-6 py-3 font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Booking"}
          </button>
        </div>
      </form>
    </div>
  </div>
);

}