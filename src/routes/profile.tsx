import { createFileRoute } from "@tanstack/react-router";
import GodmanProfile from "../components/User/GodmanProfile";

export const Route = createFileRoute("/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  return <GodmanProfile />;
}
