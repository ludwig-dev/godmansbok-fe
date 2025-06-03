import { Trash2 } from "lucide-react";
import { useDeleteTransaction } from "../../hooks/useTransactions";

interface DeleteButtonProps {
  clientId: number;
  accountId: number;
  txId: number;
}

export default function DeleteTxButton({
  clientId,
  accountId,
  txId,
}: DeleteButtonProps) {
  const deleteMutation = useDeleteTransaction(clientId, accountId, txId);

  const handleDelete = () => {
    if (
      window.confirm("Är du säker på att du vill ta bort denna transaktion?")
    ) {
      deleteMutation.mutate();
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="p-2 hover:bg-gray-100 rounded"
      aria-label="Radera transaktion"
    >
      <Trash2 className="w-5 h-5 text-red-600 hover:text-red-800" />
    </button>
  );
}
