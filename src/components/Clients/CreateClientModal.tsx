// src/components/Clients/CreateClientModal.tsx
import { type FormEvent, useState } from "react";
import { useCreateClient, type ClientDTO } from "../../hooks/useClients";

interface CreateClientModalProps {
  onClose: () => void;
  onCreated: (newClient: ClientDTO) => void;
}

export default function CreateClientModal({
  onClose,
  onCreated,
}: CreateClientModalProps) {
  const createClient = useCreateClient();
  const [name, setName] = useState("");
  const [personalNumber, setPersonalNumber] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !personalNumber.trim()) {
      alert("Både namn och personnummer måste fyllas i.");
      return;
    }

    createClient.mutate(
      { name: name.trim(), personalNumber: personalNumber.trim() },
      {
        onSuccess: (data) => {
          onCreated(data);
          onClose();
        },
      }
    );
  };

  return (
    <div className="space-y-4 w-full max-w-md mx-auto">
      <h3 className="text-xl font-semibold text-gray-800">Ny huvudman</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
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
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        <div>
          <label htmlFor="personalNumber" className="block text-gray-700 mb-1">
            Personnummer
          </label>
          <input
            id="personalNumber"
            type="text"
            value={personalNumber}
            onChange={(e) => setPersonalNumber(e.target.value)}
            required
            maxLength={12}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        <button
          type="submit"
          disabled={createClient.isPending}
          className={`w-full flex justify-center items-center px-4 py-2 text-white font-medium rounded ${
            createClient.isPending
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
        >
          {createClient.isPending ? "Skapar…" : "Skapa klient"}
        </button>
        {createClient.isError && (
          <p className="text-red-500 text-sm mt-2">
            Ett fel uppstod:{" "}
            {(createClient.error as any).message || "Okänt fel"}
          </p>
        )}
      </form>
    </div>
  );
}
