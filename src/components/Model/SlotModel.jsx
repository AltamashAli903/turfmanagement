export default function SlotModal({
  open,
  isEdit,
  form,
  errors,
  turfs,
  loading,
  handleChange,
  handleSubmit,
  setOpenModal,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">

        <h2 className="text-xl font-semibold mb-4">
          {isEdit ? "Update Slot" : "Create Slot"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <select
  name="turf_id"
  value={form.turf_id}
  onChange={handleChange}
  className="w-full rounded-xl border border-slate-300 px-3 py-2.5 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
>

                <option value="">Select Turf</option>
                {turfs.map((turf) => (
                  <option key={turf.id} value={turf.id}>
                    {turf.turf_name} ({turf.location})
                  </option>
                ))}
              </select>
              {errors.turf_id && (
                <p className="text-red-500 text-xs mt-0.5">
                  {errors.turf_id}
                </p>
              )}


              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Start Time
                  </label>
                  <input
                    type="time"
                    name="slot_start"
                    value={form.slot_start}
                    onChange={handleChange}
                    className="w-full border border-slate-200 px-3 py-2 rounded-xl"
                  />
                  {errors.slot_start && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.slot_start}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    End Time
                  </label>
                  <input
                    type="time"
                    name="slot_end"
                    value={form.slot_end}
                    onChange={handleChange}
                    className="w-full border border-slate-200 px-3 py-2 rounded-xl"
                  />
                  {errors.slot_end && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.slot_end}
                    </p>
                  )}
                </div>
              </div>
              <input
                name="price"
                placeholder="Price"
                value={form.price}
                onChange={handleChange}
                className="w-full border border-slate-200 px-3 py-2 rounded-xl"
              />
              {errors.price && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.price}
                </p>
              )}

          <div className="flex justify-end gap-3 mt-5">
            <button
              type="button"
              onClick={() => setOpenModal(false)}
              className="px-4 py-2 rounded-xl bg-white border text-slate-700"
            >
              Cancel
            </button>

            <button disabled={loading}
            className="px-4 py-2 rounded-xl bg-emerald-800 text-white hover:bg-emerald-700 transition">
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
  );
}