import { type LiabilityDTO } from "../../hooks/useLiabilities";

interface SectionFProps {
  liabilities: LiabilityDTO[];
  year: number;
}

export default function SectionF({ liabilities, year }: SectionFProps) {
  // Formateringsfunktion för kronor
  const fmt = (num: number) =>
    num.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  // Summera skulder vid årets början, slutet och förändring
  const totalStart = liabilities.reduce(
    (sum, liab) => sum + (liab.debtStartOfYear ?? 0),
    0
  );
  const totalEnd = liabilities.reduce(
    (sum, liab) => sum + (liab.debtEndOfYear ?? 0),
    0
  );
  const totalChange = liabilities.reduce(
    (sum, liab) => sum + (liab.changeAmount ?? 0),
    0
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 print:py-4">
      {/* Rubrik och instruktion */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">F. Skulder</h2>
      <p className="text-sm text-gray-600 mb-4">
        Bifoga underlag som styrker skuldernas existens och storlek. Skulderna
        ska styrkas med till exempel en låneavi från långivare eller
        Kronofogden. Endast skulder som avser perioden ({year}) ska tas med.
      </p>

      {/* Tabell för F med border-collapse och tunna grå kanter */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-400 text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-400 px-2 py-1 text-left">
                Långivare/fordringsägare
              </th>
              <th className="border border-gray-400 px-2 py-1 text-left">
                Bilaga nr
              </th>
              <th className="border border-gray-400 px-2 py-1 text-right">
                Skulder 1 jan eller förordnandedatum
              </th>
              <th className="border border-gray-400 px-2 py-1 text-right">
                Skulder 31 dec eller upphörandedatum
              </th>
              <th className="border border-gray-400 px-2 py-1 text-right">
                Förändring +/-
              </th>
              <th className="border border-gray-400 px-2 py-1 text-left">
                ÖF:s notering
              </th>
            </tr>
          </thead>

          <tbody>
            {liabilities.map((liab) => (
              <tr key={liab.id} className="bg-white">
                <td className="border border-gray-400 px-2 py-1">
                  {liab.creditor}
                </td>
                <td className="border border-gray-400 px-2 py-1 text-left">
                  {liab.attachmentNumber ?? ""}
                </td>
                <td className="border border-gray-400 px-2 py-1 text-right">
                  {fmt(liab.debtStartOfYear)}
                </td>
                <td className="border border-gray-400 px-2 py-1 text-right">
                  {fmt(liab.debtEndOfYear)}
                </td>
                <td className="border border-gray-400 px-2 py-1 text-right">
                  {fmt(liab.changeAmount ?? 0)}
                </td>
                <td className="border border-gray-400 px-2 py-1">&nbsp;</td>
              </tr>
            ))}

            {liabilities.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="border border-gray-400 px-2 py-1 text-center text-gray-500"
                >
                  Inga skulder ännu.
                </td>
              </tr>
            )}

            {/* Summeringsrad F */}
            <tr className="bg-gray-50">
              <td className="border border-gray-400 px-2 py-1 font-semibold text-right">
                Summa skulder
              </td>
              <td className="border border-gray-400 px-2 py-1 text-left font-semibold">
                F
              </td>
              <td className="border border-gray-400 px-2 py-1 text-right font-semibold">
                {fmt(totalStart)}
              </td>
              <td className="border border-gray-400 px-2 py-1 text-right font-semibold">
                {fmt(totalEnd)}
              </td>
              <td className="border border-gray-400 px-2 py-1 text-right font-semibold">
                {fmt(totalChange)}
              </td>
              <td className="border border-gray-400 px-2 py-1">&nbsp;</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
