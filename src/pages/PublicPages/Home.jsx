import { useEffect, useState } from "react";
import { getOwnerTurfs } from "../services/turfService";
import { MapPin, Clock } from "lucide-react";
import { formatTo12Hour } from "../utils/timeFormat";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [turfs, setTurfs] = useState([]);
  const navigate = useNavigate();

  const fetchTurfs = async () => {
    try {
      const res = await getOwnerTurfs();
      setTurfs(res?.data?.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTurfs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* NAVBAR */}
      <div className="flex justify-between items-center px-6 py-4 bg-white shadow-sm sticky top-0 z-50">
        <h1 className="text-lg font-semibold text-gray-800">
          Turf Booking
        </h1>

        <button
          onClick={() => navigate("/login")}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm"
        >
          Admin Login
        </button>
      </div>

      {/* HERO */}
      <div className="px-6 py-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
          Book Your Turf Easily ⚡
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto">
          Find nearby turfs, check availability, and book slots instantly.
        </p>
      </div>

      {/* TURF GRID */}
      <div className="px-6 pb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

        {turfs.length > 0 ? (
          turfs.map((turf) => (
            <div
              key={turf.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-5 flex flex-col justify-between"
            >

              {/* TOP */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {turf.turf_name}
                </h3>

                <div className="flex items-center gap-1 text-gray-500 text-sm mb-2">
                  <MapPin size={14} />
                  {turf.location}
                </div>

                <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
                  <Clock size={14} />
                  {formatTo12Hour(turf.opening_time)} -{" "}
                  {formatTo12Hour(turf.closing_time)}
                </div>

                <p className="text-xs text-gray-400">
                  {turf.sport_type}
                </p>
              </div>

              {/* BUTTON */}
              <button
                onClick={() => navigate(`/turf/${turf.id}`)}
                className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg text-sm"
              >
                View Slots
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-400 py-20">
            No Turfs Available 🚫
          </div>
        )}

      </div>

      {/* FOOTER */}
      <div className="text-center text-xs text-gray-400 py-6">
        © 2026 Turf Booking Platform
      </div>

    </div>
  );
}