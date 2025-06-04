import { createFileRoute } from "@tanstack/react-router";
import ProgramOverview from "../components/UI/ProgramOverview";

export const Route = createFileRoute("/")({
  component: ProgramOverview,
});
