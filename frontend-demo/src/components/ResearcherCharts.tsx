import { useEffect, useRef, useState } from "react";

const BarChart = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const data = [
    { label: "20–30", value: 12 },
    { label: "31–40", value: 28 },
    { label: "41–50", value: 67 },
    { label: "51–60", value: 143 },
    { label: "61–70", value: 189 },
    { label: "71+", value: 94 },
  ];
  const max = 200;
  // Average line at ~58.3 years maps to roughly between 51-60 and 61-70
  // Position it at ~63% across the chart width
  const avgLinePercent = 63;

  return (
    <div ref={ref} className="glass-card rounded-xl p-5 mt-3">
      <p className="text-sm font-semibold text-foreground mb-4">Patient Age Distribution by Disease</p>
      <div className="relative">
        <svg viewBox="0 0 400 180" className="w-full" style={{ maxHeight: '200px' }}>
          {/* Y-axis labels */}
          {[0, 50, 100, 150, 200].map((v, i) => (
            <text key={i} x="30" y={160 - (v / max) * 140} className="text-[10px]" fill="#94a3b8" textAnchor="end">{v}</text>
          ))}
          {/* Bars */}
          {data.map((d, i) => {
            const barWidth = 40;
            const gap = 12;
            const x = 45 + i * (barWidth + gap);
            const height = (d.value / max) * 140;
            return (
              <g key={i}>
                <defs>
                  <linearGradient id={`bar-grad-${i}`} x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0%" stopColor="hsl(263, 70%, 50%)" />
                    <stop offset="100%" stopColor="hsl(187, 94%, 43%)" />
                  </linearGradient>
                </defs>
                <rect
                  x={x}
                  y={visible ? 160 - height : 160}
                  width={barWidth}
                  height={visible ? height : 0}
                  fill={`url(#bar-grad-${i})`}
                  rx="3"
                  style={{ transition: 'all 0.8s ease-out', transitionDelay: `${i * 100}ms` }}
                />
                <text x={x + barWidth / 2} y="175" textAnchor="middle" fill="#94a3b8" className="text-[9px]">{d.label}</text>
              </g>
            );
          })}
          {/* Average line */}
          <line
            x1={45 + (avgLinePercent / 100) * 310}
            y1="20"
            x2={45 + (avgLinePercent / 100) * 310}
            y2="160"
            stroke="#ef4444"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          <text x={45 + (avgLinePercent / 100) * 310 + 4} y="30" fill="#ef4444" className="text-[9px]" fontWeight="bold">Avg: 58.3 yrs</text>
        </svg>
      </div>
      <p className="text-xs text-muted-foreground mt-3">📊 Auto-generated visualization — anonymized data only</p>
    </div>
  );
};

const DonutChart = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const overlapPercent = 63;
  const overlapDash = (overlapPercent / 100) * circumference;
  const noOverlapDash = circumference - overlapDash;

  return (
    <div className="glass-card rounded-xl p-5 mt-3">
      <p className="text-sm font-semibold text-foreground mb-4">Obesity → Metabolic Syndrome Overlap</p>
      <div className="flex justify-center">
        <svg width="180" height="180" viewBox="0 0 180 180">
          {/* Background ring */}
          <circle cx="90" cy="90" r={radius} fill="none" stroke="#334155" strokeWidth="20" />
          {/* Overlap segment */}
          <circle
            cx="90" cy="90" r={radius}
            fill="none"
            stroke="#8b5cf6"
            strokeWidth="20"
            strokeDasharray={visible ? `${overlapDash} ${noOverlapDash}` : `0 ${circumference}`}
            strokeDashoffset={circumference / 4}
            strokeLinecap="round"
            style={{ transition: 'stroke-dasharray 1.2s ease-out' }}
          />
          {/* Center text */}
          <text x="90" y="85" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">63%</text>
          <text x="90" y="102" textAnchor="middle" fill="#94a3b8" fontSize="10">overlap</text>
        </svg>
      </div>
      <div className="flex justify-center gap-4 mt-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-violet-500 inline-block" /> Also have Metabolic Syndrome (63%)</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm inline-block" style={{ background: '#334155' }} /> No Overlap (37%)</span>
      </div>
      <p className="text-xs text-muted-foreground mt-3">📊 Auto-generated visualization — anonymized data only</p>
    </div>
  );
};

export { BarChart, DonutChart };
