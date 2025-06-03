import { useNavigate } from "@tanstack/react-router";
import type { TransactionDTO } from "../../hooks/useTransactions";

interface IncomeListProps {
  clientId: number;
  accountId: number;
  transactions: TransactionDTO[];
}

export default function IncomeList({
  clientId,
  accountId,
  transactions,
}: IncomeListProps) {
  const navigate = useNavigate();

  // Filtrera ut endast “INKOMST” och sortera på datum (nyast först)
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
            className="bg-white shadow rounded p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-medium text-gray-900">
                {tx.date} — {tx.amount.toFixed(2)} kr
              </p>
              {tx.description && (
                <p className="text-sm text-gray-500">{tx.description}</p>
              )}
            </div>
            <button
              onClick={() =>
                navigate({
                  to: `/clients/${clientId}/accounts/${accountId}/transactions/${tx.id}`,
                })
              }
              className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Visa
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
