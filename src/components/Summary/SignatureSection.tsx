export default function SignatureSection() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-4 print:py-4">
      {/* ────────── Rubrik ────────── */}
      <h2 className="text-2xl font-semibold mb-4">
        God man/förvaltare/förmyndare
      </h2>

      {/* ────────── Tvåkollons-tabell ────────── */}
      <table className="w-full border-collapse border border-black text-sm mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-black px-2 py-1 text-left">Namn</th>
            <th className="border border-black px-2 py-1 text-left">Namn</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white">
            <td className="border border-black h-8"></td>
            <td className="border border-black h-8"></td>
          </tr>
        </tbody>

        <thead>
          <tr className="bg-gray-100">
            <th className="border border-black px-2 py-1 text-left">
              Personnummer
            </th>
            <th className="border border-black px-2 py-1 text-left">
              Personnummer
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white">
            <td className="border border-black h-8"></td>
            <td className="border border-black h-8"></td>
          </tr>
        </tbody>

        <thead>
          <tr className="bg-gray-100">
            <th className="border border-black px-2 py-1 text-left">Adress</th>
            <th className="border border-black px-2 py-1 text-left">Adress</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white">
            <td className="border border-black h-8"></td>
            <td className="border border-black h-8"></td>
          </tr>
        </tbody>

        <thead>
          <tr className="bg-gray-100">
            <th className="border border-black px-2 py-1 text-left">
              Postnummer och ort
            </th>
            <th className="border border-black px-2 py-1 text-left">
              Postnummer och ort
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white">
            <td className="border border-black h-8"></td>
            <td className="border border-black h-8"></td>
          </tr>
        </tbody>

        <thead>
          <tr className="bg-gray-100">
            <th className="border border-black px-2 py-1 text-left">Telefon</th>
            <th className="border border-black px-2 py-1 text-left">Telefon</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white">
            <td className="border border-black h-8"></td>
            <td className="border border-black h-8"></td>
          </tr>
        </tbody>

        <thead>
          <tr className="bg-gray-100">
            <th className="border border-black px-2 py-1 text-left">E‐post</th>
            <th className="border border-black px-2 py-1 text-left">E‐post</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white">
            <td className="border border-black h-8"></td>
            <td className="border border-black h-8"></td>
          </tr>
        </tbody>
      </table>

      {/* ────────── Intygstext ────────── */}
      <p className="text-sm">
        Härmed intygas på heder och samvete att de uppgifter som lämnats i denna
        års-/sluträkning är riktiga. Tänk på att felaktiga uppgifter i
        redovisningen kan medföra straffansvar för osann försäkran enligt 15 kap
        10 § brottsbalken.
      </p>

      {/* ────────── Signatursfält ────────── */}
      <div className="flex justify-between space-x-4">
        {/* Vänster signaturblock */}
        <div className="w-1/2">
          <div className="border-b border-black mb-1 h-8"></div>
          <div className="text-xs">Ort och datum</div>
          <div className="border-b border-black mt-1 mb-1 h-8"></div>
          <div className="text-xs">
            God man/förvaltare/förmyndares namnteckning
          </div>
        </div>

        {/* Höger signaturblock */}
        <div className="w-1/2">
          <div className="border-b border-black mb-1 h-8"></div>
          <div className="text-xs">Ort och datum</div>
          <div className="border-b border-black mt-1 mb-1 h-8"></div>
          <div className="text-xs">
            God man/förvaltare/förmyndares namnteckning
          </div>
        </div>
      </div>
    </div>
  );
}
