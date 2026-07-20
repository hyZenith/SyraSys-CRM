import { SidebarNavItem } from "./SidebarNavItem";
import { MembersList } from "./MembersList";
import { PriorityDealCard } from "./PriorityDealCard";
import { LayoutGrid, ClipboardList, Activity, Users, Settings } from "lucide-react";
import { useActiveNavItem } from "../hooks/useActiveNavItem";

export function Sidebar() {
  const activeItem = useActiveNavItem();

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutGrid, path: "/dashboard" },
    { id: "leads", label: "Leads", icon: ClipboardList, path: "/leads" },
    { id: "activity", label: "Activity", icon: Activity, path: "/activity" },
    { id: "customers", label: "Customers", icon: Users, path: "/customers" },
    { id: "settings", label: "Settings", icon: Settings, path: "/settings" },
  ];

  return (
    <aside className="w-[260px] bg-white h-full flex flex-col border-r border-[var(--color-border)]">
      {/* Logo Area */}
      <div className="p-8 flex items-center gap-3">
        <div className="w-10 h-10 bg-[var(--color-ink)] rounded-full flex items-center justify-center shrink-0">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        </div>
        <span className="font-bold text-xl text-[var(--color-ink)]">SyraSys</span>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => (
          <SidebarNavItem key={item.id} item={item} isActive={activeItem === item.id} />
        ))}
      </nav>

      {/* Bottom Sections */}
      <div className="px-6 pb-6 space-y-8">
        <MembersList />
        <PriorityDealCard />
      </div>
    </aside>
  );
}
