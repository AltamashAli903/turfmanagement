import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  ClipboardList,
  MapPin
} from "lucide-react";
import { ChevronLeft, ChevronRight , Building2} from "lucide-react";

export default function Sidebar({ collapsed, setCollapsed }) {
  const location = useLocation();

  const menu = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <LayoutDashboard size={18} />
    },
    {
      name: "Slots",
      path: "/admin/slots",
      icon: <CalendarDays size={18} />
    },
    {
      name: "Bookings",
      path: "/admin/bookings",
      icon: <ClipboardList size={18} />
    },
    {
      name: "Turf",
      path: "/admin/turf",
      icon: <MapPin size={18} />
    }
  ];

  return (
    <div
      className={`${
        collapsed ? "w-20" : "w-64"
      } min-h-screen bg-emerald-100 border-r border-emerald-200 flex flex-col transition-all duration-300`}
    >

      {/* LOGO */}
      <div className="p-6 border-b border-emerald-100 flex items-center justify-between">

        {!collapsed && (
         
<div className="flex items-center gap-3">
  
  {/* ICON BADGE */}
   <div className="bg-emerald-600 text-white p-2 rounded-lg shadow-sm group-hover:scale-105 transition">
    <Building2 size={18} />
  </div>

  {/* TEXT */}
  <div>
    <h1 className="text-lg font-semibold text-gray-800 leading-tight">
      Turf Admin
    </h1>
    <p className="text-xs text-gray-500">
      Manage your business
    </p>
  </div>

</div>
        )}

        {/* COLLAPSE BUTTON */}
       <button
  onClick={() => setCollapsed(!collapsed)}
  className="p-2 rounded-lg bg-white shadow-sm border border-emerald-200 
             hover:bg-emerald-50 hover:shadow transition-all duration-200"
>
  {collapsed ? (
    <ChevronRight size={18} className="text-emerald-600" />
  ) : (
    <ChevronLeft size={18} className="text-emerald-600" />
  )}
</button>
      </div>

      {/* MENU */}
      <div className="flex-1 p-4 space-y-2">
        {menu.map((item, index) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center ${
                collapsed ? "justify-center" : "gap-3"
              } px-4 py-3 rounded-lg transition-all duration-200
                ${
                  isActive
                    ? "bg-emerald-500 text-white shadow-sm"
                    : "text-gray-700 hover:bg-emerald-200"
                }`}
            >
              {/* ICON */}
              <span
                className={`${
                  isActive ? "text-white" : "text-emerald-600"
                }`}
              >
                {item.icon}
              </span>

              {/* TEXT (HIDE WHEN COLLAPSED) */}
              {!collapsed && (
                <span className="font-medium">{item.name}</span>
              )}
            </Link>
          );
        })}
      </div>

      {/* FOOTER */}
      {!collapsed && (
        <div className="p-4 border-t border-emerald-100 text-xs text-emerald-600">
          © 2026 Turf System
        </div>
      )}
    </div>
  );
}