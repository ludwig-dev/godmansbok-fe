import { createFileRoute } from "@tanstack/react-router";
import OtherAssetDetailPage from "../../../../../components/OtherAssets/OtherAssetDetailPage";

export const Route = createFileRoute(
  "/clients/$clientId/other-assets/$assetId/"
)({
  component: OtherAssetDetailPage,
});
