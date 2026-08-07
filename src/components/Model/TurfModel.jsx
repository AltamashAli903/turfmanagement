export default function TurfModal({
  open,
  isEdit,
  form,
  handleChange,
  handleSubmit,
  handleEnter,
  coverImage,
  setCoverImage,
  setOpenModal,
}) {
  if (!open) return null;

  const facilityOptions = [
    "Parking",
    "Washroom",
    "Drinking Water",
    "Cafeteria",
    "Locker",
  ];

  const toggleFacility = (facility) => {
    if (form.facilities.includes(facility)) {
      handleChange({
        target: {
          name: "facilities",
          value: form.facilities.filter((f) => f !== facility),
        },
      });
    } else {
      handleChange({
        target: {
          name: "facilities",
          value: [...form.facilities, facility],
        },
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="w-full max-w-2xl bg-white rounded-2xl p-6">

        <h2 className="text-xl font-semibold mb-4">
          {isEdit ? "Update Turf" : "Add Turf"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-2">

          <div className="grid grid-cols-2 gap-3">

            <div>
              <input
                name="turf_name"
                value={form.turf_name}
                onChange={handleChange}
                onKeyDown={handleEnter}
                placeholder="Turf Name"
                className="w-full border border-slate-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                required
              />
            </div>

            <div>
              <input
                name="sport_type"
                value={form.sport_type}
                onKeyDown={handleEnter}
                onChange={handleChange}
                placeholder="Sport Type"
                className="w-full border border-slate-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                required
              />
            </div>

            <div>
              <input
                name="location"
                value={form.location}
                onKeyDown={handleEnter}
                onChange={handleChange}
                placeholder="Location"
                className="w-full border border-slate-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                required
              />
            </div>

            <div>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                onKeyDown={handleEnter}
                placeholder="Address"
                className="w-full border border-slate-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Opening Time
              </label>
              <input
                type="time"
                name="opening_time"
                value={form.opening_time}
                onKeyDown={handleEnter}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Closing Time
              </label>
              <input
                type="time"
                name="closing_time"
                value={form.closing_time}
                onKeyDown={handleEnter}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
              />
            </div>


            <div >
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Turf Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setCoverImage(e.target.files[0])}
                onKeyDown={handleEnter}
                className="w-full border border-slate-300 rounded-lg px-3 py-2"

              />
            </div>


            <div>
              <label className="block text-sm font-medium text-slate-700">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                onKeyDown={handleEnter}
                rows={1}
                // placeholder="Description"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 mt-1 resize-none focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium mb-2">
                Facilities
              </label>

              <div className="flex flex-wrap gap-4">
                {facilityOptions.map((facility) => {
                  const isSelected = form.facilities.includes(facility);

                  return (
                    <button
                      key={facility}
                      type="button"
                      onClick={() => {
                        handleChange({
                          target: {
                            name: "facilities",
                            value: isSelected
                              ? form.facilities.filter((f) => f !== facility)
                              : [...form.facilities, facility],
                          },
                        });
                      }}
                      className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-200
                          ${isSelected
                          ? " border-emerald-600 text-emerald-900 shadow-sm"
                          : "bg-white border-slate-300 text-slate-700 hover:border-emerald-500"
                        }`}
                    >
                      {isSelected ? "✓ " : ""}
                      {facility}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          <div className="flex justify-end gap-3 mt-5">
            <button
              type="button"
              onClick={() => setOpenModal(false)}
              className="px-5 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 transition"
            >
              Cancel
            </button>

            <button
              className="px-5 py-1.5 rounded-lg bg-emerald-800 text-white hover:bg-emerald-700 transition"  >
              {isEdit ? "Update" : "Create"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}