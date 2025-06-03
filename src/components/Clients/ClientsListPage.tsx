// src/components/Clients/ClientsListPage.tsx
import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useClients, type ClientDTO } from "../../hooks/useClients";
import Modal from "../UI/Modal";
import CreateClientModal from "./CreateClientModal";

export default function ClientsListPage() {
  const { data: clients, isLoading, isError, error, refetch } = useClients();
  const [showCreateModal, setShowCreateModal] = useState(false);

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

  const handleCreated = (newClient: ClientDTO) => {
    // Efter ny klient har skapats, refetcha listan
    refetch();
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto pt-8">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Godmanslista</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center px-4 py-2 bg-green-700 text-white rounded hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-600"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Ny Huvudman
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
                className="inline-flex items-center px-3 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600"
              >
                Öppna
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">Du har inga klienter ännu.</p>
      )}

      {/* Modal för att skapa ny klient */}
      {showCreateModal && (
        <Modal isOpen onClose={() => setShowCreateModal(false)}>
          <CreateClientModal
            onClose={() => setShowCreateModal(false)}
            onCreated={handleCreated}
          />
        </Modal>
      )}
    </div>
  );
}
