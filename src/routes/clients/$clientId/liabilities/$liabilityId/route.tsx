import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/clients/$clientId/liabilities/$liabilityId"
)({
  component: () => (
    <div className="space-y-6">
      {/* Här renderas $liabilityId/index.tsx */}
      <Outlet />
    </div>
  ),
});
