import { useState } from "react";
import { Eye, EyeOff, KeyRound } from "lucide-react";
import { authClient } from "../lib/auth";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { error: authError } = await authClient.signIn.email({
        email,
        password,
      });
      if (authError) {
        setError(authError.message || "Failed to log in");
      } else {
        // Refresh page or trigger context state to fetch session
        window.location.reload();
      }
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemoAdmin = () => {
    setEmail("admin@syracrm.com");
    setPassword("AdminPassword123!");
    setError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-cream)] p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-[var(--color-ink)] rounded-full flex items-center justify-center mb-3">
            <svg
              width="24"
              height="24"
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
          <h2 className="text-2xl font-bold text-[var(--color-ink)]">Welcome to SyraSys</h2>
          <p className="text-sm text-gray-500 mt-1">Please sign in to access the CRM</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 rounded-lg text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5" autoComplete="on">
          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="username email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onInput={(e: any) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-ink)]/10 focus:border-[var(--color-ink)] transition text-gray-900 bg-white"
              placeholder="admin@syracrm.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onInput={(e: any) => setPassword(e.target.value)}
                className="w-full pl-4 pr-12 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-ink)]/10 focus:border-[var(--color-ink)] transition text-gray-900 bg-white"
                placeholder="••••••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600 p-0.5 rounded-md transition-colors"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[var(--color-ink)] text-white font-medium hover:bg-black/90 active:scale-[0.98] transition disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Demo Admin Helper */}
        <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col items-center">
          <button
            type="button"
            onClick={handleFillDemoAdmin}
            className="text-xs text-gray-500 hover:text-[var(--color-ink)] font-medium inline-flex items-center gap-1.5 transition-colors p-2 rounded-lg hover:bg-gray-50"
          >
            <KeyRound size={14} /> Fill Demo Admin Credentials
          </button>
        </div>
      </div>
    </div>
  );
}
