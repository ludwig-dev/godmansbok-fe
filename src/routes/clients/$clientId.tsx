import { createFileRoute } from "@tanstack/react-router";
import ClientDetailPage from "../../components/Clients/ClientDetailPage";
export const Route = createFileRoute("/clients/$clientId")({
  component: ClientDetailPage,
});
