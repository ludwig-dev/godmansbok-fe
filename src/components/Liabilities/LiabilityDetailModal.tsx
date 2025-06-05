// src/components/Liabilities/LiabilityDetailModal.tsx
import { type FormEvent, useState, useEffect } from "react";
import { useLiability, useUpdateLiability } from "../../hooks/useLiabilities";

interface LiabilityDetailModalProps {
  clientId: number;
  liabilityId: number;
  onClose: () => void;
  onSaved: () => void;
}

export default function LiabilityDetailModal({
  clientId,
  liabilityId,
  onClose,
  onSaved,
}: LiabilityDetailModalProps) {
  const {
    data: liability,
    isLoading,
    isError,
  } = useLiability(clientId, liabilityId);
  const updateLiability = useUpdateLiability(clientId, liabilityId);

  const [creditor, setCreditor] = useState("");
  const [debtStart, setDebtStart] = useState<number>(0);
  const [debtEnd, setDebtEnd] = useState<number>(0);
  const [attachmentNumber, setAttachmentNumber] = useState("");

  useEffect(() => {
    if (liability) {
      setCreditor(liability.creditor);
      setDebtStart(liability.debtStartOfYear);
      setDebtEnd(liability.debtEndOfYear);
      setAttachmentNumber(liability.attachmentNumber || "");
    }
  }, [liability]);

  if (isLoading) return <p className="text-gray-500">Laddar skuld…</p>;
  if (isError || !liability)
    return <p className="text-red-500">Skulden hittades inte</p>;

  const changeAmount = parseFloat((debtEnd - debtStart).toFixed(2));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!creditor.trim()) {
      alert("Långivare måste anges.");
      return;
    }

    updateLiability.mutate(
      {
        creditor: creditor.trim(),
        debtStartOfYear: debtStart,
        debtEndOfYear: debtEnd,
        changeAmount,
        attachmentNumber: attachmentNumber.trim() || "",
      },
      {
        onSuccess: () => {
          onSaved();
          onClose();
        },
      }
    );
  };

  return (
    <div className="space-y-4 w-full max-w-md mx-auto">
      <h3 className="text-xl font-semibold text-gray-800">
        Skuld: {liability.creditor}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
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
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
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
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
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
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
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
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
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
