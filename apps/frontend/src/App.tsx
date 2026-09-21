import { Outlet } from "react-router-dom";
import { Sidebar } from "./features/sidebar";
import { Topbar } from "./features/topbar";
import { authClient } from "./lib/auth";
import { LoginPage } from "./pages/LoginPage";

export default function App() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[var(--color-canvas)]">
        <div className="text-sm font-medium text-[var(--color-ink)] animate-pulse">
          Loading SyraSys...
        </div>
      </div>
    );
  }

  if (!session) {
    return <LoginPage />;
  }

  return (
    // Outer canvas — warm grey, the "tray" behind all floating panels
    <div className="flex h-screen w-screen overflow-hidden bg-[var(--color-canvas)] p-3 gap-3">
      {/* Sidebar: its own independently-rounded floating panel, inset from canvas */}
      <Sidebar />

      {/* Main content: its own independently-rounded floating panel */}
      <main className="flex flex-1 flex-col overflow-y-auto bg-[var(--color-cream)] rounded-[20px] min-w-0">
        <Topbar />
        <div className="flex-1 px-8 pb-8 pt-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
