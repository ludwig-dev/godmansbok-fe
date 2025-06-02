// src/components/Accounts/AccountDetailPage.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Route } from "../../routes/clients/$clientId/accounts/$accountId/route";
import { useAccount, useUpdateAccount } from "../../hooks/useAccounts";

export default function AccountDetailPage() {
  // 1) Hämta clientId och accountId från denna rutt
  const { clientId, accountId } = Route.useParams<{
    clientId: string;
    accountId: string;
  }>();
  const cid = Number(clientId);
  const aid = Number(accountId);
  const navigate = useNavigate();

  // 2) Hook för att läsa in konto‐data
  const { data: account, isLoading, isError } = useAccount(cid, aid);
  // 3) Hook för att uppdatera kontodata (inklusive startBalance, endBalance, year)
  const updateAccount = useUpdateAccount(cid, aid);

  // Lokala state‐variabler för redigeringsform
  const [editName, setEditName] = useState("");
  const [editNumber, setEditNumber] = useState("");
  const [startBalance, setStartBalance] = useState<string>("");
  const [endBalance, setEndBalance] = useState<string>("");

  // När kontot laddas: förifyll formuläret
  useEffect(() => {
    if (account) {
      setEditName(account.accountName);
      setEditNumber(account.accountNumber || "");
      setStartBalance(
        account.startBalance !== null ? account.startBalance.toString() : ""
      );
      setEndBalance(
        account.endBalance !== null ? account.endBalance.toString() : ""
      );
    }
  }, [account]);

  if (isLoading) {
    return <p className="text-gray-500 py-6">Laddar konto…</p>;
  }
  if (isError || !account) {
    return <p className="text-red-500 py-6">Kontot hittades inte</p>;
  }

  // 4) Funktion för att spara ändringar
  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    if (!editName.trim()) {
      alert("Kontonamn får inte vara tomt.");
      return;
    }
    if (startBalance.trim() === "" || endBalance.trim() === "") {
      alert("Ange både ingående och utgående saldo.");
      return;
    }

    updateAccount.mutate(
      {
        accountName: editName.trim(),
        accountNumber: editNumber.trim() || null,
        startBalance: Number(startBalance),
        endBalance: Number(endBalance),
      },
      {
        onSuccess: () => {
          // Efter lyckad uppdatering refetchar useAccount‐hook automatiskt
        },
      }
    );
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 space-y-6">
      <header className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          Konto: <span className="text-blue-600">{account.accountName}</span>
        </h2>
        <button
          onClick={() => navigate({ to: `/clients/${cid}/accounts` })}
          className="px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          ← Alla konton
        </button>
      </header>

      {/* Formulär för att redigera konto + år + saldon */}
      <form onSubmit={handleUpdate} className="space-y-5">
        {/* Kontonamn */}
        <div>
          <label htmlFor="editName" className="block text-gray-700 mb-1">
            Kontonamn
          </label>
          <input
            id="editName"
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Kontonummer (valfritt) */}
        <div>
          <label htmlFor="editNumber" className="block text-gray-700 mb-1">
            Kontonummer{" "}
            <span className="text-sm text-gray-400">(valfritt)</span>
          </label>
          <input
            id="editNumber"
            type="text"
            value={editNumber}
            onChange={(e) => setEditNumber(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Ingående saldo */}
        <div>
          <label htmlFor="startBalance" className="block text-gray-700 mb-1">
            Ingående saldo (1 jan)
          </label>
          <input
            id="startBalance"
            type="number"
            step="0.01"
            value={startBalance}
            onChange={(e) => setStartBalance(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Utgående saldo */}
        <div>
          <label htmlFor="endBalance" className="block text-gray-700 mb-1">
            Utgående saldo (31 dec)
          </label>
          <input
            id="endBalance"
            type="number"
            step="0.01"
            value={endBalance}
            onChange={(e) => setEndBalance(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          disabled={updateAccount.isPending}
          className={`w-full flex justify-center items-center px-4 py-2 text-white font-medium rounded ${
            updateAccount.isPending
              ? "bg-green-300 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          } focus:outline-none focus:ring-2 focus:ring-green-500`}
        >
          {updateAccount.isPending ? "Sparar…" : "Spara ändringar"}
        </button>

        {updateAccount.isError && (
          <p className="text-red-500 text-sm mt-2">
            Fel: {(updateAccount.error as any).message || "Okänt fel"}
          </p>
        )}
      </form>
    </div>
  );
}
