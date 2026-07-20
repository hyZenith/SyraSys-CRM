import { Outlet } from "react-router-dom";
import { Sidebar } from "./features/sidebar";
import { Topbar } from "./features/topbar";

export default function App() {
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
