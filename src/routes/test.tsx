import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/Shell";
import { sampleExam } from "@/lib/data";

export const Route = createFileRoute("/test")({
  head: () => ({
    meta: [
      { title: "Take a test — Scholaria" },
      { name: "description", content: "Answer questions and get instant, AI-assisted marking." },
      { property: "og:title", content: "Take a test — Scholaria" },
      { property: "og:description", content: "Answer questions and get instant, AI-assisted marking." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: TakeTest,
});

function TakeTest() {
  const nav = useNavigate();
  const exam = sampleExam;
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const q = exam.questions[i];
  const last = i === exam.questions.length - 1;

  return (
    <Shell>
      <div className="rise mt-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/80">{exam.subject} · {exam.minutes} min</p>
        <h1 className="mt-1 text-[22px] font-extrabold tracking-tight">{exam.title}</h1>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
          <div className="bg-bar h-full rounded-full transition-all" style={{ width: `${((i + 1) / exam.questions.length) * 100}%` }} />
        </div>
      </div>

      <div key={q.id} className="rise glass mt-4 p-4">
        <div className="flex justify-between text-[10px] font-bold text-muted-foreground">
          <span>Question {i + 1} of {exam.questions.length}</span>
          <span>{q.marks} marks</span>
        </div>
        <p className="mt-2 text-[15px] font-bold leading-snug">{q.prompt}</p>
        {q.options ? (
          <div className="mt-3 space-y-2">
            {q.options.map((o) => (
              <button key={o} onClick={() => setAnswers({ ...answers, [q.id]: o })} className={`w-full rounded-xl px-3 py-2.5 text-left text-[13px] font-medium ${answers[q.id] === o ? "bg-primary/20 text-primary outline outline-1 outline-primary/50" : "bg-muted"}`}>{o}</button>
            ))}
          </div>
        ) : (
          <textarea rows={4} value={answers[q.id] ?? ""} onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })} placeholder="Type your answer…" className="mt-3 w-full rounded-xl bg-muted p-3 text-[13px] outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring" />
        )}
      </div>

      <div className="mt-4 flex gap-3">
        <button disabled={i === 0} onClick={() => setI(i - 1)} className="glass flex-1 py-3 text-[13px] font-bold disabled:opacity-40">Back</button>
        <button
          onClick={() => {
            if (last) {
              sessionStorage.setItem("answers", JSON.stringify(answers));
              nav({ to: "/results" });
            } else setI(i + 1);
          }}
          className="bg-brand flex-1 rounded-2xl py-3 text-[13px] font-extrabold"
        >
          {last ? "Submit" : "Next"}
        </button>
      </div>
    </Shell>
  );
}
