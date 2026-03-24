import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Mic } from "lucide-react";

interface MicButtonProps {
  onStop?: (text: string) => void;
  sampleText?: string;
  compact?: boolean;
}

const WaveformBars = () => (
  <div className="flex items-center gap-[3px] h-8">
    {Array.from({ length: 20 }).map((_, i) => (
      <div
        key={i}
        className="w-[3px] rounded-full"
        style={{
          background: `linear-gradient(to top, hsl(263, 70%, 50%), hsl(187, 94%, 43%))`,
          animation: `waveform 0.8s ease-in-out infinite`,
          animationDelay: `${i * 0.05}s`,
          height: '100%',
        }}
      />
    ))}
  </div>
);

const MicButton = ({ onStop, sampleText, compact }: MicButtonProps) => {
  const [recording, setRecording] = useState(false);

  const toggle = () => {
    if (recording) {
      setRecording(false);
      if (onStop && sampleText) onStop(sampleText);
    } else {
      setRecording(true);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={toggle}
            className={`relative flex items-center justify-center rounded-lg transition-all duration-300 ${
              compact ? 'w-8 h-8' : 'w-10 h-10'
            } ${recording ? 'bg-red-500/20' : 'bg-gradient-to-br from-violet-500 to-violet-600'}`}
          >
            <Mic className="text-white" size={compact ? 14 : 18} />
            {recording && (
              <span className="absolute inset-0 rounded-lg border-2 border-red-500 animate-mic-pulse" />
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Speak your query — PulseSQL understands natural language</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export { MicButton, WaveformBars };
