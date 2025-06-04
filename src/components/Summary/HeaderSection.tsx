// src/components/Summary/HeaderSection.tsx
import React from "react";

export default function HeaderSection() {
  return (
    <div className="max-w-3xl mx-auto px-4 print:py-4">
      {/* ────────── Översta del: delad i två halvor ────────── */}
      <div className="flex mb-6">
        {/* ─── Vänster (logo + postadress) tar 1/2 av bredden ─── */}
        <div className="w-1/2 flex flex-col">
          {/* Logo */}
          <img
            src="/smallLogo.png"
            alt="Stockholms stad"
            className="w-full h-auto mb-4"
          />
          {/* Postadress under bilden */}
          <div className="text-xs space-y-1">
            <div className="font-semibold">POSTADRESS</div>
            <div>Överförmyndarförvaltningen</div>
            <div>Box 12216</div>
            <div>102 25 Stockholm</div>
          </div>
        </div>

        {/* ─── Höger: Titel + kryssrutor staplade, tar 1/2 av bredden ─── */}
        <div className="w-1/2 pl-4 flex flex-col justify-start">
          {/* Titel */}
          <h1 className="text-3xl font-bold mb-4">
            Blankett för årsräkning eller sluträkning
          </h1>

          {/* Årsräkning */}
          <div className="mb-2">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 border border-black"></div>
              <span className="font-medium">Årsräkning</span>
              <div className="ml-4 border-b border-black w-48 h-0"></div>
            </div>
            <p className="text-xs text-gray-600 mt-1">
              Ange start- och slutdatum (från 20XX-XX-XX till 20XX-XX-XX)
            </p>
          </div>

          {/* Sluträkning */}
          <div className="mb-2">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 border border-black"></div>
              <span className="font-medium">Sluträkning</span>
              <div className="ml-4 border-b border-black w-48 h-0"></div>
            </div>
            <p className="text-xs text-gray-600 mt-1">
              Ange start- och slutdatum (från 20XX-XX-XX till 20XX-XX-XX)
            </p>
          </div>
        </div>
      </div>

      {/* ────────── Vuxen / Underårig ────────── */}
      <div className="flex items-center space-x-8 mb-8">
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 border border-black"></div>
          <span className="font-medium">Vuxen</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 border border-black"></div>
          <span className="font-medium">Underårig</span>
        </div>
      </div>

      {/* ────────── Huvudmannens uppgifter ────────── */}
      <table className="w-full border-collapse border border-black text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-black px-2 py-1 text-left font-medium">
              Namn
            </th>
            <th className="border border-black px-2 py-1 text-left font-medium">
              Personnummer
            </th>
            <th className="border border-black px-2 py-1 text-left font-medium">
              Telefon
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white">
            <td className="border border-black h-10"></td>
            <td className="border border-black h-10"></td>
            <td className="border border-black h-10"></td>
          </tr>
        </tbody>
      </table>

      {/* ────────── Folkbokförings-/Vistelseadress ────────── */}
      <table className="w-full border-collapse border border-black text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-black px-2 py-1 text-left font-medium">
              Folkbokföringsadress
            </th>
            <th className="border border-black px-2 py-1 text-left font-medium">
              Postnummer och ort
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white">
            <td className="border border-black h-10"></td>
            <td className="border border-black h-10"></td>
          </tr>
        </tbody>
      </table>

      <table className="w-full border-collapse border border-black text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-black px-2 py-1 text-left font-medium">
              Vistelseadress
            </th>
            <th className="border border-black px-2 py-1 text-left font-medium">
              Postnummer och ort
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white">
            <td className="border border-black h-10"></td>
            <td className="border border-black h-10"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
