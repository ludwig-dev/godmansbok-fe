// src/components/Summary/SectionB.tsx
import React from "react";
import { type TransactionDTO } from "../../hooks/useTransactions";

interface SectionBProps {
  incomes: TransactionDTO[];
  totalAB: number;
  year: number;
}

export default function SectionB({ incomes, totalAB, year }: SectionBProps) {
  // Formateringsfunktion för kronor
  const fmt = (num: number) =>
    num.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 print:py-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        B. Inkomster under perioden
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        Bifoga kontrolluppgift för skattepliktiga inkomster och underlag för
        icke skattepliktiga inkomster. Skattepliktiga inkomsterna ska redovisas
        före skatt. Endast transaktioner som skett under aktuell period ({year})
        ska tas med.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-400 text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-400 px-2 py-1 text-left">
                Inkomster under perioden
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
            {incomes.map((tx) => (
              <tr key={tx.id} className="bg-white">
                <td className="border border-gray-400 px-2 py-1">
                  {tx.date} – {tx.description ?? ""}
                </td>
                <td className="border border-gray-400 px-2 py-1 text-right">
                  {fmt(tx.amount)}
                </td>
                <td className="border border-gray-400 px-2 py-1 text-left">
                  {tx.attachmentNumber ?? ""}
                </td>
                <td className="border border-gray-400 px-2 py-1">&nbsp;</td>
              </tr>
            ))}

            {incomes.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="border border-gray-400 px-2 py-1 text-center text-gray-500"
                >
                  Inga inkomster ännu.
                </td>
              </tr>
            )}

            <tr className="bg-gray-50">
              <td className="border border-gray-400 px-2 py-1 font-semibold text-right">
                Summa A + B:
              </td>
              <td className="border border-gray-400 px-2 py-1 text-right font-semibold">
                {fmt(totalAB)}
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
