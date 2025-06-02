import { useNavigate } from "@tanstack/react-router";
import { Route } from "../../routes/clients/$clientId/accounts/route";
import { useAccounts } from "../../hooks/useAccounts";
import type { AccountDTO } from "../../hooks/useAccounts";
import { Link } from "@tanstack/react-router";

export default function AccountsListPage() {
  const { clientId } = Route.useParams();
  const cid = Number(clientId);
  const navigate = useNavigate();

  // Hämta alla konton för klienten
  const { data: accounts = [], isLoading, isError, error } = useAccounts(cid);

  if (isLoading) {
    return <p className="text-gray-500 py-6">Laddar konton…</p>;
  }
  if (isError) {
    return <p className="text-red-500 py-6">Fel: {(error as any).message}</p>;
  }

  return (
    <div className="space-y-6">
      {/* Lista över alla konton */}
      {accounts.length > 0 ? (
        <ul className="space-y-4">
          {accounts.map((account: AccountDTO) => (
            <li
              key={account.id}
              className="bg-white shadow rounded p-4 flex justify-between items-center"
            >
              <div>
                <p className="text-lg font-medium text-gray-900">
                  {account.accountName}
                </p>
                {account.accountNumber && (
                  <p className="text-sm text-gray-500">
                    Kontonummer: {account.accountNumber}
                  </p>
                )}
              </div>
              <Link
                to={`/clients/${cid}/accounts/${account.id}`}
                className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Ändra
              </Link>
              <Link
                to={`/clients/${cid}/accounts/${account.id}/transactions`}
                className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Transaktioner
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">Inga konton skapade ännu.</p>
      )}
    </div>
  );
}
