// components/PrintButton.tsx
import { useEffect } from "react";
import { Printer } from "lucide-react";

export default function PrintButton() {
  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const isPrintShortcut =
        (e.ctrlKey && e.key === "p") || (e.metaKey && e.key === "p");
      if (isPrintShortcut) {
        e.preventDefault();
        handlePrint();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <button
      onClick={handlePrint}
      className="flex items-center px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600"
    >
      <Printer className="w-4 h-4 mr-2" />
      Print
    </button>
  );
}
