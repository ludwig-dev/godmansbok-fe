import { useNavigate } from "@tanstack/react-router";
import { Route } from "../../routes/clients/$clientId/other-assets/route";
import { useOtherAssets } from "../../hooks/useOtherAssets";
import type { OtherAssetDTO } from "../../hooks/useOtherAssets";

export default function OtherAssetsListPage() {
  // Hämta clientId från “other-assets”‐rutan
  const { clientId } = Route.useParams<{ clientId: string }>();
  const cid = Number(clientId);
  const navigate = useNavigate();

  // Hook för att hämta alla övriga tillgångar
  const { data: assets = [], isLoading, isError, error } = useOtherAssets(cid);

  if (isLoading) {
    return <p className="text-gray-500 py-6">Laddar tillgångar…</p>;
  }
  if (isError) {
    return <p className="text-red-500 py-6">Fel: {(error as any).message}</p>;
  }

  return (
    <div className="space-y-6">
      {/* Knapp för att skapa ny tillgång */}
      <div className="flex justify-end">
        <button
          onClick={() =>
            navigate({
              to: `/clients/${cid}/other-assets/new`,
            })
          }
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Lägg till tillgång
        </button>
      </div>

      {assets.length > 0 ? (
        <ul className="space-y-4">
          {assets.map((asset: OtherAssetDTO) => (
            <li
              key={asset.id}
              className="bg-white shadow rounded p-4 flex justify-between items-center"
            >
              <div>
                <p className="text-lg font-medium text-gray-900">
                  {asset.assetType}
                </p>
                {asset.description && (
                  <p className="text-sm text-gray-500">{asset.description}</p>
                )}
                <p className="text-sm text-gray-500">
                  Startårsvärde: {asset.valueStartOfYear} kr – Slutårsvärde:{" "}
                  {asset.valueEndOfYear} kr
                </p>
              </div>
              <button
                onClick={() =>
                  navigate({
                    to: `/clients/${cid}/other-assets/${asset.id}`,
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
        <p className="text-gray-600">Inga andra tillgångar ännu.</p>
      )}
    </div>
  );
}
