// src/components/Clients/DeleteClientButton.tsx
import { Trash2 } from "lucide-react";
import { useDeleteClient } from "../../hooks/useClients";
import { useNavigate } from "@tanstack/react-router";

interface DeleteClientButtonProps {
  clientId: number;
}

export default function DeleteClientButton({
  clientId,
}: DeleteClientButtonProps) {
  const deleteMutation = useDeleteClient(clientId);
  const navigate = useNavigate();
  const handleDelete = () => {
    if (window.confirm("Är du säker på att du vill ta bort denna klient?")) {
      deleteMutation.mutate();
      navigate({ to: "/clients" });
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="p-2 hover:bg-gray-100 rounded"
      aria-label="Radera klient"
    >
      <Trash2 className="w-5 h-5 text-red-600 hover:text-red-800" />
    </button>
  );
}
