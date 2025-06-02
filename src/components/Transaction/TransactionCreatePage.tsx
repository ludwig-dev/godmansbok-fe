// src/components/Transactions/TransactionCreatePage.tsx
import React, { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Route } from "../../routes/clients/$clientId/accounts/$accountId/transactions/route";
import { useCreateTransaction } from "../../hooks/useTransactions";

export default function TransactionCreatePage() {
  const { clientId, accountId } = Route.useParams<{
    clientId: string;
    accountId: string;
  }>();
  const cid = Number(clientId);
  const aid = Number(accountId);
  const navigate = useNavigate();
  const createTx = useCreateTransaction(cid, aid);

  // Form‐state
  const [date, setDate] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [type, setType] = useState<"INKOMST" | "UTGIFT">("INKOMST");
  const [description, setDescription] = useState<string>("");
  const [attachmentNumber, setAttachmentNumber] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !amount.trim()) {
      alert("Datum och belopp krävs.");
      return;
    }

    createTx.mutate(
      {
        date,
        amount: Number(amount),
        type,
        description: description.trim(),
        attachmentNumber: attachmentNumber.trim() || null,
      },
      {
        onSuccess: () => {
          navigate({ to: `/clients/${cid}/accounts/${aid}/transactions` });
        },
      }
    );
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Ny transaktion
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
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
          disabled={createTx.isPending}
          className={`w-full flex justify-center items-center px-4 py-2 text-white font-medium rounded ${
            createTx.isPending
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
        >
          {createTx.isPending ? "Sparar…" : "Skapa transaktion"}
        </button>

        {createTx.isError && (
          <p className="text-red-500 text-sm mt-2">
            Fel: {(createTx.error as any).message || "Okänt fel"}
          </p>
        )}
      </form>
    </div>
  );
}
