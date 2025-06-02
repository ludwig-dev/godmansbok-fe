import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/clients/$clientId/other-assets")({
  component: () => (
    <div className="space-y-6">
      {/* Här renderas index.tsx, new.tsx eller $assetId/route.tsx */}
      <Outlet />
    </div>
  ),
});
