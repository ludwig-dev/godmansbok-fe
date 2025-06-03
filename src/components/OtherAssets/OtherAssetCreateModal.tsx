// src/components/OtherAssets/OtherAssetCreateModal.tsx
import { type FormEvent, useState } from "react";
import { useCreateOtherAsset } from "../../hooks/useOtherAssets";

interface OtherAssetCreateModalProps {
  clientId: number;
  onClose: () => void;
  onCreated: () => void;
}

export default function OtherAssetCreateModal({
  clientId,
  onClose,
  onCreated,
}: OtherAssetCreateModalProps) {
  const createAsset = useCreateOtherAsset(clientId);

  // Lokalt state för formuläret
  const [assetType, setAssetType] = useState("");
  const [description, setDescription] = useState("");
  const [units, setUnits] = useState("");
  const [valueStart, setValueStart] = useState("0");
  const [valueEnd, setValueEnd] = useState("0");
  const [attachmentNumber, setAttachmentNumber] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!assetType.trim()) {
      alert("Du måste ange en tillgångstyp");
      return;
    }

    createAsset.mutate(
      {
        assetType: assetType.trim(),
        description: description.trim(),
        units: units.trim() ? Number(units) : 0,
        valueStartOfYear: Number(valueStart),
        valueEndOfYear: Number(valueEnd),
        attachmentNumber: attachmentNumber.trim() || "",
      },
      {
        onSuccess: () => {
          onCreated();
          onClose();
        },
      }
    );
  };

  return (
    <div className="space-y-4 w-full max-w-md mx-auto">
      <h3 className="text-xl font-semibold text-gray-800">
        Ny övrig tillgång
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="assetType" className="block text-gray-700 mb-1">
            Typ av tillgång
          </label>
          <input
            id="assetType"
            type="text"
            value={assetType}
            onChange={(e) => setAssetType(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-gray-700 mb-1">
            Beskrivning <span className="text-sm text-gray-400">(valfritt)</span>
          </label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>
        <div>
          <label htmlFor="units" className="block text-gray-700 mb-1">
            Antal andelar <span className="text-sm text-gray-400">(valfritt)</span>
          </label>
          <input
            id="units"
            type="number"
            step="0.01"
            value={units}
            onChange={(e) => setUnits(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>
        <div>
          <label htmlFor="valueStart" className="block text-gray-700 mb-1">
            Värde 1 januari (kr)
          </label>
          <input
            id="valueStart"
            type="number"
            step="0.01"
            value={valueStart}
            onChange={(e) => setValueStart(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>
        <div>
          <label htmlFor="valueEnd" className="block text-gray-700 mb-1">
            Värde 31 dec (kr)
          </label>
          <input
            id="valueEnd"
            type="number"
            step="0.01"
            value={valueEnd}
            onChange={(e) => setValueEnd(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>
        <div>
          <label
            htmlFor="attachmentNumber"
            className="block text-gray-700 mb-1"
          >
            Bilageref. <span className="text-sm text-gray-400">(valfritt)</span>
          </label>
          <input
            id="attachmentNumber"
            type="text"
            value={attachmentNumber}
            onChange={(e) => setAttachmentNumber(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>
        <button
          type="submit"
          disabled={createAsset.isPending}
          className={`w-full flex justify-center items-center px-4 py-2 text-white font-medium rounded ${
            createAsset.isPending
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
        >
          {createAsset.isPending ? "Sparar…" : "Lägg till tillgång"}
        </button>
        {createAsset.isError && (
          <p className="text-red-500 text-sm mt-2">
            Fel: {(createAsset.error as any).message || "Okänt fel"}
          </p>
        )}
      </form>
    </div>
  );
}
