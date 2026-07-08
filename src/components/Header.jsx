import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {
  LogOut,
  User,
  Bell
} from "lucide-react";

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/logout");
  };

  return (
    <header className="h-20 bg-white border-b border-slate-300 px-8 flex items-center justify-between z-40 relative">

      {/* LEFT */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">
          Admin Panel 
        </h1>

        <p className="text-sm text-slate-500 mt-0.2 pb-1">
          Manage your turf booking system
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* Notification */}
        <button className="relative h-11 w-11 rounded-xl border border-slate-200 hover:bg-slate-50 transition flex items-center justify-center">

          <Bell size={19} className="text-slate-600" />

          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-green-600"></span>

        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 px-4 py-2 shadow-sm">

          <div className="h-11 w-11 rounded-full bg-green-100 flex items-center justify-center">

            <User size={20} className="text-green-700" />

          </div>

          <div>

            <p className="text-sm font-semibold text-slate-800">
              Admin
            </p>

            <p className="text-xs text-slate-500">
              Administrator
            </p>

          </div>

        </div>

        {/* Logout */}

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2 text-red-500 hover:bg-red-50 transition"
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>

    </header>
  );
}