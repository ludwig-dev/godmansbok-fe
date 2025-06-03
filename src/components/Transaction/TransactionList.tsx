import { useNavigate } from "@tanstack/react-router";
import { useTransactions } from "../../hooks/useTransactions";
import type { TransactionDTO } from "../../hooks/useTransactions";
import IncomeList from "./IncomeList";
import ExpenseList from "./ExpenseList";

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

      {/* Lista över inkomster */}
      <IncomeList
        clientId={clientId}
        accountId={accountId}
        transactions={transactions}
      />

      {/* Lista över utgifter */}
      <ExpenseList
        clientId={clientId}
        accountId={accountId}
        transactions={transactions}
      />
    </div>
  );
}
