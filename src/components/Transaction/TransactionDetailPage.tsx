// src/components/Transactions/TransactionDetailPage.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Route } from "../../routes/clients/$clientId/accounts/$accountId/transactions/$transactionId/route";
import {
  useTransaction,
  useUpdateTransaction,
} from "../../hooks/useTransactions";

export default function TransactionDetailPage() {
  // 1) Lås in parametrarna för denna ruta
  const { clientId, accountId, transactionId } = Route.useParams<{
    clientId: string;
    accountId: string;
    transactionId: string;
  }>();
  const cid = Number(clientId);
  const aid = Number(accountId);
  const tid = Number(transactionId);
  const navigate = useNavigate();

  // 2) Hook för att hämta detalj‐info om transaktionen
  const {
    data: transaction,
    isLoading,
    isError,
  } = useTransaction(cid, aid, tid);
  // 3) Hook för att uppdatera transaktionen
  const updateTx = useUpdateTransaction(cid, aid, tid);

  // Lokala state‐variabler som fylls initialt när “transaction” är inläst
  const [date, setDate] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [type, setType] = useState<"INKOMST" | "UTGIFT">("INKOMST");
  const [description, setDescription] = useState<string>("");
  const [attachmentNumber, setAttachmentNumber] = useState<string>("");

  useEffect(() => {
    if (transaction) {
      setDate(transaction.date);
      setAmount(transaction.amount.toString());
      setType(transaction.type as "INKOMST" | "UTGIFT");
      setDescription(transaction.description || "");
      setAttachmentNumber(transaction.attachmentNumber || "");
    }
  }, [transaction]);

  if (isLoading) {
    return <p className="text-gray-500 py-6">Laddar transaktion…</p>;
  }
  if (isError || !transaction) {
    return <p className="text-red-500 py-6">Transaktionen hittades inte</p>;
  }

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !amount.trim()) {
      alert("Datum och belopp krävs.");
      return;
    }

    updateTx.mutate(
      {
        date,
        amount: Number(amount),
        type,
        description: description.trim(),
        attachmentNumber: attachmentNumber.trim() || null,
      },
      {
        onSuccess: () => {
          // Efter uppdatering kanske du vill refetcha – görs automatiskt om hooken är konfigurerad
          // Eller navigera tillbaka:
          // navigate({ to: `/clients/${cid}/accounts/${aid}/transactions` });
        },
      }
    );
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 space-y-6">
      <header className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          Transaktion: <span className="text-blue-600">{transaction.id}</span>
        </h2>
        <button
          onClick={() =>
            navigate({ to: `/clients/${cid}/accounts/${aid}/transactions` })
          }
          className="px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          ← Tillbaka
        </button>
      </header>

      <form onSubmit={handleUpdate} className="space-y-5">
        <div>
          <label htmlFor="date" className="block text-gray-700 mb-1">
            Datum
          </label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label htmlFor="amount" className="block text-gray-700 mb-1">
            Belopp (kr)
          </label>
          <input
            id="amount"
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label htmlFor="type" className="block text-gray-700 mb-1">
            Typ
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value as "INKOMST" | "UTGIFT")}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="INKOMST">INKOMST</option>
            <option value="UTGIFT">UTGIFT</option>
          </select>
        </div>

        <div>
          <label htmlFor="description" className="block text-gray-700 mb-1">
            Beskrivning{" "}
            <span className="text-sm text-gray-400">(valfritt)</span>
          </label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label
            htmlFor="attachmentNumber"
            className="block text-gray-700 mb-1"
          >
            Bilageref. <span className="text-sm text-gray-400">(valfritt)</span>
          </label>
          <input
            id="attachmentNumber"
            type="text"
            value={attachmentNumber}
            onChange={(e) => setAttachmentNumber(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          disabled={updateTx.isLoading}
          className={`w-full flex justify-center items-center px-4 py-2 text-white font-medium rounded ${
            updateTx.isLoading
              ? "bg-green-300 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          } focus:outline-none focus:ring-2 focus:ring-green-500`}
        >
          {updateTx.isLoading ? "Sparar…" : "Spara ändringar"}
        </button>

        {updateTx.isError && (
          <p className="text-red-500 text-sm mt-2">
            Fel: {(updateTx.error as any).message || "Okänt fel"}
          </p>
        )}
      </form>
    </div>
  );
}
