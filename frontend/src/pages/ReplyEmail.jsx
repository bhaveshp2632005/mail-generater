import { useState } from "react";
import { Segmented, TextArea, TextInput } from "../components/FormControls.jsx";
import FormActions from "../components/FormActions.jsx";
import ResultPanel from "../components/ResultPanel.jsx";
import useEmailTask from "../hooks/useEmailTask.js";
import { generateReply } from "../services/api.js";

const TONES = ["Formal", "Friendly", "Polite", "Persuasive"];
const LENGTHS = ["Short", "Medium", "Detailed"];
const INITIAL = { received: "", intent: "", tone: "Polite", length: "Medium", sender: "" };

export default function ReplyEmail() {
  const [form, setForm] = useState(INITIAL);
  const task = useEmailTask(generateReply);
  const set = (key) => (value) => setForm((f) => ({ ...f, [key]: value }));

  const submit = (e) => {
    e.preventDefault();
    task.run({
      received_email: form.received,
      reply_intent: form.intent,
      tone: form.tone,
      length: form.length,
      sender_name: form.sender.trim() || undefined,
    });
  };
  const reset = () => {
    setForm(INITIAL);
    task.clear();
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[5fr_7fr] lg:gap-10">
      <form onSubmit={submit} className="flex flex-col gap-5" aria-label="Reply to email">
        <TextArea
          label="Email you received"
          rows={8}
          value={form.received}
          onChange={set("received")}
          maxLength={8000}
          placeholder="Paste the full email here."
        />
        <TextArea
          label="What should your reply say?"
          rows={4}
          value={form.intent}
          onChange={set("intent")}
          maxLength={2000}
          placeholder="e.g. Accept the meeting on Monday at 10 am, and ask for the agenda in advance."
        />
        <Segmented label="Tone" value={form.tone} onChange={set("tone")} options={TONES} />
        <Segmented label="Length" value={form.length} onChange={set("length")} options={LENGTHS} />
        <TextInput label="Your name (optional)" value={form.sender} onChange={set("sender")} maxLength={100} placeholder="Aarav Patel" />
        <FormActions
          label="Generate reply"
          loading={task.loading}
          disabled={form.received.trim().length < 5 || form.intent.trim().length < 3}
          onReset={reset}
        />
      </form>

      <ResultPanel
        title="Your reply"
        emptyText="Paste the email you received and tell MailGenie what to say. The reply will appear here."
        {...task}
        onEdit={task.edit}
        onRegenerate={task.regenerate}
        onClear={task.clear}
      />
    </div>
  );
}
