// src/routes/clients/new.tsx
import { useNavigate } from "@tanstack/react-router";
import { Route } from "../../routes/clients/$clientId";

export default function ClientDetailPage() {
  const { clientId } = Route.useParams();
  const id = Number(clientId);
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <p className="text-gray-700">
        Detta är översiktssidan för Huvudman: {id}. Härifrån kan du:
      </p>
      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => navigate({ to: `/clients/${id}/accounts` })}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Se konton
        </button>
        <button
          onClick={() => navigate({ to: `/clients/${id}/other-assets` })}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Lägg till tillgångar
        </button>
        <button
          onClick={() => navigate({ to: `/clients/${id}/liabilities` })}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Lägg till skulder
        </button>
        <button
          onClick={() =>
            navigate({
              to: `/clients/${id}/summary`,
              search: (old) => ({ ...old, year: new Date().getFullYear() }),
            })
          }
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Visa sammanställning
        </button>
      </div>
    </div>
  );
}
