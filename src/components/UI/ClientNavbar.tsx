// src/components/Clients/ClientNavbar.tsx
import { Link, useLocation } from "@tanstack/react-router";
import { Route } from "../../routes/clients/$clientId/route";

export default function ClientNavbar() {
  // 1) Läs av clientId från route‐parametrar
  const { clientId } = Route.useParams<{ clientId: string }>();
  const cid = Number(clientId);

  // 2) Definiera klient‐specifika rutter
  const tabs: { label: string; to: string }[] = [
    { label: "Översikt", to: `/clients/${cid}` },
    { label: "Konto", to: `/clients/${cid}/accounts` },
    { label: "Tillgångar", to: `/clients/${cid}/other-assets` },
    { label: "Skulder", to: `/clients/${cid}/liabilities` },
    { label: "Smmanställning", to: `/clients/${cid}/summary` },
  ];

  // 3) Läs av nuvarande sökväg för att markera aktiv flik
  const { pathname } = useLocation();

  return (
    <nav className="w-full bg-gray-100 border-b border-gray-300 print:hidden">
      <div className="max-w-3xl mx-auto px-4">
        <ul className="flex justify-center space-x-4 py-2">
          {tabs.map((tab) => {
            const isActive = pathname === tab.to;
            return (
              <li key={tab.to}>
                <Link
                  to={tab.to}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-blue-200"
                  }`}
                >
                  {tab.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
