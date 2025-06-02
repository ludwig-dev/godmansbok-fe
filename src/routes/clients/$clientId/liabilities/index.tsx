import { createFileRoute } from "@tanstack/react-router";
import LiabilityListPage from "../../../../components/Liabilities/LiabilityListPage";

export const Route = createFileRoute("/clients/$clientId/liabilities/")({
  component: LiabilityListPage,
});
