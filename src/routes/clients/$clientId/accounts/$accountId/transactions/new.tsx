import { createFileRoute } from "@tanstack/react-router";
import TransactionCreatePage from "../../../../../../components/Transaction/TransactionCreatePage";

export const Route = createFileRoute(
  "/clients/$clientId/accounts/$accountId/transactions/new"
)({
  component: TransactionCreatePage,
});
