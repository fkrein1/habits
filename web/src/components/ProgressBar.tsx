interface ProgressBarProps {
  progress: number;
}

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="h-3 rounded-xl bg-zinc-700 w-full mt-4">
      <div
        className="h-3 rounded-xl bg-violet-600"
        aria-label="Progresso de hábitos completos nesse dia"
        aria-valuenow={progress}
        role="progressbar"
        style={{
          width: `${progress}%`,
        }}
      ></div>
    </div>
  );
}
