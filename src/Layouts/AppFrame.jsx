export default function AppFrame({ children }) {
  return (
    <div className="min-h-dvh bg-neutral-100">
      {/* Outer padding grows on larger screens */}
      <div className="mx-auto min-h-dvh w-full max-width : 430px bg-white md:my-6 md:min-h-[calc(100dvh-3rem)] md:rounded-[28px] md:border md:border-neutral-200 md:shadow-sm lg:max-width 520px]">
        {children}
      </div>
    </div>
  );
}
