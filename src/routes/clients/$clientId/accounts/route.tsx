import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/clients/$clientId/accounts")({
  component: () => (
    <div>
      <Outlet />
    </div>
  ),
});
