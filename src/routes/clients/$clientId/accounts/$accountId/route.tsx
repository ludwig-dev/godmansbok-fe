import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/clients/$clientId/accounts/$accountId")({
  component: () => (
    <div>
      {/* Här får Outlet rendera index.tsx (översikten) eller ev. fler under‐rutter */}
      <Outlet />
    </div>
  ),
});
