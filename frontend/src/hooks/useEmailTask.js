import { useCallback, useRef, useState } from "react";

// Shared state for all three tools: run, regenerate, edit and clear a result.
export default function useEmailTask(apiFn) {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const lastPayload = useRef(null);

  const run = useCallback(
    async (payload) => {
      lastPayload.current = payload;
      setLoading(true);
      setError("");
      try {
        const data = await apiFn(payload);
        setResult({ subject: data.subject, body: data.body });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [apiFn]
  );

  const regenerate = useCallback(() => {
    if (lastPayload.current) run(lastPayload.current);
  }, [run]);

  const clear = useCallback(() => {
    lastPayload.current = null;
    setResult(null);
    setError("");
  }, []);

  const edit = useCallback((patch) => setResult((r) => (r ? { ...r, ...patch } : r)), []);

  return { result, loading, error, run, regenerate, clear, edit };
}
