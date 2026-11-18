import { useState } from "react";
import { Segmented, Select, TextArea, TextInput } from "../components/FormControls.jsx";
import FormActions from "../components/FormActions.jsx";
import ResultPanel from "../components/ResultPanel.jsx";
import useEmailTask from "../hooks/useEmailTask.js";
import { generateEmail } from "../services/api.js";

const CATEGORIES = ["Professional", "Academic", "Leave Application", "Job Application", "Follow-up", "Complaint", "Thank You", "General"];
const TONES = ["Formal", "Friendly", "Polite", "Persuasive"];
const LENGTHS = ["Short", "Medium", "Detailed"];
const INITIAL = { purpose: "", category: "Professional", tone: "Formal", length: "Medium", recipient: "", sender: "" };

export default function GenerateEmail() {
  const [form, setForm] = useState(INITIAL);
  const task = useEmailTask(generateEmail);
  const set = (key) => (value) => setForm((f) => ({ ...f, [key]: value }));

  const submit = (e) => {
    e.preventDefault();
    task.run({
      purpose: form.purpose,
      category: form.category,
      tone: form.tone,
      length: form.length,
      recipient_name: form.recipient.trim() || undefined,
      sender_name: form.sender.trim() || undefined,
    });
  };
  const reset = () => {
    setForm(INITIAL);
    task.clear();
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[5fr_7fr] lg:gap-10">
      <form onSubmit={submit} className="flex flex-col gap-5" aria-label="Generate email">
        <TextArea
          label="What is the email about?"
          rows={6}
          value={form.purpose}
          onChange={set("purpose")}
          maxLength={4000}
          placeholder="e.g. I need leave this Friday for a family function and can share my notes with the team."
          hint="Include the key facts: who, what, dates and anything the reader must do."
        />
        <Select label="Category" value={form.category} onChange={set("category")} options={CATEGORIES} />
        <Segmented label="Tone" value={form.tone} onChange={set("tone")} options={TONES} />
        <Segmented label="Length" value={form.length} onChange={set("length")} options={LENGTHS} />
        <div className="grid gap-5 sm:grid-cols-2">
          <TextInput label="Recipient name (optional)" value={form.recipient} onChange={set("recipient")} maxLength={100} placeholder="Ms. Sharma" />
          <TextInput label="Your name (optional)" value={form.sender} onChange={set("sender")} maxLength={100} placeholder="Aarav Patel" />
        </div>
        <FormActions label="Generate email" loading={task.loading} disabled={form.purpose.trim().length < 5} onReset={reset} />
      </form>

      <ResultPanel
        title="Your email"
        emptyText="Describe what you need to say and choose Generate email. Your subject line and message will appear here."
        {...task}
        onEdit={task.edit}
        onRegenerate={task.regenerate}
        onClear={task.clear}
      />
    </div>
  );
}
