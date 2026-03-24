import { useState, useEffect } from "react";
import { useTypewriter } from "@/hooks/useTypewriter";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCountUp } from "@/hooks/useCountUp";
import Navbar from "@/components/Navbar";
import SqlToggle from "@/components/SqlToggle";
import { MicButton, WaveformBars } from "@/components/MicButton";
import { BarChart, DonutChart } from "@/components/ResearcherCharts";
import { Mic } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

/* ─── HERO ─── */
const HeroChat = () => {
  const q = useTypewriter('Which of my patients have HbA1c higher than 7.0?', 25, 800);
  const a = useTypewriter(
    'Found 3 patients: Riya M., Arjun P., Sneha K. — all above threshold. Showing results filtered to your assigned patients only.',
    15, 3200
  );

  return (
    <div className="glass-card rounded-2xl p-5 max-w-md w-full space-y-4">
      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
        <span className="w-3 h-3 rounded-full bg-red-500/70" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <span className="w-3 h-3 rounded-full bg-green-500/70" />
        <span className="ml-2">PulseSQL Chat</span>
      </div>
      <div className="space-y-3">
        <div className="flex justify-end">
          <div className="bg-primary/20 border border-primary/30 rounded-xl rounded-tr-sm px-4 py-2.5 max-w-[85%]">
            <p className="text-xs text-primary/70 mb-1">🩺 Doctor</p>
            <p className="text-sm text-foreground">{q.displayText}<span className={`${q.isComplete ? 'hidden' : ''} animate-typing-cursor`}>|</span></p>
          </div>
        </div>
        {q.isComplete && (
          <div className="flex justify-start">
            <div className="bg-accent/10 border border-accent/20 rounded-xl rounded-tl-sm px-4 py-2.5 max-w-[85%]">
              <p className="text-xs text-accent/70 mb-1">⚡ PulseSQL</p>
              <p className="text-sm text-foreground">{a.displayText}<span className={`${a.isComplete ? 'hidden' : ''} animate-typing-cursor`}>|</span></p>
            </div>
          </div>
        )}
      </div>
      {/* Input bar with mic */}
      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border/30">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-violet-600 flex-shrink-0">
                <Mic className="text-white" size={14} />
              </button>
            </TooltipTrigger>
            <TooltipContent><p>Speak your query</p></TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="flex-1 glass-card rounded-lg px-3 py-1.5 text-xs text-muted-foreground">
          Type your query...
        </div>
      </div>
    </div>
  );
};

const Hero = () => (
  <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
    {/* Blobs */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl animate-blob" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-violet-500/15 rounded-full blur-3xl animate-blob-delay" />
      <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-blob-delay-2" />
      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle, hsl(239 84% 67%) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />
    </div>

    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
      <div className="flex-1 text-center lg:text-left">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
          Ask in English.{" "}
          <span className="text-gradient">Query in SQL.</span>{" "}
          Secured by Design.
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mb-8 mx-auto lg:mx-0">
          PulseSQL is a GenAI-powered medical analytics system that lets doctors, patients, and researchers query complex healthcare data using plain English — with Row-Level Security enforced at the database level.
        </p>
        <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
          <button onClick={() => document.getElementById("solution")?.scrollIntoView({ behavior: "smooth" })} className="px-6 py-3 rounded-xl font-semibold bg-primary text-primary-foreground hover:opacity-90 transition glow-indigo">
            See How It Works
          </button>
          <a href="/architecture" className="px-6 py-3 rounded-xl font-semibold glass-card hover:glow-violet transition-all duration-300 text-foreground">
            View Architecture
          </a>
        </div>
      </div>
      <div className="flex-1 flex justify-center lg:justify-end">
        <HeroChat />
      </div>
    </div>
  </section>
);

/* ─── PROBLEM ─── */
const problemCards = [
  { icon: "🔒", title: "Siloed & Unsafe", desc: "Doctors can't query across systems. Patients can't access their own data easily. Researchers see too much.", color: "indigo" },
  { icon: "🧩", title: "SQL is a barrier", desc: "Clinicians aren't data engineers. Writing queries manually is slow, error-prone, and rarely done.", color: "violet" },
  { icon: "📊", title: "No real-time insight", desc: "Critical trends like rising HbA1c or worsening BP go unnoticed without dedicated analyst time.", color: "cyan" },
];

const ProblemSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <section id="problem" className="py-24 px-4">
      <div ref={ref} className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
          Healthcare data is <span className="text-gradient">locked in complexity</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {problemCards.map((c, i) => (
            <div key={i} className={`glass-card rounded-2xl p-8 transition-all duration-500 hover:glow-${c.color} ${isVisible ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: `${i * 150}ms` }}>
              <span className="text-4xl mb-4 block">{c.icon}</span>
              <h3 className="text-xl font-semibold mb-3 text-foreground">{c.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── SOLUTION FLOW ─── */
const steps = [
  { icon: "💬", label: "You type a question", sub: "Natural language input" },
  { icon: "🧠", label: "Amazon Bedrock translates it", sub: "LLM-powered SQL generation" },
  { icon: "🔐", label: "PostgreSQL RLS filters your view", sub: "Row-Level Security enforcement" },
  { icon: "📋", label: "Results returned in plain English", sub: "Human-readable response" },
];

const SolutionFlow = () => {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <section id="solution" className="py-24 px-4">
      <div ref={ref} className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
          Natural Language → <span className="text-gradient">Secure SQL</span> → Instant Insight
        </h2>
        <p className="text-center text-muted-foreground mb-16">Powered by Amazon Bedrock + Amazon RDS (PostgreSQL)</p>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-2">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-2 lg:gap-4 w-full lg:w-auto">
              <div className={`glass-card rounded-2xl p-6 text-center flex-1 lg:flex-none lg:w-52 transition-all duration-500 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: `${i * 200}ms` }}>
                <div className="text-3xl mb-3 relative inline-block">
                  {s.icon}
                  {i === 1 && <span className="absolute inset-0 border-2 border-violet-500/30 rounded-full animate-pulse-ring" />}
                </div>
                <p className="text-sm font-semibold text-foreground">{s.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.sub}</p>
              </div>
              {i < steps.length - 1 && (
                <svg className="w-8 h-8 lg:w-12 lg:h-4 text-primary/40 flex-shrink-0 rotate-90 lg:rotate-0" viewBox="0 0 40 10">
                  <line x1="0" y1="5" x2="40" y2="5" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="animate-dash-flow" />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── USER ROLES TABS ─── */
const sqlQueries: Record<string, string[]> = {
  doctor: [
    `-- Fetch patients assigned to this doctor with high HbA1c
SELECT p.full_name, lr.test_value, lr.recorded_at
FROM Patients p
JOIN Lab_Results lr ON p.patient_id = lr.patient_id
JOIN Appointments a ON p.patient_id = a.patient_id
WHERE a.doctor_id = current_setting('app.user_id')::INT
  AND lr.test_name = 'HbA1c'
  AND lr.test_value > 7.0
ORDER BY lr.test_value DESC;`,
    `-- Average HbA1c trend for doctor's diabetic patients
SELECT DATE_TRUNC('month', lr.recorded_at) AS month,
       AVG(lr.test_value) AS avg_hba1c
FROM Lab_Results lr
JOIN Medical_Records mr ON lr.patient_id = mr.patient_id
JOIN Appointments a ON lr.patient_id = a.patient_id
WHERE a.doctor_id = current_setting('app.user_id')::INT
  AND mr.diagnosis_name = 'Diabetes Mellitus'
  AND lr.test_name = 'HbA1c'
GROUP BY month ORDER BY month;`,
  ],
  patient: [
    `-- Patient's own last 3 lab results (RLS enforces patient_id match)
SELECT test_name, test_value, unit, is_abnormal, recorded_at
FROM Lab_Results
WHERE patient_id = current_setting('app.user_id')::INT
ORDER BY recorded_at DESC
LIMIT 3;`,
    `-- Current medications for the logged-in patient
SELECT diagnosis_name, medication_prescribed, visit_date
FROM Medical_Records
WHERE patient_id = current_setting('app.user_id')::INT
ORDER BY visit_date DESC;`,
  ],
  researcher: [
    `-- Anonymized avg age for CKD patients (via researcher view)
SELECT AVG(EXTRACT(YEAR FROM AGE(dob))) AS avg_age,
       COUNT(*) AS total_patients
FROM researcher_patients_view
JOIN Medical_Records mr ON researcher_patients_view.patient_id = mr.patient_id
WHERE mr.diagnosis_name = 'Chronic Kidney Disease';`,
    `-- Comorbidity overlap: Obesity + Metabolic Syndrome
SELECT COUNT(*) AS overlap_count
FROM Medical_Records mr1
JOIN Medical_Records mr2 ON mr1.patient_id = mr2.patient_id
WHERE mr1.diagnosis_name = 'Obesity'
  AND mr2.diagnosis_name = 'Metabolic Syndrome';`,
  ],
};

const micSampleTexts: Record<string, string> = {
  doctor: "Which of my patients have HbA1c higher than 7.0?",
  patient: "What were my last 3 lab results?",
  researcher: "Show average glucose trend for diabetic patients",
};

const roleData = {
  doctor: {
    emoji: "🩺", label: "Doctor", color: "primary",
    queries: [
      { q: "Which of my patients were diagnosed with hypertension this month?", a: '4 patients found: [list]. All are your assigned patients — data filtered by RLS.' },
      { q: "Show average HbA1c for my diabetic patients over the last 6 months.", a: "Average HbA1c trending from 7.8 → 7.2. Improvement detected." },
    ],
  },
  patient: {
    emoji: "🧑‍⚕️", label: "Patient", color: "accent",
    queries: [
      { q: "What were my last 3 lab results?", a: "Your recent tests: Fasting Glucose 98 mg/dL (Normal), HbA1c 6.4% (Normal), LDL 112 mg/dL (Borderline). Showing your data only." },
      { q: "What medications am I currently on and what are they for?", a: "Metformin — for Type 2 Diabetes management. Amlodipine — for Hypertension control." },
    ],
  },
  researcher: {
    emoji: "🔬", label: "Researcher", color: "secondary",
    queries: [
      { q: "What is the average age of patients diagnosed with CKD?", a: "Average age: 58.3 years across 47 anonymized records. Patient identities masked." },
      { q: "How many patients with Obesity also have Metabolic Syndrome?", a: "Comorbidity overlap: 63% of obese patients also show Metabolic Syndrome markers. Names/SSNs redacted." },
    ],
  },
};

const UserRolesTabs = () => {
  const [active, setActive] = useState<keyof typeof roleData>("doctor");
  const [animKey, setAnimKey] = useState(0);
  const [recording, setRecording] = useState(false);
  const [inputText, setInputText] = useState("");
  const data = roleData[active];

  const switchTab = (tab: keyof typeof roleData) => {
    setActive(tab);
    setAnimKey(k => k + 1);
    setRecording(false);
    setInputText("");
  };

  const toggleMic = () => {
    if (recording) {
      setRecording(false);
      setInputText(micSampleTexts[active]);
    } else {
      setRecording(true);
      setInputText("");
    }
  };

  return (
    <section id="roles" className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          One system. <span className="text-gradient">Three perspectives.</span>
        </h2>

        <div className="flex justify-center gap-2 mb-10">
          {(Object.keys(roleData) as Array<keyof typeof roleData>).map(key => {
            const r = roleData[key];
            const isActive = key === active;
            return (
              <button key={key} onClick={() => switchTab(key)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${isActive ? 'glass-card-strong glow-indigo text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                {r.emoji} {r.label}
              </button>
            );
          })}
        </div>

        <div key={animKey} className="glass-card rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <span className="w-3 h-3 rounded-full bg-red-500/70" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <span className="w-3 h-3 rounded-full bg-green-500/70" />
            <span className="ml-2">{data.emoji} {data.label} View</span>
          </div>
          {data.queries.map((pair, i) => (
            <div key={i} className="space-y-3 animate-fade-up" style={{ animationDelay: `${i * 400}ms` }}>
              <div className="flex justify-end">
                <div className="bg-primary/15 border border-primary/20 rounded-xl rounded-tr-sm px-4 py-2.5 max-w-[85%]">
                  <p className="text-sm text-foreground">{pair.q}</p>
                </div>
              </div>
              <div className="flex justify-start">
                <div className="max-w-[85%]">
                  <div className="bg-accent/10 border border-accent/15 rounded-xl rounded-tl-sm px-4 py-2.5">
                    <p className="text-sm text-foreground">{pair.a}</p>
                  </div>
                  <SqlToggle sql={sqlQueries[active][i]} />
                  {active === "researcher" && i === 0 && <BarChart />}
                  {active === "researcher" && i === 1 && <DonutChart />}
                </div>
              </div>
            </div>
          ))}

          {/* Chat input bar with mic */}
          <div className="flex items-center gap-2 pt-3 border-t border-border/30">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={toggleMic}
                    className={`relative w-10 h-10 flex items-center justify-center rounded-lg flex-shrink-0 transition-all duration-300 ${
                      recording ? 'bg-red-500/20' : 'bg-gradient-to-br from-violet-500 to-violet-600'
                    }`}
                  >
                    <Mic className="text-white" size={18} />
                    {recording && <span className="absolute inset-0 rounded-lg border-2 border-red-500 animate-mic-pulse" />}
                  </button>
                </TooltipTrigger>
                <TooltipContent><p>Speak your query — PulseSQL understands natural language</p></TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {recording ? (
              <div className="flex-1 flex flex-col items-center">
                <WaveformBars />
                <p className="text-xs text-muted-foreground mt-1">Listening... speak your query</p>
              </div>
            ) : (
              <div className="flex-1 glass-card rounded-lg px-4 py-2.5 text-sm text-muted-foreground">
                {inputText || "Type your query..."}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── RLS SECURITY ─── */
const rlsPolicies = [
  { icon: "👤", title: "Patient Policy", desc: "You only see rows where patient_id matches your user_id. Other records literally don't exist in your query." },
  { icon: "🩺", title: "Doctor Policy", desc: "You see only patients linked to you via the Appointments table. No assignment = no access." },
  { icon: "🔬", title: "Researcher Policy", desc: "You query an anonymized VIEW. Names are hashed, DOBs rounded to year, SSNs removed. Raw tables are blocked." },
];

const SecuritySection = () => {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <section id="security" className="py-24 px-4">
      <div ref={ref} className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
          Security isn't an afterthought. <span className="text-gradient">It's in the database.</span>
        </h2>
        <p className="text-center text-muted-foreground mb-16">Row-Level Security policies ensure every query is scoped to user permissions</p>
        <div className="grid md:grid-cols-3 gap-6">
          {rlsPolicies.map((p, i) => (
            <div key={i} className={`glass-card rounded-2xl p-8 text-center transition-all duration-500 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: `${i * 200}ms` }}>
              <div className="text-4xl mb-4 inline-block">
                {isVisible && <span className="inline-block animate-lock">{p.icon}</span>}
              </div>
              <h3 className="text-lg font-semibold mb-3 text-foreground">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── TECH STACK ─── */
const techBadges = ["Amazon Bedrock", "Amazon RDS", "PostgreSQL", "FastAPI", "Python", "LangGraph", "React", "Row-Level Security"];

const TechStack = () => (
  <section className="py-16 px-4">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-2xl font-bold mb-10">Built on <span className="text-gradient">enterprise-grade</span> infrastructure</h2>
      <div className="flex flex-wrap justify-center gap-3">
        {techBadges.map(b => (
          <span key={b} className="glass-card px-5 py-2.5 rounded-full text-sm font-medium text-foreground hover:glow-indigo transition-all duration-300 cursor-default">
            {b}
          </span>
        ))}
      </div>
    </div>
  </section>
);

/* ─── STATS ─── */
const stats = [
  { target: 30, suffix: "+", label: "Diseases Mapped" },
  { target: 3, suffix: "", label: "Role-Based Access Tiers" },
  { target: 1000, suffix: "+", label: "Synthetic Patient Records" },
  { target: 6, suffix: "", label: "Normalized Database Tables" },
];

const StatItem = ({ target, suffix, label }: { target: number; suffix: string; label: string }) => {
  const { ref, count } = useCountUp(target);
  return (
    <div ref={ref} className="text-center">
      <p className="text-4xl sm:text-5xl font-bold text-gradient">{count}{suffix}</p>
      <p className="text-sm text-muted-foreground mt-2">{label}</p>
    </div>
  );
};

const StatsBar = () => (
  <section className="py-20 px-4 glass-card-strong">
    <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-10">
      {stats.map(s => <StatItem key={s.label} {...s} />)}
    </div>
  </section>
);

/* ─── FOOTER ─── */
const Footer = () => (
  <footer className="py-12 px-4 border-t border-border">
    <div className="max-w-5xl mx-auto text-center space-y-3">
      <p className="text-lg font-semibold text-gradient">PulseSQL</p>
      <p className="text-sm text-muted-foreground">Built at HACK'A'WAR 2026, RIT Bengaluru</p>
      <p className="text-xs text-muted-foreground">
        Ashwith Rai N · Archana R · Abhay Swami K · Anaghashree
      </p>
      <p className="text-xs text-muted-foreground">Track: Analyst Workflows · Problem: Natural Language → SQL</p>
    </div>
  </footer>
);

/* ─── PAGE ─── */
const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <Hero />
    <ProblemSection />
    <SolutionFlow />
    <UserRolesTabs />
    <SecuritySection />
    <TechStack />
    <StatsBar />
    <Footer />
  </div>
);

export default Index;
