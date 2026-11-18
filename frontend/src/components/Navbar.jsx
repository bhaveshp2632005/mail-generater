import { Mail } from "lucide-react";

export default function Navbar() {
  return (
    <div className="mx-auto flex max-w-6xl items-center gap-2.5 px-4 pt-5 sm:px-6">
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-white text-cobalt" aria-hidden="true">
        <Mail size={20} strokeWidth={2.25} />
      </span>
      <span className="font-display text-lg font-bold text-white">MailGenie AI</span>
    </div>
  );
}
