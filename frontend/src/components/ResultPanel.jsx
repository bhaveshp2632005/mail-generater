import { useEffect, useRef, useState } from "react";
import { Check, Copy, Eraser, Loader2, RefreshCw } from "lucide-react";
import ErrorBanner from "./ErrorBanner.jsx";

async function writeClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for browsers or contexts without the Clipboard API.
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  }
}

function CopyButton({ label, text, disabled }) {
  const [done, setDone] = useState(false);
  const timer = useRef();
  useEffect(() => () => clearTimeout(timer.current), []);
  const onClick = async () => {
    if (await writeClipboard(text)) {
      setDone(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setDone(false), 1800);
    }
  };
  return (
    <button type="button" className="btn-quiet" onClick={onClick} disabled={disabled}>
      {done ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
      {done ? "Copied" : label}
    </button>
  );
}

export default function ResultPanel({ title, emptyText, result, loading, error, onEdit, onRegenerate, onClear }) {
  const hasResult = Boolean(result);
  const body = result?.body ?? "";
  const words = body.trim() ? body.trim().split(/\s+/).length : 0;

  return (
    <section aria-labelledby="result-title" className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <h2 id="result-title" className="font-display text-xl font-bold">
          {title}
        </h2>
        {hasResult && <span className="text-[13px] text-muted">{words} words</span>}
      </div>

      <ErrorBanner message={error} />

      <div className="relative overflow-hidden rounded-xl border border-rule bg-white" aria-live="polite" aria-busy={loading}>
        <div className="absolute inset-y-0 left-0 w-1.5 bg-cobalt" aria-hidden="true" />

        {loading && !hasResult && (
          <div className="flex min-h-[22rem] flex-col gap-3 p-6 pl-8">
            <p className="flex items-center gap-2 text-sm font-medium text-muted">
              <Loader2 size={16} className="animate-spin" aria-hidden="true" /> Writing your draft…
            </p>
            <div className="mt-2 h-4 w-2/3 animate-pulse rounded bg-sky-deep" />
            <div className="h-3 w-full animate-pulse rounded bg-sky" />
            <div className="h-3 w-11/12 animate-pulse rounded bg-sky" />
            <div className="h-3 w-5/6 animate-pulse rounded bg-sky" />
            <div className="h-3 w-3/4 animate-pulse rounded bg-sky" />
          </div>
        )}

        {!loading && !hasResult && (
          <div className="grid min-h-[22rem] place-items-center p-6 pl-8 text-center">
            <p className="max-w-xs text-[15px] leading-relaxed text-muted">{emptyText}</p>
          </div>
        )}

        {hasResult && (
          <div className={loading ? "opacity-50" : ""}>
            <div className="border-b border-rule bg-sky/60 py-3 pl-8 pr-4">
              <label htmlFor="result-subject" className="text-[13px] font-semibold text-muted">
                Subject
              </label>
              <input
                id="result-subject"
                className="mt-0.5 block w-full bg-transparent text-[15px] font-semibold text-ink"
                value={result.subject}
                onChange={(e) => onEdit({ subject: e.target.value })}
              />
            </div>
            <div className="py-3 pl-8 pr-4">
              <label htmlFor="result-body" className="sr-only">
                Email body
              </label>
              <textarea
                id="result-body"
                className="block w-full resize-y bg-transparent text-[15px] leading-7 text-ink"
                rows={Math.min(24, Math.max(12, body.split("\n").length + 2))}
                value={body}
                onChange={(e) => onEdit({ body: e.target.value })}
              />
            </div>
          </div>
        )}
      </div>

      {hasResult && (
        <div className="flex flex-wrap gap-2">
          <CopyButton label="Copy subject" text={result.subject} disabled={loading} />
          <CopyButton label="Copy body" text={result.body} disabled={loading} />
          <CopyButton label="Copy both" text={`Subject: ${result.subject}\n\n${result.body}`} disabled={loading} />
          <button type="button" className="btn-quiet" onClick={onRegenerate} disabled={loading}>
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} aria-hidden="true" />
            Regenerate
          </button>
          <button type="button" className="btn-quiet" onClick={onClear} disabled={loading}>
            <Eraser size={16} aria-hidden="true" />
            Clear result
          </button>
        </div>
      )}

      <p className="text-[13px] text-muted">
        MailGenie only writes drafts. It never sends email, so check names, dates and facts before you send.
      </p>
    </section>
  );
}
