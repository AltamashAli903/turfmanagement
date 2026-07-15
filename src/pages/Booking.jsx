import { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function Bookings() { 
  const [collapsed, setCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
    //   const res = await getBookings();
    //   if (res.success) {
    //     setBookings(res.data);
    //   }
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
        <div className="flex min-h-screen bg-gray-100">
             <Sidebar
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            <div className="flex-1 flex flex-col">
                <Header 
                setSidebarOpen={setSidebarOpen}/>

                <main className="flex-1 bg-white pt-4 pl-8">
                    <div className="space-y-6">

                        {/* HEADER */}
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">
                                Bookings
                            </h1>
                            <p className="text-slate-500 ">
                                Manage and track all turf bookings
                            </p>
                        </div>

                        {/* FILTER CARD */}
                        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-wrap gap-4 items-center">

                            <input
                                type="text"
                                placeholder="Search by name or phone"
                                className="border border-slate-200 focus:ring-2 focus:ring-green-100 outline-none px-4 py-2 rounded-xl w-72 text-sm"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />

                            <select
                                className="border border-slate-200 focus:ring-2 focus:ring-green-100 outline-none px-4 py-2 rounded-xl text-sm"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="ALL">All Status</option>
                                <option value="CONFIRMED">Confirmed</option>
                                <option value="CANCELLED">Cancelled</option>
                            </select>

                            {/* Optional quick stats */}
                            <div className="ml-auto text-sm text-slate-500">
                                Total: <span className="font-semibold text-slate-800">{filtered.length}</span>
                            </div>

                        </div>

                        {/* TABLE WRAPPER */}
                        <div className="flex-1 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col overflow-hidden">

                            {loading ? (
                                <div className="flex-1 flex items-center justify-center text-slate-500">
                                    Loading bookings...
                                </div>
                            ) : filtered.length === 0 ? (
                                <div className="flex-1 flex items-center justify-center text-slate-400">
                                    No bookings found
                                </div>
                            ) : (
                                <div className="overflow-auto">

                                    <table className="w-full text-sm">

                                        {/* HEADER */}
                                        <thead className="bg-slate-50 text-slate-600 sticky top-0">
                                            <tr className="text-left">
                                                <th className="px-5 py-3 font-medium">User</th>
                                                <th className="px-5 py-3 font-medium">Phone</th>
                                                <th className="px-5 py-3 font-medium">Turf</th>
                                                <th className="px-5 py-3 font-medium">Slot</th>
                                                <th className="px-5 py-3 font-medium">Date</th>
                                                <th className="px-5 py-3 font-medium">Status</th>
                                            </tr>
                                        </thead>

                                        {/* BODY */}
                                        <tbody>

                                            {filtered.map((b) => (
                                                <tr
                                                    key={b.id}
                                                    className="border-t border-slate-100 hover:bg-slate-50 transition"
                                                >

                                                    <td className="px-5 py-4 font-medium text-slate-900">
                                                        {b.user_name}
                                                    </td>

                                                    <td className="px-5 py-4 text-slate-600">
                                                        {b.user_phone}
                                                    </td>

                                                    <td className="px-5 py-4 text-slate-700">
                                                        {b.turf_name}
                                                    </td>

                                                    <td className="px-5 py-4 text-slate-600">
                                                        {b.slot_start} - {b.slot_end}
                                                    </td>

                                                    <td className="px-5 py-4 text-slate-600">
                                                        {b.booking_date}
                                                    </td>

                                                    <td className="px-5 py-4">

                                                        <span
                                                            className={`px-3 py-1 rounded-full text-xs font-semibold
                                                                    ${b.status === "CONFIRMED"
                                                                    ? "bg-green-50 text-green-700"
                                                                    : "bg-red-50 text-red-600"
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
                </main>
            </div>
        </div>
    );
}