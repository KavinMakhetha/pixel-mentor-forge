import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/Shell";

export const Route = createFileRoute("/generate")({
  head: () => ({
    meta: [
      { title: "Generate an exam — Scholaria" },
      { name: "description", content: "Create a marked exam from notes, PDFs or a topic in seconds." },
      { property: "og:title", content: "Generate an exam — Scholaria" },
      { property: "og:description", content: "Create a marked exam from notes, PDFs or a topic in seconds." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Generate,
});

const levels = ["Easy", "Medium", "Hard", "Expert"];
const types = ["Multiple Choice", "True/False", "Multiple Select", "Short Answer", "Essay", "Fill-in-the-Blank", "Matching", "Case Study"];
const field = "w-full rounded-xl bg-muted px-3 py-2.5 text-[13px] outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring";

function Generate() {
  const nav = useNavigate();
  const [level, setLevel] = useState("Medium");
  const [picked, setPicked] = useState<string[]>(["Multiple Choice", "Short Answer"]);
  const [file, setFile] = useState<string>();
  const [busy, setBusy] = useState(false);

  return (
    <Shell>
      <h1 className="rise mt-4 text-[22px] font-extrabold tracking-tight">New exam</h1>
      <p className="text-[12px] text-muted-foreground">Upload material or describe a topic.</p>

      <form
        className="rise mt-4 space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          setBusy(true);
          setTimeout(() => nav({ to: "/test" }), 900);
        }}
      >
        <label className="glass block cursor-pointer border border-dashed border-glass-line p-4 text-center">
          <input type="file" accept=".pdf,.doc,.docx,.ppt,.pptx,.txt" className="hidden" onChange={(e) => setFile(e.target.files?.[0]?.name)} />
          <p className="text-[13px] font-bold">{file ?? "Drop a PDF, Word or PowerPoint"}</p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">{file ? "Ready to use" : "or tap to choose a file"}</p>
        </label>

        <div className="glass grid grid-cols-2 gap-2 p-3.5">
          <input className={field} placeholder="Subject" defaultValue="Mathematics" />
          <input className={field} placeholder="Level" defaultValue="Grade 12" />
          <input className={`${field} col-span-2`} placeholder="Topic" defaultValue="Calculus" />
          <input className={field} type="number" placeholder="Questions" defaultValue={10} />
          <input className={field} type="number" placeholder="Minutes" defaultValue={15} />
        </div>

        <div className="glass p-3.5">
          <p className="text-[11px] font-medium text-muted-foreground">Difficulty</p>
          <div className="mt-2 grid grid-cols-4 gap-1.5">
            {levels.map((l) => (
              <button type="button" key={l} onClick={() => setLevel(l)} className={`rounded-lg py-1.5 text-[11px] font-bold ${level === l ? "bg-brand" : "bg-muted text-muted-foreground"}`}>{l}</button>
            ))}
          </div>
          <p className="mt-3 text-[11px] font-medium text-muted-foreground">Question types</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {types.map((t) => {
              const on = picked.includes(t);
              return (
                <button type="button" key={t} onClick={() => setPicked(on ? picked.filter((x) => x !== t) : [...picked, t])} className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${on ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}>{t}</button>
              );
            })}
          </div>
        </div>

        <button disabled={busy} className="bg-brand w-full rounded-2xl py-3 text-[14px] font-extrabold disabled:opacity-60">
          {busy ? "Generating…" : "✦ Generate exam"}
        </button>
      </form>
    </Shell>
  );
}
