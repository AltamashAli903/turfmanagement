export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) {
  const variants = {
    primary:
      "bg-green-600 text-white hover:bg-green-700",

    secondary:
      "bg-white text-slate-900 hover:bg-slate-100",

    outline:
      "border border-white text-white hover:bg-white hover:text-slate-900",

    dark:
      "bg-slate-900 text-white hover:bg-slate-800",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",

    md: "px-6 py-3",

    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      className={`
        rounded-xl
        font-semibold
        transition-all
        duration-300
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}