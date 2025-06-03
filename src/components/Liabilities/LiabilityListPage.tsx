// src/components/Liabilities/LiabilityListPage.tsx
import { useState } from "react";
import { PlusCircle, Pencil } from "lucide-react";
import { useLiabilities, type LiabilityDTO } from "../../hooks/useLiabilities";
import Modal from "../UI/Modal";
import LiabilityCreateModal from "./LiabilityCreateModal";
import LiabilityDetailModal from "./LiabilityDetailModal";
import DeleteLiabilityButton from "./DeleteLiabilityButton"; // importera delete-knappen
import { Route } from "../../routes/clients/$clientId/liabilities/route";

export default function LiabilityListPage() {
  // 1) Hämta clientId
  const { clientId } = Route.useParams<{ clientId: string }>();
  const cid = Number(clientId);

  // 2) Hämta alla skulder
  const {
    data: liabilities = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useLiabilities(cid);

  // 3) State för modaler
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [viewingLiabilityId, setViewingLiabilityId] = useState<number | null>(null);

  if (isLoading) {
    return <p className="text-gray-500 py-6">Laddar skulder…</p>;
  }
  if (isError) {
    return <p className="text-red-500 py-6">Fel: {(error as any).message}</p>;
  }

  const handleCreated = () => {
    refetch();
  };
  const handleSaved = () => {
    refetch();
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto pt-8">
      {/* Knapp för att skapa ny skuld */}
      <div className="flex justify-start">
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600"
        >
          <PlusCircle className="w-5 h-5" />
          Ny skuld
        </button>
      </div>

      {/* Lista över skulder */}
      {liabilities.length > 0 ? (
        <ul className="space-y-4">
          {liabilities.map((liab: LiabilityDTO) => (
            <li
              key={liab.id}
              className="bg-white shadow-sm rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <p className="text-lg font-medium text-gray-900">
                  {liab.creditor}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Skuld 1 jan: {liab.debtStartOfYear.toFixed(2)} kr — Skuld 31 dec:{" "}
                  {liab.debtEndOfYear.toFixed(2)} kr
                </p>
                {liab.changeAmount !== null && (
                  <p className="text-sm text-gray-500">
                    Förändring: {liab.changeAmount.toFixed(2)} kr
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <DeleteLiabilityButton
                  clientId={cid}
                  liabilityId={liab.id}
                />
                <button
                  onClick={() => setViewingLiabilityId(liab.id)}
                  className="p-2 hover:bg-gray-100 rounded"
                  aria-label="Visa skuld"
                >
                  <Pencil className="w-5 h-5 text-gray-700" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">Inga skulder registrerade ännu.</p>
      )}

      {/* Modal för att skapa ny skuld */}
      {showCreateModal && (
        <Modal isOpen onClose={() => setShowCreateModal(false)}>
          <LiabilityCreateModal
            clientId={cid}
            onClose={() => setShowCreateModal(false)}
            onCreated={handleCreated}
          />
        </Modal>
      )}

      {/* Modal för att visa/edita befintlig skuld */}
      {viewingLiabilityId !== null && (
        <Modal isOpen onClose={() => setViewingLiabilityId(null)}>
          <LiabilityDetailModal
            clientId={cid}
            liabilityId={viewingLiabilityId}
            onClose={() => setViewingLiabilityId(null)}
            onSaved={handleSaved}
          />
        </Modal>
      )}
    </div>
  );
}
