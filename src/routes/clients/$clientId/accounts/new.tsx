import { createFileRoute } from "@tanstack/react-router";
import AccountCreatePage from "../../../../components/Accounts/AccountCreatePage";

export const Route = createFileRoute("/clients/$clientId/accounts/new")({
  component: AccountCreatePage,
});
