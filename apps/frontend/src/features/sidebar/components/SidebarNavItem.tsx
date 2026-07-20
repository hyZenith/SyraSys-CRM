import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface SidebarNavItemProps {
  item: {
    id: string;
    label: string;
    icon: LucideIcon;
    path: string;
  };
  isActive: boolean;
}

export function SidebarNavItem({ item, isActive }: SidebarNavItemProps) {
  const Icon = item.icon;

  return (
    <Link
      to={item.path}
      className={`
        flex items-center gap-3 px-4 py-3 rounded-2xl transition-colors
        ${
          isActive
            ? "bg-[var(--color-cream)] text-[var(--color-ink)] font-semibold"
            : "text-[var(--color-muted)] hover:bg-[var(--color-cream)]/50 hover:text-[var(--color-ink)]"
        }
      `}
    >
      <Icon
        size={20}
        className={isActive ? "text-[var(--color-ink)]" : "text-[var(--color-muted)]"}
        strokeWidth={isActive ? 2.5 : 2}
      />
      <span>{item.label}</span>
    </Link>
  );
}
