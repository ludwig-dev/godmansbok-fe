import { createFileRoute } from "@tanstack/react-router";
import OtherAssetCreatePage from "../../../../components/OtherAssets/OtherAssetCreatePage";

export const Route = createFileRoute("/clients/$clientId/other-assets/new")({
  component: OtherAssetCreatePage,
});
