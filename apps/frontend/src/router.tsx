import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import { DashboardPage } from "./pages/dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      // Placeholders for other routes shown in the sidebar
      { path: "tasks", element: <div>Tasks Page</div> },
      { path: "activity", element: <div>Activity Page</div> },
      { path: "customers", element: <div>Customers Page</div> },
      { path: "settings", element: <div>Settings Page</div> },
    ],
  },
]);
