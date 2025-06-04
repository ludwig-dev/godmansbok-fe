interface SectionAProps {
  accountName: string;
  accountNumber?: string;
  startBalance: number;
}

export default function SectionA({
  accountName,
  accountNumber,
  startBalance,
}: SectionAProps) {
  // Formateringsfunktion för kronor
  const fmt = (num: number) =>
    num.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Rubrik och instruktion */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        A. Tillgångar den 1 januari
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        Den 1 januari eller per förordnandedatum. Hämta uppgifterna från
        föregående årsredovisning eller sluträkning. Ange endast bankkonto/
        kontanter som god man/förvaltare disponerar, det vill säga
        transaktionskontot.
      </p>
      <p className="text-sm text-gray-600 mb-4">
        Övriga tillgångar som exempel huvudmannens fickpengskonto, övriga
        konton, fastigheter, fonder, aktier och värdefullare lösöre redovisas
        under E.
      </p>

      {/* Tabell för A */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-400 text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-400 px-2 py-1 text-left">
                Bank, kontonummer
              </th>
              <th className="border border-gray-400 px-2 py-1 text-right">
                Kronor
              </th>
              <th className="border border-gray-400 px-2 py-1 text-left">
                ÖF notering
              </th>
            </tr>
          </thead>
          <tbody>
            {/* En rad med accountName + accountNumber */}
            <tr className="bg-white">
              <td className="border border-gray-400 px-2 py-1">
                {accountName}
                {accountNumber ? ` / ${accountNumber}` : ""}
              </td>
              <td className="border border-gray-400 px-2 py-1 text-right">
                {fmt(startBalance)}
              </td>
              <td className="border border-gray-400 px-2 py-1">&nbsp;</td>
            </tr>

            {/* Slut‐rad med summering A */}
            <tr className="bg-gray-50">
              <td className="border border-gray-400 px-2 py-1 font-semibold text-right">
                Summa A:
              </td>
              <td className="border border-gray-400 px-2 py-1 text-right font-semibold">
                {fmt(startBalance)}
              </td>
              <td className="border border-gray-400 px-2 py-1">&nbsp;</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
