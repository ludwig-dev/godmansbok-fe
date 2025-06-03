// src/components/Accounts/AccountsListPage.tsx
import { useState } from "react";
import { Pencil } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { Route } from "../../routes/clients/$clientId/accounts/route";
import { useAccounts, type AccountDTO } from "../../hooks/useAccounts";
import TransactionList from "../Transaction/TransactionList";
import Modal from "../UI/Modal";
import AccountEditModal from "./AccountEditModal";

export default function AccountsListPage() {
  const { clientId } = Route.useParams();
  const cid = Number(clientId);
  const navigate = useNavigate();

  const { data: accounts = [], isLoading, isError, error, refetch } =
    useAccounts(cid);

  // rätt – starta alltid med null, öppna bara när knappen klickas
  const [editingAccountId, setEditingAccountId] = useState<number | null>(null);


  if (isLoading) {
    return <p className="text-gray-500 py-6">Laddar konton…</p>;
  }
  if (isError) {
    return <p className="text-red-500 py-6">Fel: {(error as any).message}</p>;
  }

  // Eftersom det bara finns ett konto, plocka första
  const account = accounts[0] as AccountDTO | undefined;
  if (!account) {
    return <p className="text-gray-600">Inget konto hittades.</p>;
  }

  const handleSaved = () => {
    refetch();
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded p-4 flex justify-between items-center">
        <div>
          <p className="text-lg font-medium text-gray-900">
            {account.accountName}
          </p>
          {account.accountNumber && (
            <p className="text-sm text-gray-500">
              Kontonummer: {account.accountNumber}
            </p>
          )}
          <p className="text-sm text-gray-500">
            Saldo 1 januari: {account.startBalance ?? "Ej angivet"} kr
          </p>
          <p className="text-sm text-gray-500">
            Saldo 31 december: {account.endBalance ?? "Ej angivet"} kr
          </p>
        </div>
        <button
          onClick={() => setEditingAccountId(account.id)}
          className="p-2 hover:bg-gray-100 rounded"
          aria-label="Ändra konto"
        >
          <Pencil className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      <div>
        <TransactionList clientId={cid} accountId={account.id} />
      </div>

      {editingAccountId !== null && (
        <Modal isOpen onClose={() => setEditingAccountId(null)}>
          <AccountEditModal
            clientId={cid}
            accountId={editingAccountId}
            onClose={() => setEditingAccountId(null)}
            onSaved={handleSaved}
          />
        </Modal>
      )}
    </div>
  );
}
