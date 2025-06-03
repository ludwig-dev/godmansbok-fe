// src/components/UI/Modal.tsx
import { type ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    const el = document.createElement("div");
    el.id = "modal-root";
    document.body.appendChild(el);
    return () => {
      document.body.removeChild(el);
    };
  }, []);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-white/20 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
}
