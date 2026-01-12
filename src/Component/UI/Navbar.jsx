import ProfileButton from "./ProfileButton";
import MakeATakeButton from "./MakeATakeButton";
import MessageButton from "./MessageButton";

export default function Navbar({
  onProfileClick,
  onMessageClick,
  makeATakeTo = "/makeatake",
}) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-130 px-4 pb-4 md:max-w-190 md:px-6">
        <div className="relative rounded-[28px] border border-white/10 bg-black/35 px-6 py-4 backdrop-blur">
          <div className="flex items-center justify-between">
            <ProfileButton onClick={onProfileClick} />

            <MakeATakeButton to={makeATakeTo} />

            <MessageButton onClick={onMessageClick} />
          </div>

          {/* iOS safe area */}
          <div className="h-[env(safe-area-inset-bottom)]" />
        </div>
      </div>
    </nav>
  );
}
