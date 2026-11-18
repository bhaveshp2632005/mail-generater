import { PenLine, Reply, Wand2 } from "lucide-react";

export const TABS = [
  { id: "generate", label: "Generate Email", Icon: PenLine },
  { id: "reply", label: "Reply to Email", Icon: Reply },
  { id: "improve", label: "Improve Email", Icon: Wand2 },
];

// Folder-style tabs: the active tab shares the page's white background.
export default function Tabs({ active, onChange }) {
  return (
    <nav aria-label="Tools" className="mx-auto max-w-6xl px-4 sm:px-6">
      <ul className="-mb-px flex gap-1 overflow-x-auto" role="tablist">
        {TABS.map(({ id, label, Icon }) => {
          const selected = id === active;
          return (
            <li key={id} role="presentation" className="shrink-0">
              <button
                role="tab"
                id={`tab-${id}`}
                aria-selected={selected}
                aria-controls={`panel-${id}`}
                onClick={() => onChange(id)}
                className={`flex items-center gap-2 rounded-t-xl px-4 py-3 text-sm font-semibold transition-colors sm:px-5 sm:text-[15px] ${
                  selected ? "bg-white text-ink" : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon size={17} aria-hidden="true" />
                {label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
