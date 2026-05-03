import { useEffect, useState } from "react";
// import { getBookings } from "../services/bookingService";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    filterData();
  }, [search, status, bookings]);

  const fetchBookings = async () => {
    try {
      const res = await getBookings();
      if (res.success) {
        setBookings(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filterData = () => {
    let data = bookings;

    if (search) {
      data = data.filter(
        (b) =>
          b.user_name.toLowerCase().includes(search.toLowerCase()) ||
          b.user_phone.includes(search)
      );
    }

    if (status !== "ALL") {
      data = data.filter((b) => b.status === status);
    }

    setFiltered(data);
  };

  return (
  <div className="p-6 h-[calc(100vh-64px)] flex flex-col space-y-6 bg-gradient-to-br from-green-50 to-white">

    {/* HEADER */}
    <div>
      <h1 className="text-2xl font-bold text-gray-800">Bookings</h1>
      <p className="text-sm text-gray-500">
        Manage and track all turf bookings
      </p>
    </div>

    {/* FILTER CARD */}
    <div className="bg-white border border-emerald-100 rounded-xl p-4 shadow-sm flex flex-wrap gap-4 items-center">
      <input
        type="text"
        placeholder="Search by name or phone"
        className="border border-emerald-100 focus:ring-2 focus:ring-emerald-200 outline-none px-4 py-2 rounded-lg w-64 text-sm"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        className="border border-emerald-100 focus:ring-2 focus:ring-emerald-200 outline-none px-4 py-2 rounded-lg text-sm"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="ALL">All Status</option>
        <option value="CONFIRMED">Confirmed</option>
        <option value="CANCELLED">Cancelled</option>
      </select>
    </div>

    {/* TABLE CONTAINER (KEY FIX) */}
    <div className="flex-1 bg-white border border-emerald-100 rounded-xl shadow-sm flex flex-col overflow-hidden">

      {loading ? (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          Loading bookings...
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-gray-400">
          No bookings found
        </div>
      ) : (
        <div className="overflow-auto">
          <table className="w-full text-sm">

            <thead className="bg-emerald-50 text-gray-600 sticky top-0">
              <tr className="text-left">
                <th className="px-4 py-3 font-medium">User</th>
                <th className="px-4 py-3 font-medium">Phone</th>
                <th className="px-4 py-3 font-medium">Turf</th>
                <th className="px-4 py-3 font-medium">Slot</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((b) => (
                <tr
                  key={b.id}
                  className="border-t hover:bg-emerald-50/40 transition"
                >
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {b.user_name}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {b.user_phone}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {b.turf_name}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {b.slot_start} - {b.slot_end}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {b.booking_date}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        b.status === "CONFIRMED"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
  </div>
);
}