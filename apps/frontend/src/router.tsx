import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import { DashboardPage } from "./pages/dashboard";
import { LeadsPage } from "./pages/leads/LeadsPage";
import { CreateLeadPage } from "./pages/leads/CreateLeadPage";
import { CreateProposalPage } from "./pages/proposals/CreateProposalPage";
import { CustomersPage } from "./pages/customers/CustomersPage";

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
      { path: "leads", element: <LeadsPage /> },
      { path: "leads/create", element: <CreateLeadPage /> },
      { path: "leads/:leadId/proposals/create", element: <CreateProposalPage /> },
      { path: "tasks", element: <div>Tasks Page</div> },
      { path: "activity", element: <div>Activity Page</div> },
      { path: "customers", element: <CustomersPage /> },
      { path: "settings", element: <div>Settings Page</div> },
    ],
  },
]);
