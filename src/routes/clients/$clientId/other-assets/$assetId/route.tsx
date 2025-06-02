import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/clients/$clientId/other-assets/$assetId"
)({
  component: () => (
    <div className="space-y-6">
      {/* Sätter ram och låter child‐route (index.tsx) renderas här */}
      <Outlet />
    </div>
  ),
});
