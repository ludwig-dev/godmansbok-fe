import { createFileRoute } from "@tanstack/react-router";
import LiabilityDetailPage from "../../../../../components/Liabilities/LiabilityDetailPage";

export const Route = createFileRoute(
  "/clients/$clientId/liabilities/$liabilityId/"
)({
  component: LiabilityDetailPage,
});
