import React from "react";

const alertStyles = {
  success: {
    icon: "✅",
    color: "emerald",
    button: "bg-emerald-600 hover:bg-emerald-700",
    ring: "ring-emerald-500",
  },
  error: {
    icon: "❌",
    color: "red",
    button: "bg-red-600 hover:bg-red-700",
    ring: "ring-red-500",
  },
  warning: {
    icon: "⚠️",
    color: "amber",
    button: "bg-amber-500 hover:bg-amber-600",
    ring: "ring-amber-500",
  },
  info: {
    icon: "ℹ️",
    color: "blue",
    button: "bg-blue-600 hover:bg-blue-700",
    ring: "ring-blue-500",
  },
  delete: {
    icon: "🚮",
    color: "red",
    button: "bg-red-600 hover:bg-red-700",
    ring: "ring-red-500",
  },
  confirm: {
    icon: "❓",
    color: "indigo",
    button: "bg-indigo-600 hover:bg-indigo-700",
    ring: "ring-indigo-500",
  },
};

export default function CustomizedAlert({
  open,
  type = "success",
  title,
  message,
  confirmText = "OK",
  cancelText = "Cancel",
  showCancel = false,
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  const style = alertStyles[type] || alertStyles.success;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div
        className={`w-full max-w-md rounded-2xl bg-white shadow-2xl ring-2 ${style.ring} animate-[fadeIn_.2s_ease]`}
      >
        {/* Header */}
        <div className="flex flex-col items-center p-6">
          <div className="text-6xl mb-3">{style.icon}</div>

          <h2 className="text-2xl font-bold text-gray-800 text-center">
            {title}
          </h2>

          <p className="mt-3 text-center text-gray-600">
            {message}
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t p-4">
          {showCancel && (
            <button
              onClick={onCancel}
              className="rounded-lg border border-gray-300 px-5 py-2 font-medium transition hover:bg-gray-100"
            >
              {cancelText}
            </button>
          )}

          <button
            onClick={onConfirm}
            className={`rounded-lg px-5 py-2 text-white font-medium transition ${style.button}`}
          >
            {confirmText}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn{
          from{
            opacity:0;
            transform:scale(.9);
          }
          to{
            opacity:1;
            transform:scale(1);
          }
        }
      `}</style>
    </div>
  );
}