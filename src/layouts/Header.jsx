import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Logout?",
      text: "You will be logged out of your account",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#10b981",
      confirmButtonText: "Yes, Logout"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        navigate("/");
      }
    });
  };

  return (
    <header className="h-16 min-h-[64px] bg-emerald-100 border-b border-emerald-200 px-6 flex items-center justify-between shrink-0">

      {/* LEFT */}
      <div className="flex flex-col justify-center leading-tight">
        <h1 className="text-base font-semibold text-gray-800">
          Dashboard
        </h1>
        <p className="text-xs text-emerald-600">
          Manage your turf system
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* USER */}
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-lg">
          <User size={16} className="text-emerald-600" />
          <span className="text-sm font-medium text-gray-700">
            Admin
          </span>
        </div>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition"
        >
          <LogOut size={16} />
          Logout
        </button>

      </div>
    </header>
  );
}
