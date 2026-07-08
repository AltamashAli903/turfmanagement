import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  ClipboardList,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Building2,
} from "lucide-react";

export default function Sidebar({ collapsed, setCollapsed }) {
  const location = useLocation();

  const menu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Slots",
      path: "/slots",
      icon: <CalendarDays size={20} />,
    },
    {
      name: "Bookings",
      path: "/bookings",
      icon: <ClipboardList size={20} />,
    },
    {
      name: "Turf",
      path: "/turf",
      icon: <MapPin size={20} />,
    },
  ];

  return (
    <aside
      className={`${
        collapsed ? "w-24" : "w-72"
      } bg-white border-r border-slate-300 flex flex-col transition-all duration-300`}
    >
      {/* Logo */}
      <div className="h-20 px-6 border-b border-slate-300 flex items-center justify-between z-30 relative">

        {!collapsed && (
          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-xl bg-green-600 flex items-center justify-center shadow-sm">
              <Building2 size={22} className="text-white" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Turf Admin
              </h2>

              <p className="text-sm text-slate-500">
                Management System
              </p>
            </div>

          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-10 h-10 rounded-xl border border-slate-300 hover:bg-slate-100 transition flex items-center justify-center"
        >
          {collapsed ? (
            <ChevronRight className="text-slate-600" size={18} />
          ) : (
            <ChevronLeft className="text-slate-600" size={18} />
          )}
        </button>
      </div>

      {/* Menu */}
      <div className="flex-1 px-4 py-6 space-y-2">

        {menu.map((item) => {

          const active = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
              flex items-center
              ${collapsed ? "justify-center" : "gap-3"}
              h-12
              rounded-xl
              px-4
              transition-all

              ${
                active
                  ? "bg-green-50 text-green-700"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }
              `}
            >

              <span>{item.icon}</span>

              {!collapsed && (
                <span className="font-medium">
                  {item.name}
                </span>
              )}

            </Link>
          );
        })}
      </div>

      {/* Footer */}

      {!collapsed && (
        <div className="border-t border-slate-200 p-6">

          <div className="rounded-xl bg-slate-50 p-4">

            <p className="text-sm font-medium text-slate-800">
              Turf Booking System
            </p>

            <p className="text-xs text-slate-500 mt-1">
              Version 1.0
            </p>

          </div>

        </div>
      )}
    </aside>
  );
}