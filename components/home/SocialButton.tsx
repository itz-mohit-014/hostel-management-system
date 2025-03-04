
import { ReactNode } from "react";

interface SocialButtonProps {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  provider: string;
}

const SocialButton = ({ icon, label, onClick, provider }: SocialButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center justify-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm font-medium shadow-sm transition-all duration-200 hover:bg-muted focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary/30"
      aria-label={`Sign in with ${provider}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

export default SocialButton;
