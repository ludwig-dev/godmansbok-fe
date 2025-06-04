// src/components/Summary/SectionC.tsx
import React from "react";
import { type TransactionDTO } from "../../hooks/useTransactions";

interface SectionCProps {
  expenses: TransactionDTO[];
  sumExpenses: number;
  totalCD: number;
  year: number;
}

export default function SectionC({
  expenses,
  sumExpenses,
  totalCD,
  year,
}: SectionCProps) {
  // Formateringsfunktion för kronor
  const fmt = (num: number) =>
    num.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 print:py-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        C. Betalda utgifter under perioden
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        Bifoga kontoutdrag för transaktionskonto, underlag som visar avdragen
        skatt för samtliga inkomster. Bifoga kopior på underskrivna kvitton av
        överlämnade kontanter, representativa fakturor för de största
        utgiftsposterna samt gjorda investeringar. Endast transaktioner som
        skett under perioden ({year}) ska tas med.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-400 text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-400 px-2 py-1 text-left">
                Utgifter under perioden
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
            {expenses.map((tx) => (
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

            {expenses.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="border border-gray-400 px-2 py-1 text-center text-gray-500"
                >
                  Inga utgifter ännu.
                </td>
              </tr>
            )}

            <tr className="bg-gray-50">
              <td className="border border-gray-400 px-2 py-1 font-semibold text-right">
                Summa utgifter (C):
              </td>
              <td className="border border-gray-400 px-2 py-1 text-right font-semibold">
                {fmt(sumExpenses)}
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
