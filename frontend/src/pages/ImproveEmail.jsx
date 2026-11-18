import { useState } from "react";
import { MultiChoice, TextArea } from "../components/FormControls.jsx";
import FormActions from "../components/FormActions.jsx";
import ResultPanel from "../components/ResultPanel.jsx";
import useEmailTask from "../hooks/useEmailTask.js";
import { improveEmail } from "../services/api.js";

const GOALS = ["Fix grammar", "Make professional", "Make shorter", "Make clearer", "Make friendlier"];
const INITIAL = { email: "", goals: ["Fix grammar", "Make professional"] };

export default function ImproveEmail() {
  const [form, setForm] = useState(INITIAL);
  const task = useEmailTask(improveEmail);

  const submit = (e) => {
    e.preventDefault();
    task.run({ email: form.email, goals: form.goals });
  };
  const reset = () => {
    setForm(INITIAL);
    task.clear();
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[5fr_7fr] lg:gap-10">
      <form onSubmit={submit} className="flex flex-col gap-5" aria-label="Improve email">
        <TextArea
          label="Your email"
          rows={10}
          value={form.email}
          onChange={(email) => setForm((f) => ({ ...f, email }))}
          maxLength={8000}
          placeholder="Paste the email you want to improve."
        />
        <MultiChoice
          label="What should change?"
          values={form.goals}
          onChange={(goals) => setForm((f) => ({ ...f, goals }))}
          options={GOALS}
          hint="Pick one or more. The original meaning is always kept."
        />
        <FormActions label="Improve email" loading={task.loading} disabled={form.email.trim().length < 5} onReset={reset} />
      </form>

      <ResultPanel
        title="Improved email"
        emptyText="Paste an email and choose what to improve. The rewritten version will appear here, ready to edit."
        {...task}
        onEdit={task.edit}
        onRegenerate={task.regenerate}
        onClear={task.clear}
      />
    </div>
  );
}
