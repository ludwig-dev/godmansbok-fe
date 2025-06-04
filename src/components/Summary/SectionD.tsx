interface SectionDProps {
  accountName: string;
  accountNumber?: string;
  endBalance: number;
  totalCD: number;
  year: number;
}

export default function SectionD({
  accountName,
  accountNumber,
  endBalance,
  totalCD,
  year,
}: SectionDProps) {
  // Formateringsfunktion för kronor
  const fmt = (num: number) =>
    num.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 print:py-4">
      {/* Rubrik och instruktion */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        D. Tillgångar den 31 december eller upphörandedatum
      </h2>
      <p className="text-sm text-gray-600 mb-2">
        Ange endast bankkonto/kontanter som god man/förvaltare disponerar, det
        vill säga transaktionskontot. Bifoga års-/saldobesked för huvudmannens
        samtliga konton vid periodens slut och kontoutdrag för transaktionskonto
        för hela perioden.
      </p>
      <p className="text-sm text-gray-600 mb-4">
        Övriga tillgångar som exempel huvudmannens fickpengskonto, övriga
        konton, fastigheter, fonder, aktier och värdefullare lösöre redovisas
        under E.
      </p>

      {/* Tabell för D med border-collapse och tunna grå kanter */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-400 text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-400 px-2 py-1 text-left">
                Bank, kontonummer
              </th>
              <th className="border border-gray-400 px-2 py-1 text-right">
                Kronor
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
            {/* Rad med konto‐namn/nummer + slutbelopp */}
            <tr className="bg-white">
              <td className="border border-gray-400 px-2 py-1">
                {accountName}
                {accountNumber ? ` / ${accountNumber}` : ""}
              </td>
              <td className="border border-gray-400 px-2 py-1 text-right">
                {fmt(endBalance)}
              </td>
              <td className="border border-gray-400 px-2 py-1">&nbsp;</td>
              <td className="border border-gray-400 px-2 py-1">&nbsp;</td>
            </tr>

            {/* Några tomma rader om man vill rita ut fler konton */}
            <tr className="bg-white">
              <td className="border border-gray-400 px-2 py-1">&nbsp;</td>
              <td className="border border-gray-400 px-2 py-1">&nbsp;</td>
              <td className="border border-gray-400 px-2 py-1">&nbsp;</td>
              <td className="border border-gray-400 px-2 py-1">&nbsp;</td>
            </tr>
            <tr className="bg-white">
              <td className="border border-gray-400 px-2 py-1">&nbsp;</td>
              <td className="border border-gray-400 px-2 py-1">&nbsp;</td>
              <td className="border border-gray-400 px-2 py-1">&nbsp;</td>
              <td className="border border-gray-400 px-2 py-1">&nbsp;</td>
            </tr>

            {/* Summeringsrad D */}
            <tr className="bg-gray-50">
              <td className="border border-gray-400 px-2 py-1 font-semibold text-right">
                Summa tillgångar D:
              </td>
              <td className="border border-gray-400 px-2 py-1 text-right font-semibold">
                {fmt(endBalance)}
              </td>
              <td className="border border-gray-400 px-2 py-1">&nbsp;</td>
              <td className="border border-gray-400 px-2 py-1">&nbsp;</td>
            </tr>

            {/* Summeringsrad C + D */}
            <tr className="bg-gray-50">
              <td className="border border-gray-400 px-2 py-1 font-semibold text-right">
                Summa C + D:
              </td>
              <td className="border border-gray-400 px-2 py-1 text-right font-semibold">
                {fmt(totalCD)}
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
