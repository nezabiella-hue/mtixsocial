export default function ProfileButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="grid h-10 w-10 place-items-center rounded-2xl bg-white/10 text-white/85 transition hover:bg-white/15 active:scale-[0.98]"
      aria-label="Profile"
    >
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 12a4.5 4.5 0 1 0-4.5-4.5A4.5 4.5 0 0 0 12 12Z"
          stroke="currentColor"
          strokeWidth="2.2"
        />
        <path
          d="M4 20c1.7-4 14.3-4 16 0"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}
