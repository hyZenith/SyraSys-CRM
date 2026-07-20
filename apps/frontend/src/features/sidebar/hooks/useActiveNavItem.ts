import { useLocation } from "react-router-dom";

export function useActiveNavItem() {
  const location = useLocation();
  const path = location.pathname.split("/")[1] || "dashboard";
  return path;
}
