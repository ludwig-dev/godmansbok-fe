// src/routes/clients/new.tsx
import React, { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useCreateClient } from "../../hooks/useClients";

export default function ClientCreatePage() {
  const navigate = useNavigate();
  const createClientMutation = useCreateClient();

  const [name, setName] = useState("");
  const [personalNumber, setPersonalNumber] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !personalNumber.trim()) {
      alert("Både namn och personnummer måste fyllas i.");
      return;
    }

    createClientMutation.mutate(
      { name, personalNumber },
      {
        onSuccess: () => {
          navigate({ to: "/clients" });
        },
      }
    );
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Skapa ny klient
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-gray-700 mb-1" htmlFor="name">
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
          <label className="block text-gray-700 mb-1" htmlFor="personalNumber">
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

        <button
          type="submit"
          disabled={createClientMutation.isPending}
          className={`w-full flex justify-center items-center px-4 py-2 text-white font-medium rounded ${
            createClientMutation.isPending
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
        >
          {createClientMutation.isPending ? "Skapar…" : "Skapa klient"}
        </button>

        {createClientMutation.isError && (
          <p className="text-red-500 text-sm mt-2">
            Ett fel uppstod:{" "}
            {(createClientMutation.error as any).message || "Okänt fel"}
          </p>
        )}
      </form>
    </div>
  );
}
