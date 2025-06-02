import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/clients/$clientId/accounts/$accountId/transactions"
)({
  component: () => (
    <div className="space-y-6">
      {/* Här renderas "/transactions", "/transactions/new" eller "/transactions/:transactionId" */}
      <Outlet />
    </div>
  ),
});
