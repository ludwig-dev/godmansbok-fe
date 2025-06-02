// src/components/Accounts/AccountCreatePage.tsx
import React, { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Route } from "../../routes/clients/$clientId/accounts/route";
import { useCreateAccount } from "../../hooks/useAccounts";

export default function AccountCreatePage() {
  const { clientId } = Route.useParams();
  const cid = Number(clientId);

  const navigate = useNavigate();
  // Hook för att skapa ett konto
  const createAccount = useCreateAccount(cid);

  // Lokala state‐variabler för formuläret
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  // Submithanterare
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountName.trim()) {
      alert("Kontonamn måste anges.");
      return;
    }

    createAccount.mutate(
      { accountName, accountNumber },
      {
        onSuccess: () => {
          // När kontot är skapat, navigera tillbaka till kontolistan
          navigate({ to: `/clients/${cid}/accounts` });
        },
      }
    );
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Nytt konto</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="accountName" className="block text-gray-700 mb-1">
            Kontonamn
          </label>
          <input
            id="accountName"
            type="text"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label htmlFor="accountNumber" className="block text-gray-700 mb-1">
            Kontonummer{" "}
            <span className="text-sm text-gray-400">(valfritt)</span>
          </label>
          <input
            id="accountNumber"
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          disabled={createAccount.isPending}
          className={`w-full flex justify-center items-center px-4 py-2 text-white font-medium rounded ${
            createAccount.isPending
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
        >
          {createAccount.isPending ? "Skapar konto…" : "Skapa konto"}
        </button>

        {createAccount.isError && (
          <p className="text-red-500 text-sm mt-2">
            Fel: {(createAccount.error as any).message || "Okänt fel"}
          </p>
        )}
      </form>
    </div>
  );
}
