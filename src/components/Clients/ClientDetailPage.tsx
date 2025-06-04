// src/routes/clients/new.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Route } from "../../routes/clients/$clientId";
import { Landmark, Archive, XCircle, FileText, Pencil } from "lucide-react";
import { useClient, type ClientDTO } from "../../hooks/useClients";
import { useUpdateClient } from "../../hooks/useClients";
import Modal from "../../components/UI/Modal";
import DeleteClientButton from "./DeleteClientButton";

export default function ClientDetailPage() {
  const { clientId } = Route.useParams<{ clientId: string }>();
  const id = Number(clientId);
  const navigate = useNavigate();

  const { data: client, isLoading } = useClient(id);
  const updateClient = useUpdateClient(id);

  const [showEditModal, setShowEditModal] = useState(false);
  const [name, setName] = useState("");
  const [personalNumber, setPersonalNumber] = useState("");

  useEffect(() => {
    if (client) {
      setName(client.name);
      setPersonalNumber(client.personalNumber);
    }
  }, [client]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !personalNumber.trim()) {
      alert("Både namn och personnummer måste fyllas i.");
      return;
    }
    updateClient.mutate(
      { name: name.trim(), personalNumber: personalNumber.trim() },
      {
        onSuccess: () => {
          setShowEditModal(false);
        },
      }
    );
  };

  if (isLoading || !client) {
    return (
      <div className="flex items-center justify-center h-full p-4">
        <p className="text-gray-500">Hämtar huvudman...</p>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
          {/* Title + buttons aligned on one line */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-800">
              Huvudman: {client.name}
            </h2>
            <div className="flex gap-2">
              <DeleteClientButton clientId={id} />
              <button
                onClick={() => setShowEditModal(true)}
                className="p-2 hover:bg-gray-100 rounded"
                aria-label="Ändra huvudman"
              >
                <Pencil className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>

          <p className="text-gray-500 text-sm">
            Personnr: {client.personalNumber ? client.personalNumber : "saknas"}
          </p>
          <p className="text-gray-700">
            Detta är översiktssidan för huvudmannen. Välj en av nedanstående
            åtgärder:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => navigate({ to: `/clients/${id}/accounts` })}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 text-white rounded hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600"
            >
              <Landmark className="w-5 h-5" />
              Bankkonto
            </button>

            <button
              onClick={() => navigate({ to: `/clients/${id}/other-assets` })}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 text-white rounded hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600"
            >
              <Archive className="w-5 h-5" />
              Övriga tillgångar
            </button>

            <button
              onClick={() => navigate({ to: `/clients/${id}/liabilities` })}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 text-white rounded hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600"
            >
              <XCircle className="w-5 h-5" />
              Skulder
            </button>

            <button
              onClick={() =>
                navigate({
                  to: `/clients/${id}/summary`,
                  search: (old) => ({
                    ...old,
                    year: new Date().getFullYear().toString(),
                  }),
                })
              }
              className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 text-white rounded hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600"
            >
              <FileText className="w-5 h-5" />
              Sammanställning
            </button>
          </div>
        </div>
      </div>

      {/* Modal för att editera klient */}
      {showEditModal && (
        <Modal isOpen onClose={() => setShowEditModal(false)}>
          <div className="max-w-md mx-auto ">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Redigera huvudman
            </h3>
            <form onSubmit={handleSave} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-1">
                  Namn
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label
                  htmlFor="personalNumber"
                  className="block text-gray-700 mb-1"
                >
                  Personnummer
                </label>
                <input
                  id="personalNumber"
                  type="text"
                  value={personalNumber}
                  onChange={(e) => setPersonalNumber(e.target.value)}
                  required
                  maxLength={12}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Avbryt
                </button>
                <button
                  type="submit"
                  disabled={updateClient.isPending}
                  className={`flex items-center justify-center gap-2 px-4 py-2 text-white font-medium rounded ${
                    updateClient.isPending
                      ? "bg-gray-800 cursor-not-allowed"
                      : "bg-gray-800 hover:bg-gray-900"
                  } focus:outline-none focus:ring-2 focus:ring-gray-600`}
                >
                  {updateClient.isPending ? "Sparar…" : "Spara ändringar"}
                </button>
              </div>

              {updateClient.isError && (
                <p className="text-red-500 text-sm mt-2">
                  Fel: {(updateClient.error as any).message || "Okänt fel"}
                </p>
              )}
            </form>
          </div>
        </Modal>
      )}
    </>
  );
}
