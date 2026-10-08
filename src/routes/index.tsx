import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell, Bar } from "@/components/Shell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Scholaria — AI tests, exams & learning" },
      { name: "description", content: "Generate exams from your notes, mark answers with AI and get personalised study plans." },
      { property: "og:title", content: "Scholaria — AI tests, exams & learning" },
      { property: "og:description", content: "Generate exams from your notes, mark answers with AI and get personalised study plans." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const today = new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "short" });
  return (
    <Shell>
      <div className="rise mt-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/80">{today}</p>
        <h1 className="mt-1 text-[22px] font-extrabold leading-tight tracking-tight">
          Good morning, <span className="text-primary">Aria</span>
        </h1>
      </div>

      <div className="rise mt-4 grid grid-cols-2 gap-3" style={{ animationDelay: ".12s" }}>
        <Link to="/generate" className="glass col-span-2 flex items-center gap-3 p-3.5">
          <div className="bg-brand grid size-10 shrink-0 place-items-center rounded-xl text-[18px]">✦</div>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-bold leading-tight">Generate a new exam</p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">Upload notes or a PDF to begin</p>
          </div>
          <span className="text-[13px] text-muted-foreground">→</span>
        </Link>
        <div className="glass p-3.5">
          <p className="text-[11px] font-medium text-muted-foreground">Weekly goal</p>
          <p className="mt-1 text-[19px] font-extrabold leading-none">72%</p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted"><div className="bg-bar h-full w-[72%] rounded-full" /></div>
        </div>
        <div className="glass p-3.5">
          <p className="text-[11px] font-medium text-muted-foreground">Streak</p>
          <p className="mt-1 text-[19px] font-extrabold leading-none">14 <span className="text-[12px] text-muted-foreground">days</span></p>
          <p className="mt-2 text-[10px] font-medium text-primary/80">🔥 Best yet</p>
        </div>
      </div>

      <div className="rise glass mt-3 p-4" style={{ animationDelay: ".18s" }}>
        <div className="flex items-center justify-between">
          <p className="text-[13px] font-bold">Topic performance</p>
          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">This week</span>
        </div>
        <div className="mt-3 space-y-2.5">
          <Bar label="Algebra" value={88} />
          <Bar label="Geometry" value={64} />
          <Bar label="Calculus" value={41} />
        </div>
      </div>

      <div className="rise mt-3 grid grid-cols-2 gap-3" style={{ animationDelay: ".24s" }}>
        <div className="glass p-3.5">
          <p className="text-[11px] font-medium text-muted-foreground">Next test</p>
          <p className="mt-1 text-[13px] font-bold">Calculus II</p>
          <p className="mt-1 text-[11px] text-muted-foreground">5 questions · 15 min</p>
          <Link to="/test" className="mt-2.5 block rounded-full bg-primary/20 px-2 py-1 text-center text-[10px] font-bold text-primary">Start now →</Link>
        </div>
        <div className="glass p-3.5">
          <p className="text-[11px] font-medium text-muted-foreground">Personalised</p>
          <p className="mt-1 text-[13px] font-bold">Practice set</p>
          <p className="mt-1 text-[11px] text-muted-foreground">Targets Calculus</p>
          <Link to="/test" className="mt-2.5 block rounded-full bg-muted px-2 py-1 text-center text-[10px] font-bold text-foreground/70">Open</Link>
        </div>
      </div>
    </Shell>
  );
}
