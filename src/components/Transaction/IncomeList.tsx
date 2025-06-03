// src/components/Transactions/IncomeList.tsx
import type { TransactionDTO } from "../../hooks/useTransactions";
import { Pencil } from "lucide-react";
import DeleteTxButton from "./DeleteTxButton";

interface IncomeListProps {
  clientId: number;
  accountId: number;
  transactions: TransactionDTO[];
  onView: (txId: number) => void;
}

export default function IncomeList({
  clientId,
  accountId,
  transactions,
  onView,
}: IncomeListProps) {
  const incomes = transactions
    .filter((tx) => tx.type === "INKOMST")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (incomes.length === 0) {
    return (
      <div>
        <h4 className="text-lg font-semibold text-gray-800">Inkomster</h4>
        <p className="text-gray-600 py-4">Inga inkomster ännu.</p>
      </div>
    );
  }

  return (
    <div>
      <h4 className="text-lg font-semibold text-gray-800 mb-2">Inkomster</h4>
      <ul className="space-y-4">
        {incomes.map((tx) => (
          <li
            key={tx.id}
            className="bg-white shadow-sm rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-medium text-gray-900">
                {tx.date} — {tx.amount.toFixed(2)} kr
              </p>
              {tx.description && (
                <p className="text-sm text-gray-500">{tx.description}</p>
              )}
            </div>
            <div className="flex gap-2">
              {/* Radera-knapp */}
              <DeleteTxButton
                clientId={clientId}
                accountId={accountId}
                txId={tx.id}
              />
              {/* Visa-knapp */}
              <button
                onClick={() => onView(tx.id)}
                className="p-2 hover:bg-gray-100 rounded"
                aria-label="Visa inkomstdetaljer"
              >
                <Pencil className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
