// src/routes/clients/new.tsx
import { useNavigate } from "@tanstack/react-router";
import { Route } from "../../routes/clients/$clientId";
import { Landmark, Archive, XCircle, FileText } from "lucide-react";
import { useClient, type ClientDTO } from "../../hooks/useClients";

export default function ClientDetailPage() {
  const { clientId } = Route.useParams();
  const id = Number(clientId);
  const { data: client, isLoading} = useClient(id);
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full p-4">
        <p className="text-gray-500">Hämtar huvudman...</p>
      </div>
    );
  }

  console.log("ClientDetailPage", { client });
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Huvudman: {client?.name || "Laddar..."}
          <p>
            <span className="text-gray-500 text-sm">
              PersonNmr: {client?.personalNumber ? ` ${client.personalNumber}` : "saknas"}
            </span>
          </p>
        </h2>
        <p className="text-gray-700">
          Detta är översiktssidan för huvudmannen. Välj en av
          nedanstående åtgärder:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => navigate({ to: `/clients/${id}/accounts` })}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 text-white rounded hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600"
          >
            <Landmark className="w-5 h-5" />
            Se konton
          </button>

          <button
            onClick={() =>
              navigate({ to: `/clients/${id}/other-assets` })
            }
            className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 text-white rounded hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600"
          >
            <Archive className="w-5 h-5" />
            Lägg till tillgångar
          </button>

          <button
            onClick={() =>
              navigate({ to: `/clients/${id}/liabilities` })
            }
            className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 text-white rounded hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600"
          >
            <XCircle className="w-5 h-5" />
            Lägg till skulder
          </button>

          <button
            onClick={() =>
              navigate({
                to: `/clients/${id}/summary`,
                search: (old) => ({
                  ...old,
                  year: new Date().getFullYear(),
                }),
              })
            }
            className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 text-white rounded hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600"
          >
            <FileText className="w-5 h-5" />
            Visa sammanställning
          </button>
        </div>
      </div>
    </div>
  );
}
