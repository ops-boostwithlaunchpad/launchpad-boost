"use client";

const calendlyUrl = "https://calendly.com/ops-boostwithlaunchpad/30min";

interface CalendlyButtonProps {
  children: React.ReactNode;
  className?: string;
}

export default function CalendlyButton({ children, className }: CalendlyButtonProps) {
  const openCalendly = () => {
    const win = window as unknown as Record<string, { initPopupWidget: (opts: { url: string }) => void }>;
    if (win.Calendly) {
      win.Calendly.initPopupWidget({ url: calendlyUrl });
    }
  };

  return (
    <button onClick={openCalendly} className={className}>
      {children}
    </button>
  );
}
