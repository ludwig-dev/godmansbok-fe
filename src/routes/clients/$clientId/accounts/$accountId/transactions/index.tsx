import { createFileRoute } from "@tanstack/react-router";
import TransactionListPage from "../../../../../../components/Transaction/TransactionListPage";

export const Route = createFileRoute("/clients/$clientId/accounts/$accountId/transactions/")(
  {
    component: TransactionListPage,
  }
);
