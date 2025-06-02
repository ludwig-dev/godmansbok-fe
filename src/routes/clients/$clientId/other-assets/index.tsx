import { createFileRoute } from "@tanstack/react-router";
import OtherAssetsListPage from "../../../../components/OtherAssets/OtherAssetsListPage";

export const Route = createFileRoute("/clients/$clientId/other-assets/")({
  component: OtherAssetsListPage,
});
