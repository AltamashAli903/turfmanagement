import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";

export default function Dashboard() {
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
    <div className="p-6 bg-gradient-to-br from-green-50 to-white min-h-screen space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-green-700">Dashboard</h1>
        <p className="text-gray-500">Overview of your turf business</p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">

        <Card title="Turfs" value={stats.turfs} color="from-green-500 to-green-700" />
        <Card title="Slots" value={stats.slots} color="from-emerald-400 to-green-600" />
        <Card title="Active" value={stats.active} color="from-lime-400 to-green-500" />
        <Card title="Booked" value={stats.booked} color="from-red-400 to-red-600" />
        <Card title="Revenue" value={`₹${stats.revenue}`} color="from-yellow-400 to-orange-500" />

      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

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

        {/* BAR CHART */}
        <div className="bg-white p-5 rounded-xl shadow border border-green-100">
          <h2 className="font-semibold mb-4 text-green-700">
            Daily Slots Usage
          </h2>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="bookings" fill="#22c55e" />
            </BarChart>
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
  );
}

function Card({ title, value, color }) {
  return (
    <div className={`p-5 rounded-xl shadow text-white bg-gradient-to-r ${color} hover:scale-105 transition`}>

      <p className="text-sm opacity-90">{title}</p>
      <h2 className="text-2xl font-bold mt-1">{value || 0}</h2>

    </div>
  );
}