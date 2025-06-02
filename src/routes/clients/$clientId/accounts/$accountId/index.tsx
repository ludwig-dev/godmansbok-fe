import { createFileRoute } from "@tanstack/react-router";
import AccountDetailPage from "../../../../../components/Accounts/AccountDetailPage";

export const Route = createFileRoute("/clients/$clientId/accounts/$accountId/")({
  component: AccountDetailPage,
});
