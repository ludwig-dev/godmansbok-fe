import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/clients/$clientId/liabilities")({
  component: () => (
    <div className="space-y-6">
      {/* Här renderas index.tsx, new.tsx eller $liabilityId/route.tsx */}
      <Outlet />
    </div>
  ),
});
