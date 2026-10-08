import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="glow-a pointer-events-none absolute -top-24 -right-20 h-64 w-64 rounded-full bg-glow-1 blur-3xl" />
      <div className="glow-b pointer-events-none absolute top-40 -left-24 h-64 w-64 rounded-full bg-glow-2 blur-3xl" />
      <div className="pointer-events-none fixed -bottom-24 right-8 h-64 w-64 rounded-full bg-glow-3 blur-3xl" />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-md flex-col px-5 pt-3 pb-24">
        <header className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="glass grid size-8 place-items-center !rounded-xl">
              <span className="text-[15px] font-extrabold text-primary">S</span>
            </div>
            <span className="text-[15px] font-bold tracking-tight">Scholaria</span>
          </Link>
          <div className="bg-brand grid size-8 place-items-center rounded-full text-[11px] font-extrabold">AR</div>
        </header>
        {children}
      </div>
      <nav className="fixed inset-x-0 bottom-3 z-20 mx-auto max-w-md px-5">
        <div className="glass flex items-center justify-around px-2 py-2.5">
          {[
            { to: "/", icon: "🏠", label: "Home" },
            { to: "/generate", icon: "✦", label: "Generate" },
            { to: "/test", icon: "📝", label: "Test" },
            { to: "/results", icon: "📊", label: "Insights" },
          ].map((n) => (
            <Link key={n.to} to={n.to} className="group flex flex-col items-center gap-1 text-muted-foreground" activeProps={{ className: "!text-primary" }} activeOptions={{ exact: true }}>
              <span className="text-[17px]">{n.icon}</span>
              <span className="text-[9px] font-bold">{n.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}

export function Bar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex justify-between text-[11px]">
        <span className="font-medium text-foreground/80">{label}</span>
        <span className={value >= 70 ? "font-semibold text-primary" : value < 50 ? "font-semibold text-destructive" : "font-semibold text-foreground/80"}>{value}%</span>
      </div>
      <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div className="bg-bar h-full rounded-full" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
