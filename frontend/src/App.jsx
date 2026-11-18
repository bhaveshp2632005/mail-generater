import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Tabs from "./components/Tabs.jsx";
import GenerateEmail from "./pages/GenerateEmail.jsx";
import ReplyEmail from "./pages/ReplyEmail.jsx";
import ImproveEmail from "./pages/ImproveEmail.jsx";

const PAGES = { generate: GenerateEmail, reply: ReplyEmail, improve: ImproveEmail };

export default function App() {
  const [active, setActive] = useState("generate");

  return (
    <div className="min-h-screen">
      <header className="bg-ink">
        <Navbar />
        <Hero />
        <Tabs active={active} onChange={setActive} />
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        {/* Every page stays mounted so form text and results survive tab switches. */}
        {Object.entries(PAGES).map(([id, Page]) => (
          <div key={id} id={`panel-${id}`} role="tabpanel" aria-labelledby={`tab-${id}`} hidden={id !== active}>
            <Page />
          </div>
        ))}
      </main>

      <footer className="border-t border-rule">
        <p className="mx-auto max-w-6xl px-4 py-6 text-[13px] text-muted sm:px-6">
          MailGenie AI uses the Groq API to write drafts. Drafts can contain mistakes, so always review before sending.
        </p>
      </footer>
    </div>
  );
}
