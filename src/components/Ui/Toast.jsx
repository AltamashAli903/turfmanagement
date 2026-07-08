import React, { useEffect } from "react";
import {
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  LogIn,
} from "lucide-react";

export default function Toast({
  message,
  type = "success",
  onClose,
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onClose]);

  const config = {
    success: {
      icon: <CheckCircle size={18} />,
      border: "border-green-600",
      iconColor: "text-green-600",
    },
    error: {
      icon: <AlertCircle size={18} />,
      border: "border-red-600",
      iconColor: "text-red-600",
    },
    warning: {
      icon: <AlertTriangle size={18} />,
      border: "border-yellow-500",
      iconColor: "text-yellow-600",
    },
    login: {
      icon: <LogIn size={18} />,
      border: "border-blue-600",
      iconColor: "text-blue-600",
    },
  };

  const current = config[type];

  return (
<div className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] animate-in fade-in zoom-in-95 duration-200">
      <div
        className={`
          min-w-[280px]
          bg-white/95
          backdrop-blur-md
          border-l-4
          ${current.border}
          rounded-xl
          shadow-xl
          px-4 py-3
          flex items-center gap-3
        `}
      >
        <span className={current.iconColor}>
          {current.icon}
        </span>

        <p className="text-gray-800 text-sm font-medium">
          {message}
        </p>
      </div>
    </div>
  );
}