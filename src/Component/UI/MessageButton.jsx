// src/Component/UI/MessageButton.jsx
export default function MessageButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="grid h-10 w-10 place-items-center rounded-2xl bg-white/10 text-white/85 transition hover:bg-white/15 active:scale-[0.98]"
      aria-label="Messages"
    >
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
        <path
          d="M4.5 6.5h15A2 2 0 0 1 21.5 8.5v9A2 2 0 0 1 19.5 19.5h-15A2 2 0 0 1 2.5 17.5v-9A2 2 0 0 1 4.5 6.5Z"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path
          d="M3.5 8.2 12 13.2l8.5-5"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
