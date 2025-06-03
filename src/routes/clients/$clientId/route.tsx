import { createFileRoute, Outlet } from "@tanstack/react-router";
import ClientNavbar from "../../../components/UI/ClientNavbar";

export const Route = createFileRoute("/clients/$clientId")({
  component: () => (
    <>

      <ClientNavbar />
      <div className="">
        <Outlet /> {/* renderar index.tsx, accounts, other-assets, etc. */}
      </div>
    </>
  ),
});
