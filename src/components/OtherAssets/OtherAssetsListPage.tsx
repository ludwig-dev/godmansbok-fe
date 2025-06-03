// src/components/OtherAssets/OtherAssetsListPage.tsx
import { useState } from "react";
import { PlusCircle, Pencil } from "lucide-react";
import { useOtherAssets, type OtherAssetDTO } from "../../hooks/useOtherAssets";
import Modal from "../UI/Modal";
import OtherAssetCreateModal from "./OtherAssetCreateModal";
import OtherAssetDetailModal from "./OtherAssetDetailModal";
import { Route } from "../../routes/clients/$clientId/other-assets/route";

export default function OtherAssetsListPage() {
  // 1) Hämta clientId via Route.useParams
  const { clientId } = Route.useParams<{ clientId: string }>();
  const cid = Number(clientId);

  // 2) Hämta alla tillgångar
  const {
    data: assets = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useOtherAssets(cid);

  // 3) State för modal: skapa eller visa/edita en enskild
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [viewingAssetId, setViewingAssetId] = useState<number | null>(null);

  if (isLoading) {
    return <p className="text-gray-500 py-6">Laddar tillgångar…</p>;
  }
  if (isError) {
    return <p className="text-red-500 py-6">Fel: {(error as any).message}</p>;
  }

  const handleCreated = () => {
    // När en ny tillgång skapats, refetcha listan
    refetch();
  };

  const handleSaved = () => {
    // När en befintlig tillgång sparats, refetcha listan
    refetch();
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto pt-8">
      {/* + Knapp för att skapa en ny tillgång */}
      <div className="flex justify-start">
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600"
        >
          <PlusCircle className="w-5 h-5" />
          Lägg till tillgång
        </button>
      </div>

      {/* Lista över alla tillgångar */}
      {assets.length > 0 ? (
        <ul className="space-y-4">
          {assets.map((asset: OtherAssetDTO) => (
            <li
              key={asset.id}
              className="bg-white shadow-sm rounded p-4 flex justify-between items-center"
            >
              <div>
                <p className="text-lg font-medium text-gray-900">
                  {asset.assetType}
                </p>
                {asset.description && (
                  <p className="text-sm text-gray-500">{asset.description}</p>
                )}
                <p className="text-sm text-gray-500 mt-1">
                  Värde 1 jan: {asset.valueStartOfYear.toFixed(2)} kr — Värde
                  31 dec: {asset.valueEndOfYear.toFixed(2)} kr
                </p>
              </div>
              <button
                onClick={() => setViewingAssetId(asset.id)}
                className="p-2 hover:bg-gray-100 rounded"
                aria-label="Visa tillgång"
              >
                <Pencil className="w-5 h-5 text-gray-700" />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">Inga övriga tillgångar ännu.</p>
      )}

      {/* Modal för att skapa ny tillgång */}
      {showCreateModal && (
        <Modal isOpen onClose={() => setShowCreateModal(false)}>
          <OtherAssetCreateModal
            clientId={cid}
            onClose={() => setShowCreateModal(false)}
            onCreated={handleCreated}
          />
        </Modal>
      )}

      {/* Modal för att visa/edita en enskild tillgång */}
      {viewingAssetId !== null && (
        <Modal isOpen onClose={() => setViewingAssetId(null)}>
          <OtherAssetDetailModal
            clientId={cid}
            assetId={viewingAssetId}
            onClose={() => setViewingAssetId(null)}
            onSaved={handleSaved}
          />
        </Modal>
      )}
    </div>
  );
}
