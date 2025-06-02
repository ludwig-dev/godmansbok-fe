import { createFileRoute } from "@tanstack/react-router";
import LiabilityCreatePage from "../../../../components/Liabilities/LiabilityCreatePage";

export const Route = createFileRoute("/clients/$clientId/liabilities/new")({
  component: LiabilityCreatePage,
});
