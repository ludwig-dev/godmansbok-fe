import { createFileRoute } from "@tanstack/react-router";
import SummaryContainer from "../../../components/Summary/SummaryContainer";
export const Route = createFileRoute("/clients/$clientId/summaryprint")({
  component: SummaryContainer,
});
