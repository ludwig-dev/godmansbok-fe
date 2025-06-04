// src/components/Summary/ReviewSection.tsx
import React from "react";

export default function ReviewSection() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 print:py-4">
      {/* ────────── Rubrik ────────── */}
      <h2 className="text-2xl font-semibold mb-4">
        Överförmyndarförvaltningens granskning
      </h2>

      {/* ────────── Allt omslutet av en enda ram ────────── */}
      <div className="border border-black">
        {/* ────────── Rad 1: tre kolumner med checkbox + text ────────── */}
        <div className="grid grid-cols-3 border-b border-black">
          {/* Kolumn 1 */}
          <div className="border-r border-black px-4 py-3 flex items-center">
            <div className="w-5 h-5 border border-black flex-shrink-0"></div>
            <span className="text-sm ml-2">Granskad utan anmärkning.</span>
          </div>
          {/* Kolumn 2 */}
          <div className="border-r border-black px-4 py-3 flex items-center">
            <div className="w-5 h-5 border border-black flex-shrink-0"></div>
            <span className="text-sm ml-2">
              Granskad utan anmärkning, men med korrigering.
            </span>
          </div>
          {/* Kolumn 3 */}
          <div className="px-4 py-3 flex items-center">
            <div className="w-5 h-5 border border-black flex-shrink-0"></div>
            <span className="text-sm ml-2">
              Granskad med anmärkning, se bilaga.
            </span>
          </div>
        </div>

        {/* ────────── Rad 2: en hel rad (spans över alla tre) med checkbox + text ────────── */}
        <div className="border-b border-black px-4 py-3 flex items-center">
          <div className="w-5 h-5 border border-black flex-shrink-0"></div>
          <span className="text-sm ml-2">Granskningskommentarer bifogas.</span>
        </div>

        {/* ────────── Rad 3: en hel rad (spans över alla tre) med tom linje + etikett ────────── */}
        <div className="border-b border-black px-4 py-4">
          <div className="text-xs mt-1">Ort och datum</div>
        </div>

        {/* ────────── Rad 4: två kolumner för signatur ────────── */}
        <div className="grid grid-cols-2">
          {/* Namnteckning */}
          <div className="border-r border-black px-4 py-4">
            <div className="text-xs">Namnteckning</div>
          </div>
          {/* Namnförtydligande */}
          <div className="px-4 py-4">
            <div className="text-xs">Namnförtydligande</div>
          </div>
        </div>
      </div>
    </div>
  );
}
