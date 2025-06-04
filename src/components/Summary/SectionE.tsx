import { type OtherAssetDTO } from "../../hooks/useOtherAssets";

interface SectionEProps {
  otherAssets: OtherAssetDTO[];
  year: number;
}

export default function SectionE({ otherAssets, year }: SectionEProps) {
  // Formateringsfunktion för kronor
  const fmt = (num: number) =>
    num.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  // Summera start‐ och slutvärden
  const totalStart = otherAssets.reduce(
    (sum, asset) => sum + (asset.valueStartOfYear ?? 0),
    0
  );
  const totalEnd = otherAssets.reduce(
    (sum, asset) => sum + (asset.valueEndOfYear ?? 0),
    0
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 print:py-4">
      {/* Rubrik och instruktion */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        E. Övriga tillgångar
      </h2>
      <p className="text-sm text-gray-600 mb-2">
        Till exempel huvudmannens fickpengskonto, övriga konton, fastigheter,
        fonder, aktier och värdefullare lösöre (konst, bil, båt och så vidare).
        Specificera värdepapper med andelar och/eller antal och värde. Ange en
        bostadsrätts lägenhetsnummer och föreningens namn. Ange bostadsrättens
        värde om det är känt. Ange fastighetsbeteckning och kommun samt
        taxerings‐ eller inköpsvärde.
      </p>
      <p className="text-sm text-gray-600 mb-4">
        Bifoga års-/saldobesked för huvudmannens värdepappersinnehav samt gjorda
        värdepapperstransaktioner och avräkningsnotor för perioden. Bifoga även
        fastighetsens senaste taxeringsbevis.
      </p>

      {/* Tabell för E med border-collapse och tunna linjer */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-400 text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-400 px-2 py-1 text-left">
                Övriga tillgångar
              </th>
              <th className="border border-gray-400 px-2 py-1 text-left">
                Andelar, antal
              </th>
              <th className="border border-gray-400 px-2 py-1 text-right">
                Tillgångar 1 jan eller förordnandedatum
              </th>
              <th className="border border-gray-400 px-2 py-1 text-right">
                Tillgångar 31 dec eller upphörandedatum
              </th>
              <th className="border border-gray-400 px-2 py-1 text-left">
                Bilaga nr
              </th>
              <th className="border border-gray-400 px-2 py-1 text-left">
                ÖF notering
              </th>
            </tr>
          </thead>

          <tbody>
            {otherAssets.map((asset) => (
              <tr key={asset.id} className="bg-white">
                <td className="border border-gray-400 px-2 py-1">
                  {asset.assetType}
                  {asset.description ? ` – ${asset.description}` : ""}
                </td>
                <td className="border border-gray-400 px-2 py-1 text-left">
                  {asset.units ?? ""}
                </td>
                <td className="border border-gray-400 px-2 py-1 text-right">
                  {fmt(asset.valueStartOfYear)}
                </td>
                <td className="border border-gray-400 px-2 py-1 text-right">
                  {fmt(asset.valueEndOfYear)}
                </td>
                <td className="border border-gray-400 px-2 py-1 text-left">
                  {asset.attachmentNumber ?? ""}
                </td>
                <td className="border border-gray-400 px-2 py-1">&nbsp;</td>
              </tr>
            ))}

            {otherAssets.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="border border-gray-400 px-2 py-1 text-center text-gray-500"
                >
                  Inga övriga tillgångar ännu.
                </td>
              </tr>
            )}

            {/* Summeringsrad E */}
            <tr className="bg-gray-50">
              <td className="border border-gray-400 px-2 py-1 font-semibold text-right">
                Summa övriga tillgångar
              </td>
              <td className="border border-gray-400 px-2 py-1 text-left font-semibold">
                E
              </td>
              <td className="border border-gray-400 px-2 py-1 text-right font-semibold">
                {fmt(totalStart)}
              </td>
              <td className="border border-gray-400 px-2 py-1 text-right font-semibold">
                {fmt(totalEnd)}
              </td>
              <td className="border border-gray-400 px-2 py-1">&nbsp;</td>
              <td className="border border-gray-400 px-2 py-1">&nbsp;</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
