export default function AppFrame({ children }) {
  return (
    <div className="min-h-dvh bg-neutral-100">
      <div
        className={[
          "mx-auto min-h-dvh w-full",
          "bg-app", // ✅ was bg-white
          "overflow-hidden", // ✅ prevents peeking on rounded corners
          "max-w-107.5",
          "md:my-6 md:min-h-[calc(100dvh-3rem)]",
          "md:rounded-[28px] md:border md:border-neutral-200 md:shadow-sm",
          "md:max-w-205 lg:max-w-5xl",
        ].join(" ")}
      >
        {children}
      </div>
    </div>
  );
}
