import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Shell, Bar } from "@/components/Shell";
import { sampleExam, markQuestion, grade } from "@/lib/data";

export const Route = createFileRoute("/results")({
  head: () => ({
    meta: [
      { title: "Your results — Scholaria" },
      { name: "description", content: "Marks, grade, topic breakdown and personalised study recommendations." },
      { property: "og:title", content: "Your results — Scholaria" },
      { property: "og:description", content: "Marks, grade, topic breakdown and personalised study recommendations." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Results,
});

function Results() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  useEffect(() => {
    setAnswers(JSON.parse(sessionStorage.getItem("answers") ?? "{}"));
  }, []);

  const marked = sampleExam.questions.map((q) => ({ q, ...markQuestion(q, answers[q.id]) }));
  const total = marked.reduce((s, m) => s + m.q.marks, 0);
  const got = marked.reduce((s, m) => s + m.awarded, 0);
  const pct = Math.round((got / total) * 100);
  const topics = Array.from(new Set(marked.map((m) => m.q.topic))).map((t) => {
    const ms = marked.filter((m) => m.q.topic === t);
    const tot = ms.reduce((s, m) => s + m.q.marks, 0);
    return { t, v: Math.round((ms.reduce((s, m) => s + m.awarded, 0) / tot) * 100) };
  }).sort((a, b) => b.v - a.v);
  const weak = topics.filter((t) => t.v < 70);

  return (
    <Shell>
      <div className="rise mt-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/80">Result · {sampleExam.title}</p>
        <h1 className="mt-1 text-[22px] font-extrabold tracking-tight">Here's how you did</h1>
      </div>

      <div className="rise mt-4 grid grid-cols-3 gap-3">
        <div className="glass p-3.5"><p className="text-[11px] text-muted-foreground">Score</p><p className="mt-1 text-[19px] font-extrabold">{pct}%</p></div>
        <div className="glass p-3.5"><p className="text-[11px] text-muted-foreground">Marks</p><p className="mt-1 text-[19px] font-extrabold">{got}/{total}</p></div>
        <div className="glass p-3.5"><p className="text-[11px] text-muted-foreground">Grade</p><p className="mt-1 text-[19px] font-extrabold">{grade(pct)} <span className={`text-[10px] ${pct >= 50 ? "text-success" : "text-destructive"}`}>{pct >= 50 ? "Pass" : "Fail"}</span></p></div>
      </div>

      <div className="rise glass mt-3 p-4">
        <p className="text-[13px] font-bold">Topic performance</p>
        <div className="mt-3 space-y-2.5">{topics.map((t) => <Bar key={t.t} label={t.t} value={t.v} />)}</div>
        <p className="mt-3 text-[12px] leading-relaxed text-muted-foreground">
          {weak.length ? `Strong in ${topics[0]?.t}. Focus your revision on ${weak.map((w) => w.t).join(", ")}.` : "Excellent work across every topic — try a harder level next."}
        </p>
        <Link to="/test" className="bg-brand mt-3 block rounded-2xl py-3 text-center text-[13px] font-extrabold">Generate Practice Test From My Weak Areas</Link>
      </div>

      <div className="rise glass mt-3 p-4">
        <p className="text-[13px] font-bold">Review answers</p>
        <div className="mt-3 space-y-3">
          {marked.map((m, n) => (
            <div key={m.q.id} className="rounded-xl bg-muted p-3">
              <div className="flex justify-between gap-2 text-[11px] font-bold">
                <span>Q{n + 1} · {m.q.topic}</span>
                <span className={m.verdict === "Correct" ? "text-success" : m.verdict === "Incorrect" || m.verdict === "Not Answered" ? "text-destructive" : "text-warning"}>{m.verdict} · {m.awarded}/{m.q.marks}</span>
              </div>
              <p className="mt-1 text-[12px]">{m.q.prompt}</p>
              <p className="mt-1 text-[11px] text-muted-foreground">{m.q.explanation}</p>
            </div>
          ))}
        </div>
      </div>
    </Shell>
  );
}
