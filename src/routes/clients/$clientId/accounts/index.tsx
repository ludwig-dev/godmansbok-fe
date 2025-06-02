import { createFileRoute } from "@tanstack/react-router";
import AccountsListPage from "../../../../components/Accounts/AccountListPage";

export const Route = createFileRoute("/clients/$clientId/accounts/")({
  component: AccountsListPage,
});
