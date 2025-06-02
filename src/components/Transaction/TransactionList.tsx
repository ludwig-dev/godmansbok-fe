import { useTransactions } from "../../hooks/useTransactions";
import { useNavigate } from "@tanstack/react-router";
import type { TransactionDTO } from "../../hooks/useTransactions";

interface TransactionListProps {
  clientId: number;
  accountId: number;
}

export default function TransactionList({
  clientId,
  accountId,
}: TransactionListProps) {
  const navigate = useNavigate();
  const {
    data: transactions = [],
    isLoading,
    isError,
    error,
  } = useTransactions(clientId, accountId);

  if (isLoading) {
    return <p className="text-gray-500 py-6">Laddar transaktioner…</p>;
  }
  if (isError) {
    return <p className="text-red-500 py-6">Fel: {(error as any).message}</p>;
  }

  return (
    <div className="space-y-6">
      {/* Knapp för att skapa ny transaktion */}
      <div className="flex justify-end">
        <button
          onClick={() =>
            navigate({
              to: `/clients/${clientId}/accounts/${accountId}/transactions/new`,
            })
          }
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Ny transaktion
        </button>
      </div>

      {transactions.length > 0 ? (
        <ul className="space-y-4">
          {transactions.map((tx: TransactionDTO) => (
            <li
              key={tx.id}
              className="bg-white shadow rounded p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-medium text-gray-900">
                  {tx.date} — {tx.type} {tx.amount} kr
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
      ) : (
        <p className="text-gray-600">Inga transaktioner ännu.</p>
      )}
    </div>
  );
}
