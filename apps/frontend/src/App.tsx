import { Outlet } from "react-router-dom";
import { Sidebar } from "./features/sidebar";
import { Topbar } from "./features/topbar";
import { authClient } from "./lib/auth";
import { LoginPage } from "./pages/LoginPage";

export default function App() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[var(--color-cream)]">
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
    <div className="flex h-screen w-screen overflow-hidden bg-[var(--color-cream)]">
      {/* Fixed Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex flex-1 flex-col overflow-y-auto">
        <Topbar />
        <div className="flex-1 p-8 pt-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
