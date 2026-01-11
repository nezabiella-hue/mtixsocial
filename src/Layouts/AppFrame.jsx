export default function AppFrame({ children }) {
  return (
    <div className="min-h-dvh bg-neutral-100">
      {/* Centered app shell */}
      <div
        className={[
          "mx-auto min-h-dvh w-full bg-white",
          "max-w-107.5", // iPhone max width
          "md:my-6 md:min-h-[calc(100dvh-3rem)]",
          "md:rounded-[28px] md:border md:border-neutral-200 md:shadow-sm",
          "lg:max-w-130", // 520px (canonical)
        ].join(" ")}
      >
        {children}
      </div>
    </div>
  );
}
