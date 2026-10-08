export type Question = {
  id: string;
  type: "mcq" | "tf" | "short";
  topic: string;
  prompt: string;
  options?: string[];
  answer: string;
  keywords?: string[];
  marks: number;
  explanation: string;
};

export type Exam = {
  id: string;
  title: string;
  subject: string;
  minutes: number;
  questions: Question[];
};

export const sampleExam: Exam = {
  id: "calc-2",
  title: "Calculus II",
  subject: "Mathematics",
  minutes: 15,
  questions: [
    { id: "q1", type: "mcq", topic: "Derivatives", prompt: "What is the derivative of x³?", options: ["3x²", "x²", "3x", "x⁴/4"], answer: "3x²", marks: 2, explanation: "Power rule: d/dx xⁿ = n·xⁿ⁻¹." },
    { id: "q2", type: "tf", topic: "Integrals", prompt: "The integral of 1/x is ln|x| + C.", options: ["True", "False"], answer: "True", marks: 1, explanation: "d/dx ln|x| = 1/x, so the antiderivative is ln|x| + C." },
    { id: "q3", type: "mcq", topic: "Limits", prompt: "lim (x→0) sin(x)/x equals:", options: ["0", "1", "∞", "Undefined"], answer: "1", marks: 2, explanation: "A standard limit, provable by the squeeze theorem." },
    { id: "q4", type: "mcq", topic: "Integrals", prompt: "∫ 2x dx =", options: ["x² + C", "2x² + C", "x + C", "2 + C"], answer: "x² + C", marks: 2, explanation: "Reverse the power rule: 2·x²/2 = x²." },
    { id: "q5", type: "short", topic: "Derivatives", prompt: "In your own words, what does a derivative measure?", answer: "The instantaneous rate of change of a function.", keywords: ["rate", "change", "slope", "instant"], marks: 3, explanation: "A derivative is the instantaneous rate of change — the slope of the tangent line." },
  ],
};

export type Verdict = "Correct" | "Mostly Correct" | "Partially Correct" | "Incorrect" | "Not Answered";

export function markQuestion(q: Question, given: string | undefined): { verdict: Verdict; awarded: number } {
  if (!given || !given.trim()) return { verdict: "Not Answered", awarded: 0 };
  if (q.type !== "short") {
    return given === q.answer ? { verdict: "Correct", awarded: q.marks } : { verdict: "Incorrect", awarded: 0 };
  }
  const text = given.toLowerCase();
  const hits = (q.keywords ?? []).filter((k) => text.includes(k)).length;
  const ratio = hits / Math.max(1, q.keywords?.length ?? 1);
  if (ratio >= 0.75) return { verdict: "Correct", awarded: q.marks };
  if (ratio >= 0.5) return { verdict: "Mostly Correct", awarded: Math.round(q.marks * 0.75) };
  if (ratio > 0) return { verdict: "Partially Correct", awarded: Math.round(q.marks * 0.4) };
  return { verdict: "Incorrect", awarded: 0 };
}

export function grade(pct: number) {
  if (pct >= 80) return "A";
  if (pct >= 70) return "B";
  if (pct >= 60) return "C";
  if (pct >= 50) return "D";
  return "F";
}
