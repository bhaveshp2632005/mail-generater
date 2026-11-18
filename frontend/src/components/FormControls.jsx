import { useId } from "react";

export function Field({ label, hint, children, htmlFor }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold text-ink">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1.5 text-[13px] text-muted">{hint}</p>}
    </div>
  );
}

export function TextInput({ label, hint, value, onChange, ...rest }) {
  const id = useId();
  return (
    <Field label={label} hint={hint} htmlFor={id}>
      <input id={id} className="input" value={value} onChange={(e) => onChange(e.target.value)} {...rest} />
    </Field>
  );
}

export function TextArea({ label, hint, value, onChange, rows = 5, ...rest }) {
  const id = useId();
  return (
    <Field label={label} hint={hint} htmlFor={id}>
      <textarea
        id={id}
        rows={rows}
        className="input resize-y leading-relaxed"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        {...rest}
      />
    </Field>
  );
}

export function Select({ label, value, onChange, options }) {
  const id = useId();
  return (
    <Field label={label} htmlFor={id}>
      <select id={id} className="input" value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </Field>
  );
}

// One choice from a short list, shown as connected buttons.
export function Segmented({ label, value, onChange, options }) {
  return (
    <div>
      <span className="mb-1.5 block text-sm font-semibold text-ink">{label}</span>
      <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-1.5">
        {options.map((o) => {
          const active = o === value;
          return (
            <button
              key={o}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(o)}
              className={`rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors ${
                active
                  ? "border-cobalt bg-cobalt text-white"
                  : "border-rule bg-white text-ink hover:bg-sky"
              }`}
            >
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Several choices at once; at least one stays selected.
export function MultiChoice({ label, hint, values, onChange, options }) {
  const toggle = (o) => {
    if (values.includes(o)) {
      if (values.length > 1) onChange(values.filter((v) => v !== o));
    } else {
      onChange([...values, o]);
    }
  };
  return (
    <div>
      <span className="mb-1.5 block text-sm font-semibold text-ink">{label}</span>
      <div className="flex flex-wrap gap-1.5">
        {options.map((o) => {
          const active = values.includes(o);
          return (
            <button
              key={o}
              type="button"
              aria-pressed={active}
              onClick={() => toggle(o)}
              className={`rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors ${
                active
                  ? "border-cobalt bg-sky-deep text-ink"
                  : "border-rule bg-white text-ink hover:bg-sky"
              }`}
            >
              {o}
            </button>
          );
        })}
      </div>
      {hint && <p className="mt-1.5 text-[13px] text-muted">{hint}</p>}
    </div>
  );
}
