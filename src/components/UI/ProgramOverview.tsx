// src/components/ProgramOverview.tsx
import React from "react";
import { useGodmanProfile } from "../../hooks/useGodman";

export default function ProgramOverview() {
  const {
    data: godman,
    isLoading: profileLoading,
    isError: profileError,
  } = useGodmanProfile();

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-50 text-gray-800 px-4 py-12">
      {/* ────────── Rubrik ────────── */}
      <h1 className="text-4xl font-bold mb-6 text-center">
        Välkommen till Årsräkningssystemet
      </h1>

      {/* ────────── Kort introduktion ────────── */}
      <p className="text-lg mb-8 text-center max-w-2xl">
        En webbaserad tjänst som hjälper dig som godman att enkelt sköta hela
        års- och sluträkningen för dina huvudmän.
      </p>

      {/* ────────── Punktlista över funktioner ────────── */}
      <ul className="list-disc list-inside space-y-4 text-left max-w-2xl mb-8">
        <li>
          <span className="font-medium">Hantera bankkontotransaktioner:</span>
          Lägg till nya transaktioner, redigera befintliga och få automatisk
          summering.
        </li>
        <li>
          <span className="font-medium">Följa tillgångar och skulder:</span>
          Registrera övriga tillgångar (t.ex. fonder, fastigheter, sparkonton)
          med start- och slutvärde, och spåra förändringar över året. Håll även
          koll på eventuella skulder och deras förändringar mellan årets början
          och slut.
        </li>
        <li>
          <span className="font-medium">
            Automatiska beräkningar och kontroll:
          </span>{" "}
          Systemet räknar automatiskt ihop A + B (ingående saldo + inkomster)
          samt C + D (utgifter + utgående saldo) och varnar om beloppen inte
          stämmer, så du alltid kan vara säker på en korrekt redovisning.
        </li>
        <li>
          <span className="font-medium">
            Skapa utskriftsvänliga blanketter:
          </span>{" "}
          Generera färdiga årsräkningsblanketter (inklusive granskningssektion,
          signaturfält och övriga upplysningar) som är optimerade för utskrift
          eller PDF.
        </li>
      </ul>

      {/* ────────── Villkorad knapp ────────── */}
      {!profileLoading && godman ? (
        <a
          href="/clients"
          className="inline-block px-8 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 transition mb-4"
        >
          Gå till Klienter
        </a>
      ) : (
        <p className="text-lg font-medium mb-4 text-center">
          Kom igång genom att{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            logga in
          </a>{" "}
          eller{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            registrera dig
          </a>
          .
        </p>
      )}
    </div>
  );
}
