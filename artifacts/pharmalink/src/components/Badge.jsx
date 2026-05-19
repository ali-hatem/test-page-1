const variants = {
  success: "bg-green-50 text-green-700 border border-green-200",
  warning: "bg-amber-50 text-amber-700 border border-amber-200",
  error: "bg-red-50 text-red-700 border border-red-200",
  info: "bg-blue-50 text-[#2563EB] border border-blue-200",
  teal: "bg-teal-50 text-teal-700 border border-teal-200",
  gray: "bg-gray-100 text-gray-600 border border-gray-200",
};

export function Badge({ children, variant = "gray", className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant] || variants.gray} ${className}`}
    >
      {children}
    </span>
  );
}
