import { Loader2, RotateCcw, Sparkles } from "lucide-react";

export default function FormActions({ label, loading, disabled, onReset }) {
  return (
    <div className="flex flex-wrap items-center gap-3 pt-1">
      <button type="submit" className="btn-primary" disabled={loading || disabled}>
        {loading ? <Loader2 size={17} className="animate-spin" aria-hidden="true" /> : <Sparkles size={17} aria-hidden="true" />}
        {loading ? "Writing…" : label}
      </button>
      <button type="button" className="btn-quiet" onClick={onReset} disabled={loading}>
        <RotateCcw size={16} aria-hidden="true" />
        Reset form
      </button>
    </div>
  );
}
