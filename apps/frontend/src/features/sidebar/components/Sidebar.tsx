import { SidebarNavItem } from "./SidebarNavItem";
import { LayoutGrid, ClipboardList, Activity, Users, Settings, MoreHorizontal } from "lucide-react";
import { useActiveNavItem } from "../hooks/useActiveNavItem";
import { authClient } from "../../../lib/auth";

export function Sidebar() {
  const activeItem = useActiveNavItem();
  const { data: session } = authClient.useSession();

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutGrid, path: "/dashboard" },
    { id: "leads", label: "Leads", icon: ClipboardList, path: "/leads" },
    { id: "activity", label: "Activity", icon: Activity, path: "/activity" },
    { id: "customers", label: "Customers", icon: Users, path: "/customers" },
    { id: "settings", label: "Settings", icon: Settings, path: "/settings" },
  ];

  const handleLogout = async () => {
    await authClient.signOut();
    window.location.reload();
  };

  const userInitials = session?.user?.name
    ? session.user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    // Sidebar is a standalone floating rounded panel — all 4 corners rounded,
    // inset from the outer canvas on all sides (canvas gap shows through).
    <aside className="w-[260px] bg-[var(--color-cream)] h-full flex flex-col rounded-[20px] shrink-0 overflow-hidden">
      {/* Logo Area */}
      <div className="px-6 pt-6 pb-4 flex items-center gap-3">
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
      <nav className="px-4 space-y-1">
        {navItems.map((item) => (
          <SidebarNavItem key={item.id} item={item} isActive={activeItem === item.id} />
        ))}
      </nav>

      {/* Spacer to push admin block to bottom */}
      <div className="flex-1" />

      {/* Admin Account Block — pinned at bottom */}
      <div className="mx-3 mb-3 p-3 bg-white rounded-2xl border border-[var(--color-border)]">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-9 h-9 rounded-full bg-[var(--color-ink)] text-white flex items-center justify-center font-bold text-sm shrink-0">
            {userInitials}
          </div>

          {/* Name + Role */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[var(--color-ink)] truncate leading-tight">
              {session?.user?.name || "Admin User"}
            </p>
            <p className="text-xs text-[var(--color-muted)] truncate leading-tight">
              {(session?.user as any)?.role || "Administrator"}
            </p>
          </div>

          {/* Options icon */}
          <button
            onClick={handleLogout}
            title="Log out"
            className="text-[var(--color-muted)] hover:text-[var(--color-ink)] transition-colors p-1 rounded-lg hover:bg-[var(--color-border)]"
          >
            <MoreHorizontal size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
}
