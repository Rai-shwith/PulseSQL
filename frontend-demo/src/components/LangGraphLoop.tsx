import { useState, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const nodes = [
  { id: 1, label: "Receive Query", sub: "Natural language input", borderColor: "border-l-indigo-500", bg: "bg-indigo-500/10" },
  { id: 2, label: "Generate SQL", sub: "LLM-powered generation", borderColor: "border-l-violet-500", bg: "bg-violet-500/10", hasCounter: true },
  { id: 3, label: "Validate Query", sub: "Syntax & schema check", borderColor: "border-l-violet-500", bg: "bg-violet-500/10" },
];

const successNodes = [
  { id: "4a", label: "Execute on RDS", sub: "Run validated query", borderColor: "border-l-green-500", bg: "bg-green-500/10" },
  { id: "5", label: "Format & Return Answer", sub: "Plain English response", borderColor: "border-l-indigo-500", bg: "bg-indigo-500/10" },
];

const errorNode = { id: "4b", label: "Error Detected", sub: "Validation failed", borderColor: "border-l-red-500", bg: "bg-red-500/10" };
const selfCorrectNode = { id: "sc", label: "Self-Correct Prompt", sub: "Re-prompt with error context", borderColor: "border-l-orange-500", bg: "bg-orange-500/10" };

const LangGraphLoop = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [attempt, setAttempt] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setAttempt(prev => (prev % 3) + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 px-4">
      <div ref={ref} className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">
          LangGraph: <span className="text-gradient">Self-Healing Query Engine</span>
        </h2>
        <p className="text-center text-muted-foreground mb-16">Automatic error recovery with intelligent re-prompting</p>

        <div className={`transition-all duration-700 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
          {/* Main flow: nodes 1-3 */}
          <div className="flex flex-col items-center gap-2">
            {nodes.map((node, i) => (
              <div key={node.id} className="flex flex-col items-center">
                {i > 0 && (
                  <svg width="2" height="32" className="text-primary/40 mb-2">
                    <line x1="1" y1="0" x2="1" y2="32" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="animate-dash-flow" />
                  </svg>
                )}
                <div className={`glass-card ${node.bg} border-l-4 ${node.borderColor} rounded-xl px-6 py-4 min-w-[240px] text-center relative`}>
                  <p className="font-semibold text-foreground text-sm">{node.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">{node.sub}</p>
                  {node.hasCounter && (
                    <span className="absolute -top-2 -right-2 bg-violet-500 text-white text-xs font-bold rounded-full w-7 h-7 flex items-center justify-center animate-pulse">
                      {attempt}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Branch after node 3 */}
          <div className="flex flex-col lg:flex-row justify-center gap-8 lg:gap-16 mt-4">
            {/* Success path */}
            <div className="flex flex-col items-center gap-2">
              <div className="text-green-400 text-xs font-semibold mb-1">✅ Success Path</div>
              <svg width="2" height="24" className="text-green-500/40">
                <line x1="1" y1="0" x2="1" y2="24" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="animate-dash-flow" />
              </svg>
              {successNodes.map((node, i) => (
                <div key={node.id} className="flex flex-col items-center">
                  {i > 0 && (
                    <svg width="2" height="24" className="text-green-500/40 mb-2">
                      <line x1="1" y1="0" x2="1" y2="24" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="animate-dash-flow" />
                    </svg>
                  )}
                  <div className={`glass-card ${node.bg} border-l-4 ${node.borderColor} rounded-xl px-6 py-4 min-w-[220px] text-center`}>
                    <p className="font-semibold text-foreground text-sm">{node.label}</p>
                    <p className="text-xs text-muted-foreground mt-1">{node.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Error path */}
            <div className="flex flex-col items-center gap-2">
              <div className="text-red-400 text-xs font-semibold mb-1">❌ Error Path</div>
              <svg width="2" height="24" className="text-red-500/40">
                <line x1="1" y1="0" x2="1" y2="24" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="animate-dash-flow-error" />
              </svg>
              <div className={`glass-card ${errorNode.bg} border-l-4 ${errorNode.borderColor} rounded-xl px-6 py-4 min-w-[220px] text-center`}>
                <p className="font-semibold text-foreground text-sm">{errorNode.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{errorNode.sub}</p>
              </div>
              <svg width="2" height="24" className="text-orange-500/40">
                <line x1="1" y1="0" x2="1" y2="24" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="animate-dash-flow-error" />
              </svg>
              <div className={`glass-card ${selfCorrectNode.bg} border-l-4 ${selfCorrectNode.borderColor} rounded-xl px-6 py-4 min-w-[220px] text-center`}>
                <p className="font-semibold text-foreground text-sm">{selfCorrectNode.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{selfCorrectNode.sub}</p>
              </div>
              <svg width="2" height="24" className="text-orange-500/40">
                <line x1="1" y1="0" x2="1" y2="24" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="animate-dash-flow-error" />
              </svg>
              <div className="glass-card bg-violet-500/10 border-l-4 border-l-violet-500 rounded-xl px-6 py-3 min-w-[220px] text-center border border-orange-500/30" style={{ borderStyle: 'dashed' }}>
                <p className="text-xs text-orange-400 font-semibold">↑ Back to Generate SQL</p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-12 max-w-2xl mx-auto">
          If the generated SQL fails validation, LangGraph automatically re-prompts Bedrock with the error context — no human intervention needed.
        </p>
      </div>
    </section>
  );
};

export default LangGraphLoop;
