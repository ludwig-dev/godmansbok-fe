// src/components/Transactions/TransactionDetailModal.tsx
import { type FormEvent, useState, useEffect } from "react";
import { useTransaction, useUpdateTransaction } from "../../hooks/useTransactions";

interface TransactionDetailModalProps {
  clientId: number;
  accountId: number;
  transactionId: number;
  onClose: () => void;
  onSaved: () => void;
}

export default function TransactionDetailModal({
  clientId,
  accountId,
  transactionId,
  onClose,
  onSaved,
}: TransactionDetailModalProps) {
  const {
    data: transaction,
    isLoading,
    isError,
  } = useTransaction(clientId, accountId, transactionId);
  const updateTx = useUpdateTransaction(clientId, accountId, transactionId);

  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"INKOMST" | "UTGIFT">("INKOMST");
  const [description, setDescription] = useState("");
  const [attachmentNumber, setAttachmentNumber] = useState("");

  useEffect(() => {
    if (transaction) {
      setDate(transaction.date);
      setAmount(transaction.amount.toString());
      setType(transaction.type as "INKOMST" | "UTGIFT");
      setDescription(transaction.description || "");
      setAttachmentNumber(transaction.attachmentNumber || "");
    }
  }, [transaction]);

  const handleSubmit = (e: FormEvent) => {
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

  if (isLoading) {
    return <p className="text-gray-500">Laddar…</p>;
  }
  if (isError || !transaction) {
    return <p className="text-red-500">Kunde inte ladda transaktionen</p>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800">
        Transaktion #{transaction.id}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
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
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
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
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>
        <div>
          <label htmlFor="type" className="block text-gray-700 mb-1">
            Typ
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) =>
              setType(e.target.value as "INKOMST" | "UTGIFT")
            }
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            <option value="INKOMST">Inkomst</option>
            <option value="UTGIFT">Utgift</option>
          </select>
        </div>
        <div>
          <label htmlFor="description" className="block text-gray-700 mb-1">
            Beskrivning (valfritt)
          </label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>
        <div>
          <label
            htmlFor="attachmentNumber"
            className="block text-gray-700 mb-1"
          >
            Bilageref. (valfritt)
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
          disabled={updateTx.isPending}
          className="w-full flex justify-center items-center px-4 py-2 bg-gray-800 text-white font-medium rounded hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600 disabled:bg-gray-400"
        >
          {updateTx.isPending ? "Sparar…" : "Spara ändringar"}
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
