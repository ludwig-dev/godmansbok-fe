import { useNavigate } from "@tanstack/react-router";
import { Route } from "../../routes/clients/$clientId/liabilities/route";
import { useLiabilities } from "../../hooks/useLiabilities";
import type { LiabilityDTO } from "../../hooks/useLiabilities";

export default function LiabilityListPage() {
  // Hämta clientId från Route.useParams()
  const { clientId } = Route.useParams<{ clientId: string }>();
  const cid = Number(clientId);
  const navigate = useNavigate();

  // Hämtar alla skulder för den klienten
  const {
    data: liabilities = [],
    isLoading,
    isError,
    error,
  } = useLiabilities(cid);

  if (isLoading) {
    return <p className="text-gray-500 py-6">Laddar skulder…</p>;
  }
  if (isError) {
    return <p className="text-red-500 py-6">Fel: {(error as any).message}</p>;
  }

  return (
    <div className="space-y-6">
      {/* Knapp för att skapa ny skuld */}
      <div className="flex justify-end">
        <button
          onClick={() => navigate({ to: `/clients/${cid}/liabilities/new` })}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Lägg till skuld
        </button>
      </div>

      {liabilities.length > 0 ? (
        <ul className="space-y-4">
          {liabilities.map((liab: LiabilityDTO) => (
            <li
              key={liab.id}
              className="bg-white shadow rounded p-4 flex justify-between items-center"
            >
              <div>
                <p className="text-lg font-medium text-gray-900">
                  {liab.creditor}
                </p>
                <p className="text-sm text-gray-500">
                  Startårsskuld: {liab.debtStartOfYear} kr – Slutårsskuld:{" "}
                  {liab.debtEndOfYear} kr
                </p>
                {liab.changeAmount !== null && (
                  <p className="text-sm text-gray-500">
                    Förändring: {liab.changeAmount} kr
                  </p>
                )}
              </div>
              <button
                onClick={() =>
                  navigate({
                    to: `/clients/${cid}/liabilities/${liab.id}`,
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
        <p className="text-gray-600">Inga skulder registrerade ännu.</p>
      )}
    </div>
  );
}
