import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/clients/$clientId")({
  component: () => (
    <div>
      <Outlet /> {/* index.tsx eller new.tsx eller $clientId/route.tsx */}
    </div>
  ),
});
