import { useState } from "react";

const highlightSQL = (sql: string) => {
  return sql.split('\n').map((line, li) => {
    if (line.trim().startsWith('--')) {
      return <span key={li} className="block" style={{ color: '#4ade80' }}>{line}</span>;
    }
    const parts = line.split(/(\b(?:SELECT|FROM|WHERE|JOIN|AND|ON|ORDER BY|GROUP BY|LIMIT|AS|DESC|AVG|COUNT|EXTRACT|YEAR|AGE|DATE_TRUNC|INT)\b)/g);
    return (
      <span key={li} className="block">
        {parts.map((part, pi) => {
          if (/^(SELECT|FROM|WHERE|JOIN|AND|ON|ORDER BY|GROUP BY|LIMIT|AS|DESC|AVG|COUNT|EXTRACT|YEAR|AGE|DATE_TRUNC|INT)$/.test(part)) {
            return <span key={pi} style={{ color: '#a78bfa' }}>{part}</span>;
          }
          // Highlight table/column names (words with dots or underscores)
          const subParts = part.split(/(\b(?:Patients|Lab_Results|Medical_Records|Appointments|Audit_Logs|researcher_patients_view|p|lr|mr|mr1|mr2|a)\b\.?\w*|\b(?:patient_id|doctor_id|user_id|full_name|test_value|test_name|recorded_at|diagnosis_name|medication_prescribed|visit_date|unit|is_abnormal|dob|app_user_id|month|avg_hba1c|avg_age|total_patients|overlap_count)\b)/g);
          return subParts.map((sub, si) => {
            if (/^(Patients|Lab_Results|Medical_Records|Appointments|Audit_Logs|researcher_patients_view|patient_id|doctor_id|user_id|full_name|test_value|test_name|recorded_at|diagnosis_name|medication_prescribed|visit_date|unit|is_abnormal|dob|month|avg_hba1c|avg_age|total_patients|overlap_count)/.test(sub)) {
              return <span key={`${pi}-${si}`} style={{ color: '#67e8f9' }}>{sub}</span>;
            }
            // Highlight values/numbers
            const numParts = sub.split(/('[^']*'|\b\d+\.?\d*\b)/g);
            return numParts.map((np, ni) => {
              if (/^'[^']*'$/.test(np) || /^\d+\.?\d*$/.test(np)) {
                return <span key={`${pi}-${si}-${ni}`} style={{ color: '#fb923c' }}>{np}</span>;
              }
              return <span key={`${pi}-${si}-${ni}`} className="text-foreground/80">{np}</span>;
            });
          });
        })}
      </span>
    );
  });
};

interface SqlToggleProps {
  sql: string;
}

const SqlToggle = ({ sql }: SqlToggleProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-1">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-xs transition-colors hover:text-foreground"
        style={{ color: '#64748b' }}
      >
        <span>⚙️</span>
        <span>See generated SQL</span>
        <span className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: open ? '400px' : '0px' }}
      >
        <pre
          className="mt-2 rounded-lg p-4 text-xs overflow-x-auto font-mono"
          style={{
            background: '#0d1117',
            borderLeft: '3px solid #6366f1',
          }}
        >
          <code>{highlightSQL(sql)}</code>
        </pre>
      </div>
    </div>
  );
};

export default SqlToggle;
