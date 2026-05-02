import { memo } from "react";

interface DetailCardProps {
  icon: string;
  value: string;
  label: string;
}

export const DetailCard = memo(function DetailCard({ icon, value, label }: DetailCardProps) {
  return (
    <div className="glassmorphism flex flex-col items-center justify-center rounded-xl p-4 text-white shadow-glass">
      <span className="material-symbols-outlined text-3xl text-white/80" aria-hidden="true">
        {icon}
      </span>
      <p className="mt-1 text-lg font-bold">{value}</p>
      <p className="text-sm text-white/70">{label}</p>
    </div>
  );
});
