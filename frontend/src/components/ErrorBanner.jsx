import { AlertCircle } from "lucide-react";

export default function ErrorBanner({ message }) {
  if (!message) return null;
  return (
    <div
      role="alert"
      className="flex items-start gap-2.5 rounded-lg border border-danger/30 bg-danger-wash px-4 py-3 text-sm text-danger"
    >
      <AlertCircle size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
      <p>{message}</p>
    </div>
  );
}
