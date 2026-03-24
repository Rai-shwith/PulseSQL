import Navbar from "@/components/Navbar";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState } from "react";
import LangGraphLoop from "@/components/LangGraphLoop";

/* ─── ARCHITECTURE DIAGRAM ─── */
const archBoxes = [
  { label: "User Browser", sub: "React Frontend", color: "border-indigo-500/50", bg: "bg-indigo-500/10" },
  { label: "FastAPI Backend", sub: "Python API Layer", color: "border-indigo-500/50", bg: "bg-indigo-500/10" },
  { label: "Amazon Bedrock + LangGraph Agent", sub: "LLM Processing", color: "border-violet-500/50", bg: "bg-violet-500/10" },
  { label: "SQL Generator", sub: "Query Builder", color: "border-violet-500/50", bg: "bg-violet-500/10" },
  { label: "PostgreSQL (RDS)", sub: "RLS Policies Active", color: "border-cyan-500/50", bg: "bg-cyan-500/10" },
  { label: "Filtered Results", sub: "Scoped Data", color: "border-cyan-500/50", bg: "bg-cyan-500/10" },
  { label: "Response Formatter", sub: "Plain English Output", color: "border-violet-500/50", bg: "bg-violet-500/10" },
];

const ArchDiagram = () => {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <section id="architecture" className="py-24 px-4">
      <div ref={ref} className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">System <span className="text-gradient">Architecture</span></h2>
        <div className="flex flex-col items-center gap-3">
          {archBoxes.map((box, i) => (
            <div key={i} className={`transition-all duration-500 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: `${i * 100}ms` }}>
              {i > 0 && (
                <div className="flex justify-center mb-3">
                  <svg width="2" height="32" className="text-primary/40">
                    <line x1="1" y1="0" x2="1" y2="32" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="animate-dash-flow" />
                  </svg>
                </div>
              )}
              <div className={`glass-card ${box.bg} border ${box.color} rounded-xl px-8 py-4 text-center min-w-[260px]`}>
                <p className="font-semibold text-foreground">{box.label}</p>
                <p className="text-xs text-muted-foreground">{box.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── SCHEMA TABLE ─── */
const schemaRows = [
  { table: "Users", cols: "user_id, username, role, email", constraints: "PK: user_id", role: "Identity & access control" },
  { table: "Patients", cols: "patient_id, user_id, full_name, dob, gender, ssn_masked", constraints: "PK: patient_id", role: "PII hub, RLS anchor" },
  { table: "Medical_Records", cols: "record_id, patient_id, doctor_id, diagnosis_name, comorbidities", constraints: "PK: record_id", role: "Top 30 disease mapping" },
  { table: "Lab_Results", cols: "lab_id, patient_id, test_name, test_value, unit, is_abnormal", constraints: "PK: lab_id", role: "Clinical metrics & trends" },
  { table: "Appointments", cols: "app_id, patient_id, doctor_id, app_date, status", constraints: "PK: app_id", role: "Doctor-patient RLS bridge" },
  { table: "Audit_Logs", cols: "log_id, user_id, action_type, table_name, row_id, changed_at", constraints: "PK: log_id", role: "HIPAA audit trail" },
];

const SchemaTable = () => {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <section id="schema" className="py-24 px-4">
      <div ref={ref} className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Schema <span className="text-gradient">Design</span></h2>
        <div className={`glass-card rounded-2xl overflow-hidden transition-all duration-700 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-primary/10 border-b border-primary/20">
                  <th className="px-6 py-4 text-left font-semibold text-foreground">Table Name</th>
                  <th className="px-6 py-4 text-left font-semibold text-foreground">Core Columns</th>
                  <th className="px-6 py-4 text-left font-semibold text-foreground">Key Constraints</th>
                  <th className="px-6 py-4 text-left font-semibold text-foreground">Role in PulseSQL</th>
                </tr>
              </thead>
              <tbody>
                {schemaRows.map((row, i) => (
                  <tr key={i} className={`border-b border-border/50 hover:bg-primary/5 transition-colors ${i % 2 === 0 ? 'bg-muted/20' : ''}`}>
                    <td className="px-6 py-4 font-mono text-primary">{row.table}</td>
                    <td className="px-6 py-4 text-muted-foreground font-mono text-xs">{row.cols}</td>
                    <td className="px-6 py-4 text-muted-foreground">{row.constraints}</td>
                    <td className="px-6 py-4 text-foreground">{row.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── DISEASES ─── */
const diseaseCategories = [
  { emoji: "🧠", name: "Metabolic", diseases: [
    { name: "Diabetes", tip: "Key metric: HbA1c | Meds: Metformin, Insulin" },
    { name: "Hypertension", tip: "Key metric: BP | Meds: Amlodipine, Losartan" },
    { name: "Dyslipidemia", tip: "Key metric: LDL/HDL | Meds: Atorvastatin" },
    { name: "Obesity", tip: "Key metric: BMI | Linked: Metabolic Syndrome" },
    { name: "Metabolic Syndrome", tip: "Cluster: Obesity + HTN + Dyslipidemia" },
  ]},
  { emoji: "❤️", name: "Cardiovascular", diseases: [
    { name: "CAD", tip: "Key metric: Troponin | Meds: Aspirin, Statins" },
    { name: "Heart Failure", tip: "Key metric: BNP | Meds: ACE inhibitors" },
    { name: "Stroke", tip: "Key metric: CT/MRI | Meds: Anticoagulants" },
    { name: "PAD", tip: "Key metric: ABI | Risk: Smoking, Diabetes" },
    { name: "Arrhythmia", tip: "Key metric: ECG | Meds: Beta-blockers" },
  ]},
  { emoji: "🫁", name: "Respiratory", diseases: [
    { name: "Asthma", tip: "Key metric: PFT | Meds: Salbutamol" },
    { name: "COPD", tip: "Key metric: FEV1 | Meds: Tiotropium" },
    { name: "Pneumonia", tip: "Key metric: CXR | Meds: Antibiotics" },
    { name: "TB", tip: "Key metric: Sputum AFB | Meds: RIPE therapy" },
    { name: "COVID-19", tip: "Key metric: RT-PCR | Meds: Antivirals" },
  ]},
  { emoji: "🦠", name: "Infectious", diseases: [
    { name: "Dengue", tip: "Key metric: Platelet count | Meds: Supportive" },
    { name: "Malaria", tip: "Key metric: Blood smear | Meds: Chloroquine" },
    { name: "Sepsis", tip: "Key metric: Lactate, Procalcitonin | Meds: IV Antibiotics" },
    { name: "HIV", tip: "Key metric: CD4 count | Meds: ART" },
    { name: "Hepatitis B", tip: "Key metric: HBsAg | Meds: Tenofovir" },
  ]},
  { emoji: "🧬", name: "Systemic", diseases: [
    { name: "CKD", tip: "Key metric: GFR, Creatinine | Meds: ACE inhibitors" },
    { name: "Cirrhosis", tip: "Key metric: Bilirubin, ALT | Meds: Diuretics" },
    { name: "Hypothyroidism", tip: "Key metric: TSH | Meds: Levothyroxine" },
    { name: "Hyperthyroidism", tip: "Key metric: TSH, T4 | Meds: Methimazole" },
    { name: "Pancreatitis", tip: "Key metric: Amylase, Lipase | Meds: Supportive" },
  ]},
  { emoji: "🦴", name: "Musculoskeletal / Oncology", diseases: [
    { name: "Osteoporosis", tip: "Key metric: DEXA | Meds: Bisphosphonates" },
    { name: "RA", tip: "Key metric: RF, Anti-CCP | Meds: Methotrexate" },
    { name: "Breast Cancer", tip: "Key metric: Mammography | Meds: Tamoxifen" },
    { name: "Lung Cancer", tip: "Key metric: CT Scan | Meds: Chemo, Immunotherapy" },
    { name: "Prostate Cancer", tip: "Key metric: PSA | Meds: Enzalutamide" },
  ]},
];

const DiseaseGrid = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [tooltip, setTooltip] = useState<string | null>(null);

  return (
    <section id="diseases" className="py-24 px-4">
      <div ref={ref} className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">
          30 Disease Categories. <span className="text-gradient">Real Clinical Logic.</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12">Hover over any disease for key metrics and linked medications</p>
        <div className="space-y-8">
          {diseaseCategories.map((cat, ci) => (
            <div key={ci} className={`transition-all duration-500 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: `${ci * 100}ms` }}>
              <p className="text-sm font-semibold text-muted-foreground mb-3">{cat.emoji} {cat.name}</p>
              <div className="flex flex-wrap gap-2">
                {cat.diseases.map((d, di) => (
                  <div key={di} className="relative"
                    onMouseEnter={() => setTooltip(`${cat.name}-${di}`)}
                    onMouseLeave={() => setTooltip(null)}
                  >
                    <span className="glass-card px-4 py-2 rounded-full text-sm text-foreground hover:glow-indigo transition-all duration-300 cursor-default inline-block">
                      {d.name}
                    </span>
                    {tooltip === `${cat.name}-${di}` && (
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 glass-card-strong rounded-lg px-3 py-2 text-xs text-foreground whitespace-nowrap z-50">
                        {d.tip}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-muted rotate-45 -mt-1" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── QUERY JOURNEY ─── */
const journeySteps = [
  { icon: "💬", title: "Natural Language Input", desc: '"Which of my patients have HbA1c > 7.0?"' },
  { icon: "🧠", title: "LLM Schema Analysis", desc: "Bedrock identifies Lab_Results + Patients + Appointments tables" },
  { icon: "⚙️", title: "SQL Generation", desc: "" },
  { icon: "🔐", title: "RLS Security Gate", desc: "Postgres checks doctor's assignment. Unauthorized rows vanish." },
  { icon: "📋", title: "Plain English Response", desc: '"Dr. Smith, 3 of your patients are above threshold."' },
];

const sqlSnippet = `SELECT p.full_name, lr.test_value
FROM Patients p
JOIN Lab_Results lr ON p.patient_id = lr.patient_id
JOIN Appointments a ON p.patient_id = a.patient_id
WHERE lr.test_name = 'HbA1c'
  AND lr.test_value > 7.0
  AND a.doctor_id = current_setting('app.user_id')::uuid;`;

const QueryJourney = () => {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <section className="py-24 px-4">
      <div ref={ref} className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">The Journey of <span className="text-gradient">a Query</span></h2>
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-accent opacity-30" />
          {journeySteps.map((s, i) => (
            <div key={i} className={`relative pl-16 pb-10 transition-all duration-500 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: `${i * 150}ms` }}>
              <div className="absolute left-3 w-7 h-7 rounded-full glass-card-strong flex items-center justify-center text-sm border border-primary/30">
                {i + 1}
              </div>
              <div className="glass-card rounded-xl p-5">
                <p className="text-sm font-semibold text-foreground mb-1">{s.icon} {s.title}</p>
                {s.desc && <p className="text-sm text-muted-foreground">{s.desc}</p>}
                {i === 2 && (
                  <pre className="mt-3 bg-background/80 rounded-lg p-4 text-xs overflow-x-auto font-mono">
                    <code>
                      {sqlSnippet.split('\n').map((line, li) => (
                        <span key={li} className="block">
                          {line.split(/(\b(?:SELECT|FROM|JOIN|WHERE|AND|ON)\b)/g).map((part, pi) =>
                            /^(SELECT|FROM|JOIN|WHERE|AND|ON)$/.test(part)
                              ? <span key={pi} className="text-primary font-bold">{part}</span>
                              : <span key={pi} className="text-foreground/80">{part}</span>
                          )}
                        </span>
                      ))}
                    </code>
                  </pre>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── TEAM ─── */
const teamMembers = [
  { name: "Ashwith Rai N", role: "Backend & Database Architecture", color: "from-indigo-500 to-violet-500" },
  { name: "Archana R", role: "AI/LLM Integration", color: "from-violet-500 to-purple-500" },
  { name: "Abhay Swami K", role: "Frontend & UX", color: "from-cyan-500 to-blue-500" },
  { name: "Anaghashree", role: "Data Engineering & Synthesis", color: "from-pink-500 to-rose-500" },
];

const TeamSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <section id="team" className="py-24 px-4">
      <div ref={ref} className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">The <span className="text-gradient">Team</span></h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((m, i) => (
            <div key={i} className={`glass-card rounded-2xl p-6 text-center transition-all duration-500 hover:glow-indigo ${isVisible ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: `${i * 100}ms` }}>
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${m.color} mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-white/90`}>
                {m.name[0]}
              </div>
              <p className="font-semibold text-foreground text-sm">{m.name}</p>
              <p className="text-xs text-muted-foreground mt-1">{m.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── PAGE ─── */
const Architecture = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <section className="pt-28 pb-12 px-4 text-center">
      <h1 className="text-4xl sm:text-5xl font-bold mb-4">
        Under the <span className="text-gradient">Hood</span>
      </h1>
      <p className="text-lg text-muted-foreground max-w-xl mx-auto">
        System architecture, data design, and security model for PulseSQL
      </p>
    </section>
    <ArchDiagram />
    <LangGraphLoop />
    <SchemaTable />
    <DiseaseGrid />
    <QueryJourney />
    <TeamSection />
    <footer className="py-10 px-4 border-t border-border text-center">
      <p className="text-sm text-muted-foreground">PulseSQL — Built at HACK'A'WAR 2026, RIT Bengaluru</p>
    </footer>
  </div>
);

export default Architecture;
