// src/components/Accounts/AccountEditModal.tsx
import { type FormEvent, useState, useEffect } from "react";
import { useAccount, useUpdateAccount } from "../../hooks/useAccounts";
import type { AccountDTO } from "../../hooks/useAccounts";

interface AccountEditModalProps {
  clientId: number;
  accountId: number;
  onClose: () => void;
  onSaved: (updated: AccountDTO) => void;
}

export default function AccountEditModal({
  clientId,
  accountId,
  onClose,
  onSaved,
}: AccountEditModalProps) {
  const { data: account, isLoading, isError } = useAccount(clientId, accountId);
  const updateAccount = useUpdateAccount(clientId, accountId);

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [startBalance, setStartBalance] = useState("");
  const [endBalance, setEndBalance] = useState("");

  useEffect(() => {
    if (account) {
      setName(account.accountName);
      setNumber(account.accountNumber || "");
      setStartBalance(
        account.startBalance !== null ? account.startBalance.toString() : ""
      );
      setEndBalance(
        account.endBalance !== null ? account.endBalance.toString() : ""
      );
    }
  }, [account]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Kontonamn får inte vara tomt.");
      return;
    }
    if (startBalance.trim() === "" || endBalance.trim() === "") {
      alert("Ange både ingående och utgående saldo.");
      return;
    }
    updateAccount.mutate(
      {
        accountName: name.trim(),
        accountNumber: number.trim() || null,
        startBalance: Number(startBalance),
        endBalance: Number(endBalance),
      },
      {
        onSuccess: (updated) => {
          onSaved(updated);
          onClose();
        },
      }
    );
  };

  if (isLoading) {
    return <p className="text-gray-500">Laddar konto…</p>;
  }
  if (isError || !account) {
    return <p className="text-red-500">Kunde inte ladda konto</p>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800">
        Ändra konto: {account.accountName}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-700 mb-1">
            Kontonamn
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>
        <div>
          <label htmlFor="number" className="block text-gray-700 mb-1">
            Kontonummer (valfritt)
          </label>
          <input
            id="number"
            type="text"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>
        <div>
          <label htmlFor="start" className="block text-gray-700 mb-1">
            Ingående saldo (1 jan)
          </label>
          <input
            id="start"
            type="number"
            step="0.01"
            value={startBalance}
            onChange={(e) => setStartBalance(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>
        <div>
          <label htmlFor="end" className="block text-gray-700 mb-1">
            Utgående saldo (31 dec)
          </label>
          <input
            id="end"
            type="number"
            step="0.01"
            value={endBalance}
            onChange={(e) => setEndBalance(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>
        <button
          type="submit"
          disabled={updateAccount.isPending}
          className="w-full flex justify-center items-center px-4 py-2 bg-gray-800 text-white font-medium rounded hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600 disabled:bg-gray-400"
        >
          {updateAccount.isPending ? "Sparar…" : "Spara ändringar"}
        </button>
        {updateAccount.isError && (
          <p className="text-red-500 text-sm mt-2">
            Fel: {(updateAccount.error as any).message || "Okänt fel"}
          </p>
        )}
      </form>
    </div>
  );
}
