// src/components/Liabilities/LiabilityDetailPage.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Route } from "../../routes/clients/$clientId/liabilities/$liabilityId/route";
import { useLiability, useUpdateLiability } from "../../hooks/useLiabilities";

export default function LiabilityDetailPage() {
  const { clientId, liabilityId } = Route.useParams<{
    clientId: string;
    liabilityId: string;
  }>();
  const cid = Number(clientId);
  const lid = Number(liabilityId);
  const navigate = useNavigate();

  const { data: liability, isLoading, isError } = useLiability(cid, lid);
  const updateLiability = useUpdateLiability(cid, lid);

  const [creditor, setCreditor] = useState<string>("");
  const [debtStart, setDebtStart] = useState<number>(0);
  const [debtEnd, setDebtEnd] = useState<number>(0);
  const [attachmentNumber, setAttachmentNumber] = useState<string>("");

  useEffect(() => {
    if (liability) {
      setCreditor(liability.creditor);
      setDebtStart(liability.debtStartOfYear);
      setDebtEnd(liability.debtEndOfYear);
      setAttachmentNumber(liability.attachmentNumber || "");
    }
  }, [liability]);

  if (isLoading) return <p className="text-gray-500 py-6">Laddar skuld…</p>;
  if (isError || !liability)
    return <p className="text-red-500 py-6">Skulden hittades inte</p>;

  const changeAmount = parseFloat((debtEnd - debtStart).toFixed(2));

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!creditor.trim()) {
      alert("Långivare måste anges.");
      return;
    }

    updateLiability.mutate(
      {
        creditor,
        debtStartOfYear: debtStart,
        debtEndOfYear: debtEnd,
        changeAmount,
        attachmentNumber: attachmentNumber.trim() || "",
      },
      {
        onSuccess: () => {
          // optionally refetch or navigate
        },
      }
    );
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 space-y-6">
      <header className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          Skuld: <span className="text-blue-600">{liability.creditor}</span>
        </h2>
        <button
          onClick={() => navigate({ to: `/clients/${cid}/liabilities` })}
          className="px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          ← Alla skulder
        </button>
      </header>

      <form onSubmit={handleUpdate} className="space-y-5">
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
          disabled={updateLiability.isPending}
          className={`w-full flex justify-center items-center px-4 py-2 text-white font-medium rounded ${
            updateLiability.isPending
              ? "bg-green-300 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          } focus:outline-none focus:ring-2 focus:ring-green-500`}
        >
          {updateLiability.isPending ? "Sparar…" : "Spara ändringar"}
        </button>

        {updateLiability.isError && (
          <p className="text-red-500 text-sm mt-2">
            Fel: {(updateLiability.error as any).message || "Okänt fel"}
          </p>
        )}
      </form>
    </div>
  );
}
