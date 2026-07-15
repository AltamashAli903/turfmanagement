import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid } from "recharts";
import { Building2, CalendarDays, CheckCircle, ClipboardList, IndianRupee } from "lucide-react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
const [collapsed, setCollapsed] = useState(false);
const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({});
  const [chartData, setChartData] = useState([]);

  useEffect(() => {

    setStats({
      turfs: 3,
      slots: 24,
      active: 18,
      booked: 6,
      revenue: 12500
    });

    setChartData([
      { name: "Mon", bookings: 5 },
      { name: "Tue", bookings: 8 },
      { name: "Wed", bookings: 6 },
      { name: "Thu", bookings: 10 },
      { name: "Fri", bookings: 7 },
      { name: "Sat", bookings: 12 },
      { name: "Sun", bookings: 9 }
    ]);

  }, []);

  return (
   <div className="flex h-screen overflow-hidden bg-white">
      <Sidebar
    collapsed={collapsed}
    setCollapsed={setCollapsed}
    sidebarOpen={sidebarOpen}
    setSidebarOpen={setSidebarOpen}
/>

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
    setSidebarOpen={setSidebarOpen}
/>

        <main className="flex-1 overflow-y-auto bg-white pl-8 pt-4">
          <div className="space-y-6">

            {/* HEADER */}
            <div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Dashboard
                </h1>
                <p className="text-slate-500 text-sm mt-1">
                  Overall View of your turf's
                </p>
              </div>

            </div>

            {/* STATS */}
            <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-4 gap-5">

              <StatCard
                title="Turfs"
                value={stats.turfs}
                icon={<Building2 size={22} />}
              />

              <StatCard
                title="Slots"
                value={stats.slots}
                icon={<CalendarDays size={22} />}
              />

              {/* <StatCard
                title="Active"
                value={stats.active}
                icon={<CheckCircle size={22} />}
              /> */}

              <StatCard
                title="Booked"
                value={stats.booked}
                icon={<ClipboardList size={22} />}
              />

              <StatCard
                title="Revenue"
                value={`₹${stats.revenue}`}
                icon={<IndianRupee size={22} />}
              />

            </div>

            {/* CHARTS */}
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">

              {/* LINE CHART */}
              <div className="bg-white p-5 rounded-xl shadow border border-green-100">
                <h2 className="font-semibold mb-4 text-green-700">
                  Weekly Bookings
                </h2>

                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={chartData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="bookings" stroke="#16a34a" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

            </div>

            {/* ACTIVITY */}
            <div className="bg-white p-5 rounded-xl shadow border border-green-100">
              <h2 className="font-semibold mb-4 text-green-700">
                Recent Activity
              </h2>

              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex justify-between">
                  <span>✅ Slot booked</span>
                  <span className="text-green-600 font-medium">10:00 AM</span>
                </li>
                <li className="flex justify-between">
                  <span>💰 Payment received</span>
                  <span className="text-green-600 font-medium">₹500</span>
                </li>
                <li className="flex justify-between">
                  <span>➕ New slot created</span>
                  <span className="text-gray-400">Today</span>
                </li>
                <li className="flex justify-between">
                  <span>❌ Slot blocked</span>
                  <span className="text-red-500">Yesterday</span>
                </li>
              </ul>
            </div>

          </div>

        </main>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }) {

  return (

    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">

      <div className="flex justify-between items-center">

        <div>

          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-3">
            {value || 0}
          </h2>

        </div>

        <div className="h-12 w-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600">

          {icon}

        </div>

      </div>

    </div>

  );

}