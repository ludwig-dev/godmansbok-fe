import { createFileRoute } from "@tanstack/react-router";
import SummaryPage from "../../../components/Summary/SummaryPage";
export const Route = createFileRoute("/clients/$clientId/summary")({
  component: SummaryPage,
});
