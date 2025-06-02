import { createFileRoute } from "@tanstack/react-router";
import TransactionDetailPage from "../../../../../../../components/Transaction/TransactionDetailPage";

export const Route = createFileRoute(
  "/clients/$clientId/accounts/$accountId/transactions/$transactionId/"
)({
  component: TransactionDetailPage,
});
