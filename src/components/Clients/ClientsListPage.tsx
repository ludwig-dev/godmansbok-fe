import { useNavigate, Link, Outlet } from "@tanstack/react-router";
import { useClients } from "../../hooks/useClients";
import type { ClientDTO } from "../../hooks/useClients";

export default function ClientsListPage() {
  const navigate = useNavigate();
  const { data: clients, isLoading, isError, error } = useClients();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full p-4">
        <p className="text-gray-500">Hämtar klienter…</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-full p-4">
        <p className="text-red-500">
          Ett fel uppstod: {(error as any).message}
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Godmanslista</h1>
        <button
          onClick={() => navigate({ to: "/clients/new" })}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          + Ny klient
        </button>
      </header>

      {clients && clients.length > 0 ? (
        <ul className="space-y-4">
          {clients.map((client: ClientDTO) => (
            <li
              key={client.id}
              className="flex items-center justify-between bg-white shadow-sm rounded-lg p-4 hover:shadow-md transition"
            >
              <div>
                <p className="text-lg font-medium text-gray-900">
                  {client.name}
                </p>
                <p className="text-sm text-gray-500">
                  Personnr: {client.personalNumber}
                </p>
              </div>
              <Link
                to={`/clients/${client.id}`}
                className="inline-flex items-center px-3 py-2 bg-green-500 text-white text-sm font-medium rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                Öppna
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">Du har inga klienter ännu.</p>
      )}

      {/* Om du har nested routes (t.ex. /clients/new) kan de visas här */}
      <Outlet />
    </div>
  );
}
