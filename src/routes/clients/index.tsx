import { createFileRoute } from "@tanstack/react-router";
import ClientsListPage from "../../components/Clients/ClientsListPage";
export const Route = createFileRoute("/clients/")({
  component: ClientsListPage,
});
