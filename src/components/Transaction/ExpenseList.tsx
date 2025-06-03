import { useNavigate } from "@tanstack/react-router";
import type { TransactionDTO } from "../../hooks/useTransactions";

interface ExpenseListProps {
  clientId: number;
  accountId: number;
  transactions: TransactionDTO[];
}

export default function ExpenseList({
  clientId,
  accountId,
  transactions,
}: ExpenseListProps) {
  const navigate = useNavigate();

  // Filtrera ut endast “UTGIFT” och sortera på datum (nyast först)
  const expenses = transactions
    .filter((tx) => tx.type === "UTGIFT")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (expenses.length === 0) {
    return (
      <div>
        <h4 className="text-lg font-semibold text-gray-800">Utgifter</h4>
        <p className="text-gray-600 py-4">Inga utgifter ännu.</p>
      </div>
    );
  }

  return (
    <div>
      <h4 className="text-lg font-semibold text-gray-800 mb-2">Utgifter</h4>
      <ul className="space-y-4">
        {expenses.map((tx) => (
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
              className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Visa
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
