import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/clients/$clientId/accounts/$accountId/transactions/$transactionId"
)({
  component: () => (
    <div>
      <Outlet />
    </div>
  ),
});
