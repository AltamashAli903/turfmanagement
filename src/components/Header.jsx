import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {
  LogOut,
  User,
  Bell
} from "lucide-react";
import { Menu } from "lucide-react";

export default function Header({ setSidebarOpen }) {
  const navigate = useNavigate();

  const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
  };

  return (
  <header className="sticky top-0 z-40 flex h-16 sm:h-20 flex-shrink-0 items-center justify-between border-b border-slate-300 bg-white px-4 sm:px-6 lg:px-8">

<button
        onClick={() => setSidebarOpen(true)}
        className="mr-3 rounded-lg p-2 hover:bg-slate-100 lg:hidden"
    >
        <Menu size={24}/>
    </button>
    {/* LEFT */}
    <div className="min-w-0">
      

      <h1 className="text-lg sm:text-2xl font-semibold text-slate-900 truncate">
        Admin Panel
      </h1>

      <p className="hidden sm:block text-sm text-slate-500">
        Manage your turf booking system
      </p>
    </div>

    {/* RIGHT */}
    <div className="flex items-center gap-2 sm:gap-4">

      {/* Notification */}
      {/* <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 transition hover:bg-slate-50">

        <Bell
          size={18}
          className="text-slate-600"
        />

        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-green-600"></span>

      </button> */}

      {/* Profile */}
      <div className="flex items-center gap-2 sm:gap-3 rounded-xl px-1 sm:px-4 py-1 shadow-sm">

        <div className="flex h-5 w-6 items-center justify-center rounded-full bg-emerald-100">

          <User
            size={18}
            className="text-emerald-800"
          />

        </div>

        <div className="hidden md:block">

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
        className="flex items-center gap-2 rounded-xl border border-red-200 px-3 sm:px-4 py-2 text-red-500 transition hover:bg-red-50"
      >

        <LogOut size={18} />

        <span className="hidden sm:inline">
          Logout
        </span>

      </button>

    </div>

  </header>
);
}