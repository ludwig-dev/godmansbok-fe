// src/pages/SummaryContainer.tsx
import { useEffect, useState } from "react";
import { useSummary } from "../../hooks/useSummary";
import { useTransactions } from "../../hooks/useTransactions";
import { useOtherAssets } from "../../hooks/useOtherAssets";
import { useLiabilities, type LiabilityDTO } from "../../hooks/useLiabilities";
import { useNavigate, useSearch } from "@tanstack/react-router";
import HeaderSection from "./HeaderSection";
import SignatureSection from "./SignatureSection";
import ReviewSection from "./ReviewSection";
import SectionA from "./SectionA";
import SectionB from "./SectionB";
import SectionC from "./SectionC";
import SectionD from "./SectionD";
import SectionE from "./SectionE";
import SectionF from "./SectionF";
import AdditionalInfoSection from "./AdditionalInfoSection";
import { Route } from "../../routes/clients/$clientId/route";
import type { TransactionDTO } from "../../hooks/useTransactions";
import PrintButton from "../UI/PrintButton";

export default function SummaryContainer() {
  // 1) Läs av clientId från route‐parametrar
  const { clientId } = Route.useParams<{ clientId: string }>();
  const cid = Number(clientId);
  const navigate = useNavigate();

  // 2) År via sökparametrar
  const search = useSearch<{ year?: string }>({});
  const paramYear = search.year;
  const initialYear = paramYear ? Number(paramYear) : new Date().getFullYear();
  const [year, setYear] = useState<number>(initialYear);

  // 3) Hämta summary (innehåller accountId, accountName, accountNumber, startBalance, sumIncome, totalAB, sumExpenses, endBalance, totalCD, match)
  const {
    data: summary,
    isLoading: loadingSummary,
    isError: errorSummary,
    error: summaryError,
    refetch: refetchSummary,
  } = useSummary(cid, year);

  // 4) Ta fram accountId — om summary är undefined, sätt 0
  const accountId = summary?.accountId ?? 0;

  // 5) Hämta ALLA transaktioner för det kontot (anropa alltid hooken, men "enabled" är inbyggt i useTransactions)
  const {
    data: allTransactions,
    isLoading: loadingTx,
    isError: errorTx,
    error: txError,
  } = useTransactions(cid, accountId);

  const {
    data: otherAssets,
    isLoading: loadingOtherAssets,
    isError: errorOtherAssets,
    error: otherAssetsError,
  } = useOtherAssets(cid);

  const {
    data: liabilities,
    isLoading: loadingLiabilities,
    isError: errorLiabilities,
    error: liabilitiesError,
  } = useLiabilities(cid);

  // 6) När år ändras, uppdatera URL + refetcha summary
  useEffect(() => {
    navigate({
      to: `/clients/${cid}/summaryprint`,
      search: () => ({ year: year.toString() }),
    });
    refetchSummary();
  }, [year]);

  // ─────────────────────────────────────────────────────
  // 7) Tidiga "returns" (loading + fel) – alla hook‐anrop är redan gjorda ovan.

  // 7a) Sammanställnings‐data laddas fortfarande?
  if (loadingSummary || !summary) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Laddar sammanställning…</p>
      </div>
    );
  }
  // 7b) Sammanställnings‐data misslyckades?
  if (errorSummary) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">
          Fel vid hämtning: {(summaryError as any)?.message || "Okänt fel"}
        </p>
      </div>
    );
  }

  // Här är summary garanterat definierad.
  const {
    accountName,
    accountNumber,
    startBalance,
    sumIncome,
    totalAB,
    sumExpenses,
    totalCD,
    endBalance,
  } = summary;

  // 7c) Transaktionerna laddas fortfarande?
  // Om accountId är 0 (allTransactions är inte igång) eller loadingTx är true ➝ visa loading
  if (accountId === 0 || loadingTx || !allTransactions) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Laddar transaktioner…</p>
      </div>
    );
  }
  // 7d) Fel vid hämtning av transaktioner?
  if (errorTx) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">
          Fel vid hämtning av transaktioner:{" "}
          {(txError as any)?.message || "Okänt fel"}
        </p>
      </div>
    );
  }

  if (loadingOtherAssets || !otherAssets) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Laddar övriga tillgångar…</p>
      </div>
    );
  }
  if (errorOtherAssets) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">
          Fel vid hämtning av övriga tillgångar:{" "}
          {(otherAssetsError as any)?.message || "Okänt fel"}
        </p>
      </div>
    );
  }

  if (loadingLiabilities || !liabilities) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Laddar skulder…</p>
      </div>
    );
  }
  if (errorLiabilities) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">
          Fel vid hämtning av skulder:{" "}
          {(liabilitiesError as any)?.message || "Okänt fel"}
        </p>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────
  // 8) Filtrera inkomster (INKOMST) & utgifter (UTGIFT) för valt år
  const incomes: TransactionDTO[] = allTransactions
    .filter((tx) => tx.type === "INKOMST")
    .filter((tx) => new Date(tx.date).getFullYear() === year)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const expenses: TransactionDTO[] = allTransactions
    .filter((tx) => tx.type === "UTGIFT")
    .filter((tx) => new Date(tx.date).getFullYear() === year)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // ─────────────────────────────────────────────────────
  // 9) Rendera alla sektioner A, B och C
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="flex justify-end max-w-3xl space-y-6 m-4 print:hidden">
        <PrintButton />
      </div>

      <HeaderSection />
      <SignatureSection />
      <ReviewSection />

      {/* Huvudsektion: Blankett för årsräkning eller sluträkning */}
      {/* Sektion A: Tillgångar den 1 januari */}
      <SectionA
        accountName={accountName}
        accountNumber={accountNumber}
        startBalance={startBalance}
      />

      {/* Sektion B: Inkomster */}
      <SectionB incomes={incomes} totalAB={totalAB} year={year} />

      {/* Sektion C: Utgifter */}
      <SectionC
        expenses={expenses}
        totalCD={totalCD}
        sumExpenses={sumExpenses}
        year={year}
      />

      <SectionD
        accountName={accountName}
        accountNumber={accountNumber}
        endBalance={endBalance}
        totalCD={totalCD}
        year={year}
      />
      <SectionE otherAssets={otherAssets} year={year} />
      <SectionF liabilities={liabilities} year={year} />
      <AdditionalInfoSection />
    </div>
  );
}
