// src/components/OtherAssets/OtherAssetDetailPage.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Route } from "../../routes/clients/$clientId/other-assets/$assetId/route";
import { useOtherAsset, useUpdateOtherAsset } from "../../hooks/useOtherAssets";

export default function OtherAssetDetailPage() {
  // Hämta clientId och assetId via rätt Route.useParams()
  const { clientId, assetId } = Route.useParams<{
    clientId: string;
    assetId: string;
  }>();
  const cid = Number(clientId);
  const aid = Number(assetId);
  const navigate = useNavigate();

  // Hook för att hämta en enskild tillgång
  const { data: asset, isLoading, isError } = useOtherAsset(cid, aid);
  // Hook för att uppdatera tillgång
  const updateAsset = useUpdateOtherAsset(cid, aid);

  // Lokalt state som fylls när “asset” laddas
  const [assetType, setAssetType] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [units, setUnits] = useState<string>("");
  const [valueStart, setValueStart] = useState<string>("0");
  const [valueEnd, setValueEnd] = useState<string>("0");
  const [attachmentNumber, setAttachmentNumber] = useState<string>("");

  useEffect(() => {
    if (asset) {
      setAssetType(asset.assetType);
      setDescription(asset.description || "");
      setUnits(asset.units !== null ? asset.units!.toString() : ""); // maybe oopsie
      setValueStart(asset.valueStartOfYear.toString());
      setValueEnd(asset.valueEndOfYear.toString());
      setAttachmentNumber(asset.attachmentNumber || "");
    }
  }, [asset]);

  if (isLoading) {
    return <p className="text-gray-500 py-6">Laddar tillgång…</p>;
  }
  if (isError || !asset) {
    return <p className="text-red-500 py-6">Tillgången hittades inte</p>;
  }

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assetType.trim()) {
      alert("Ange tillgångstyp");
      return;
    }

    updateAsset.mutate(
      {
        assetType,
        description: description.trim() || "",
        units: units.trim() ? Number(units) : 0,
        valueStartOfYear: Number(valueStart),
        valueEndOfYear: Number(valueEnd),
        attachmentNumber: attachmentNumber.trim() || "",
      },
      {
        onSuccess: () => {
          // After update, react-query refetchar asset data automatiskt.
          // Du kan också navigera tillbaka om du vill:
          // navigate({ to: `/clients/${cid}/other-assets` });
        },
      }
    );
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 space-y-6">
      <header className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          Tillgång: <span className="text-blue-600">{asset.assetType}</span>
        </h2>
        <button
          onClick={() => navigate({ to: `/clients/${cid}/other-assets` })}
          className="px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          ← Alla tillgångar
        </button>
      </header>

      <form onSubmit={handleUpdate} className="space-y-5">
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
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-gray-700 mb-1">
            Beskrivning{" "}
            <span className="text-sm text-gray-400">(valfritt)</span>
          </label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label htmlFor="units" className="block text-gray-700 mb-1">
            Antal andelar{" "}
            <span className="text-sm text-gray-400">(valfritt)</span>
          </label>
          <input
            id="units"
            type="number"
            step="0.01"
            value={units}
            onChange={(e) => setUnits(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          disabled={updateAsset.isPending}
          className={`w-full flex justify-center items-center px-4 py-2 text-white font-medium rounded ${
            updateAsset.isPending
              ? "bg-green-300 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          } focus:outline-none focus:ring-2 focus:ring-green-500`}
        >
          {updateAsset.isPending ? "Sparar…" : "Spara ändringar"}
        </button>

        {updateAsset.isError && (
          <p className="text-red-500 text-sm mt-2">
            Fel: {(updateAsset.error as any).message || "Okänt fel"}
          </p>
        )}
      </form>
    </div>
  );
}
