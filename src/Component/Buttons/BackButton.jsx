import { useNavigate } from "react-router-dom";

export default function BackButton({ className = "", variant = "glass" }) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      aria-label="Back"
      className={[
        "grid h-10 w-10 place-items-center rounded-full",
        "transition active:scale-[0.98]",
        variant === "plain"
          ? "text-white"
          : "bg-green-soft/60 backdrop-blur hover:bg-green-soft/75",
        className,
      ].join(" ")}
    >
      <svg
        className="h-5 w-5 text-white"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M15 18l-6-6 6-6"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
