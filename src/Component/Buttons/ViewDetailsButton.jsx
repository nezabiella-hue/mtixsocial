import { Link } from "react-router-dom";

export default function ViewDetailsButton({
  to,
  backgroundLocation,
  className = "",
  children = "View Details",
}) {
  return (
    <Link
      to={to}
      state={backgroundLocation ? { backgroundLocation } : undefined}
      className={[
        "rounded-full bg-white/85 px-4 py-2 text-xs font-bold text-slate-900 shadow-sm",
        "transition hover:bg-white active:scale-[0.99]",
        className,
      ].join(" ")}
    >
      {children}
    </Link>
  );
}
