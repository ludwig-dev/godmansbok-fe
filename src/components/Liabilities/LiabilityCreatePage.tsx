// src/components/Liabilities/LiabilityCreatePage.tsx
import React, { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Route } from "../../routes/clients/$clientId/liabilities/route";
import { useCreateLiability } from "../../hooks/useLiabilities";

export default function LiabilityCreatePage() {
  const { clientId } = Route.useParams<{ clientId: string }>();
  const cid = Number(clientId);
  const navigate = useNavigate();
  const createLiability = useCreateLiability(cid);

  // debtStart and debtEnd as numbers
  const [creditor, setCreditor] = useState("");
  const [debtStart, setDebtStart] = useState<number>(0);
  const [debtEnd, setDebtEnd] = useState<number>(0);
  const [attachmentNumber, setAttachmentNumber] = useState("");

  // compute changeAmount on the fly
  const changeAmount = parseFloat((debtEnd - debtStart).toFixed(2));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!creditor.trim()) {
      alert("Långivare måste anges.");
      return;
    }

    createLiability.mutate(
      {
        creditor,
        debtStartOfYear: debtStart,
        debtEndOfYear: debtEnd,
        changeAmount,
        attachmentNumber: attachmentNumber.trim() || "",
      },
      {
        onSuccess: () => {
          navigate({ to: `/clients/${cid}/liabilities` });
        },
      }
    );
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Ny skuld</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="creditor" className="block text-gray-700 mb-1">
            Långivare
          </label>
          <input
            id="creditor"
            type="text"
            value={creditor}
            onChange={(e) => setCreditor(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label htmlFor="debtStart" className="block text-gray-700 mb-1">
            Skuld 1 januari (kr)
          </label>
          <input
            id="debtStart"
            type="number"
            step="0.01"
            value={debtStart}
            onChange={(e) => setDebtStart(parseFloat(e.target.value) || 0)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label htmlFor="debtEnd" className="block text-gray-700 mb-1">
            Skuld 31 dec (kr)
          </label>
          <input
            id="debtEnd"
            type="number"
            step="0.01"
            value={debtEnd}
            onChange={(e) => setDebtEnd(parseFloat(e.target.value) || 0)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label htmlFor="changeAmount" className="block text-gray-700 mb-1">
            Förändring (kr)
          </label>
          <input
            id="changeAmount"
            type="number"
            step="0.01"
            value={changeAmount}
            readOnly
            className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2"
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
          disabled={createLiability.isPending}
          className={`w-full flex justify-center items-center px-4 py-2 text-white font-medium rounded ${
            createLiability.isPending
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
        >
          {createLiability.isPending ? "Sparar…" : "Lägg till skuld"}
        </button>

        {createLiability.isError && (
          <p className="text-red-500 text-sm mt-2">
            Fel: {(createLiability.error as any).message || "Okänt fel"}
          </p>
        )}
      </form>
    </div>
  );
}
