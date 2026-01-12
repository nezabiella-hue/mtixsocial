import { Link } from "react-router-dom";

export default function MakeATakeButton({ to = "/makeatake" }) {
  return (
    <Link
      to={to}
      className="
        relative -mt-10
        grid h-16 w-16 place-items-center
        rounded-full
        bg-cta
        text-white
        shadow-[0_20px_50px_rgba(0,0,0,0.45)]
        transition
        hover:brightness-105
        active:scale-95
      "
      aria-label="Make a take"
    >
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none">
        <path
          d="M5 9h14v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V9Z"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path
          d="M5 9 7 4h14l-2 5H5Z"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path
          d="M12 13v6"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M9 16h6"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
    </Link>
  );
}
