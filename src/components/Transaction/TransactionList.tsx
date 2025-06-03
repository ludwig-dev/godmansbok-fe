// src/components/Transactions/TransactionList.tsx
import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { useTransactions, type TransactionDTO } from "../../hooks/useTransactions";
import IncomeList from "./IncomeList";
import ExpenseList from "./ExpenseList";
import Modal from "../UI/Modal";
import NewTransactionModal from "./NewTransactionModal";
import TransactionDetailModal from "./TransactionDetailModal";

interface TransactionListProps {
  clientId: number;
  accountId: number;
}

export default function TransactionList({
  clientId,
  accountId,
}: TransactionListProps) {
  const { data: transactions = [], isLoading, isError, error, refetch } =
    useTransactions(clientId, accountId);

  const [showNewTxModal, setShowNewTxModal] = useState(false);
  const [viewingTxId, setViewingTxId] = useState<number | null>(null);

  if (isLoading) {
    return <p className="text-gray-500 py-6">Laddar transaktioner…</p>;
  }
  if (isError) {
    return <p className="text-red-500 py-6">Fel: {(error as any).message}</p>;
  }

  const handleNewCreated = (newTx: TransactionDTO) => {
    refetch();
  };

  const handleCloseDetail = () => {
    setViewingTxId(null);
  };

  const handleSavedDetail = () => {
    refetch();
  };

  return (
    <div className="space-y-6">
      {/* Knapp för att skapa ny transaktion */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowNewTxModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600"
        >
          <PlusCircle className="w-5 h-5" />
          Ny transaktion
        </button>
      </div>

      {/* Lista över inkomster */}
      <IncomeList
        transactions={transactions}
        onView={(txId) => setViewingTxId(txId)}
      />

      {/* Lista över utgifter */}
      <ExpenseList
        transactions={transactions}
        onView={(txId) => setViewingTxId(txId)}
      />

      {/* Modal för ny transaktion */}
      <Modal
        isOpen={showNewTxModal}
        onClose={() => setShowNewTxModal(false)}
      >
        <NewTransactionModal
          clientId={clientId}
          accountId={accountId}
          onClose={() => setShowNewTxModal(false)}
          onCreated={handleNewCreated}
        />
      </Modal>

      {/* Modal för att visa/edita en transaktion */}
      {viewingTxId !== null && (
        <Modal isOpen={true} onClose={handleCloseDetail}>
          <TransactionDetailModal
            clientId={clientId}
            accountId={accountId}
            transactionId={viewingTxId}
            onClose={handleCloseDetail}
            onSaved={handleSavedDetail}
          />
        </Modal>
      )}
    </div>
  );
}
