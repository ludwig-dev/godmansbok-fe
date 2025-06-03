// src/pages/SummaryPage.tsx
import { useEffect, useState } from "react";
import { useSummary } from "../../hooks/useSummary";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Route } from "../..//routes/clients/$clientId/route";

export default function SummaryPage() {
    // Hämta clientId från route‐parametrar
    const { clientId } = Route.useParams<{ clientId: string }>();
    const cid = Number(clientId);
    const navigate = useNavigate();

    const search = useSearch<{ year?: string }>({});
    const paramYear = search.year;
    const initialYear = paramYear ? Number(paramYear) : new Date().getFullYear();

    const [year, setYear] = useState<number>(initialYear);

    const { data, isLoading, isError, error, refetch } = useSummary(cid, year);

    useEffect(() => {
        navigate({
            to: `/clients/${cid}/summary`,
            search: () => ({ year: year.toString() }),
        });
        // Refetcha data
        refetch();
    }, [year]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full py-12">
                <p className="text-gray-500">Laddar sammanställning…</p>
            </div>
        );
    }

    if (isError || !data) {
        return (
            <div className="flex items-center justify-center h-full py-12">
                <p className="text-red-500">
                    Fel vid hämtning: {(error as any)?.message || "Okänt fel"}
                </p>
            </div>
        );
    }
    // 7) Destrukturera med fallbacks (så att undefined → 0)
    const startBalance = data.startBalance ?? 0;  // A
    const sumIncome = data.sumIncome ?? 0;        // B
    const totalAB = data.totalAB ?? 0;
    const sumExpense = data.sumExpenses ?? 0;      // C
    const endBalance = data.endBalance ?? 0;      // D
    const totalCD = data.totalCD ?? 0;
    const match = data.match;                     // boolean

    return (
        <div className="bg-gray-50 min-h-screen px-4 py-8">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* År‐väljaren */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Sammanställning för {year}
                    </h1>

                </div>

                {/* A: Tillgångar den 1 januari */}
                <section className="bg-white shadow rounded-lg p-6 space-y-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                        A. Tillgångar den 1 januari
                    </h2>
                    <p className="text-gray-600">
                        Totala värdet av huvudmannens tillgångar vid årets början.
                    </p>
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-medium text-gray-900">Summa (A):</span>
                        <span className="text-lg font-semibold text-gray-800">
                            {startBalance.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}{" "}
                            kr
                        </span>
                    </div>
                </section>

                {/* B: Inkomster under perioden */}
                <section className="bg-white shadow rounded-lg p-6 space-y-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                        B. Inkomster under perioden
                    </h2>
                    <p className="text-gray-600">
                        Summan av alla skattepliktiga inkomster som huvudmannen mottagit
                        under året före skatt.
                    </p>
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-medium text-gray-900">Summa (B):</span>
                        <span className="text-lg font-semibold text-gray-800">
                            {sumIncome.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}{" "}
                            kr
                        </span>
                    </div>
                </section>

                {/* A + B */}
                <section className="bg-white shadow rounded-lg p-6 space-y-4">
                    <h2 className="text-xl font-semibold text-gray-800">A + B</h2>
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-medium text-gray-900">Summa (A+B):</span>
                        <span className="text-lg font-semibold text-gray-800">
                            {totalAB.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}{" "}
                            kr
                        </span>
                    </div>
                </section>

                {/* C: Betalda utgifter under perioden */}
                <section className="bg-white shadow rounded-lg p-6 space-y-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                        C. Betalda utgifter under perioden
                    </h2>
                    <p className="text-gray-600">
                        Summan av alla betalda utgifter som huvudmannen haft under året.
                    </p>
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-medium text-gray-900">Summa (C):</span>
                        <span className="text-lg font-semibold text-gray-800">
                            {sumExpense.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}{" "}
                            kr
                        </span>
                    </div>
                </section>

                {/* D: Tillgångar den 31 december */}
                <section className="bg-white shadow rounded-lg p-6 space-y-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                        D. Tillgångar den 31 december
                    </h2>
                    <p className="text-gray-600">
                        Totala värdet av huvudmannens tillgångar vid årets slut.
                    </p>
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-medium text-gray-900">Summa (D):</span>
                        <span className="text-lg font-semibold text-gray-800">
                            {endBalance.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}{" "}
                            kr
                        </span>
                    </div>
                </section>

                {/* C + D */}
                <section className="bg-white shadow rounded-lg p-6 space-y-4">
                    <h2 className="text-xl font-semibold text-gray-800">C + D</h2>
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-medium text-gray-900">Summa (C+D):</span>
                        <span className="text-lg font-semibold text-gray-800">
                            {totalCD.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}{" "}
                            kr
                        </span>
                    </div>
                </section>

                {/* Kontrollsumma */}
                <section className="bg-white shadow rounded-lg p-6 space-y-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Kontroll av redovisning
                    </h2>
                    <p className="text-gray-700">
                        Summera A + B och C + D. Din redovisning{" "}
                        {match ? (
                            <span className="font-semibold text-green-600">stämmer ✅</span>
                        ) : (
                            <span className="font-semibold text-red-600">stämmer EJ ❌</span>
                        )}.
                    </p>
                </section>
            </div>
        </div>
    );
}