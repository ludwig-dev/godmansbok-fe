import { createFileRoute } from "@tanstack/react-router";
import ClientCreatePage from "../../components/Clients/ClientCreatePage";
export const Route = createFileRoute("/clients/new")({
  component: ClientCreatePage,
});
