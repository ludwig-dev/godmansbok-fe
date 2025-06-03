// src/components/Liabilities/DeleteLiabilityButton.tsx
import { Trash2 } from "lucide-react";
import { useDeleteLiability } from "../../hooks/useLiabilities";

interface DeleteLiabilityButtonProps {
    clientId: number;
    liabilityId: number;
}

export default function DeleteLiabilityButton({
    clientId,
    liabilityId,
}: DeleteLiabilityButtonProps) {
    const deleteMutation = useDeleteLiability(clientId, liabilityId);

    const handleDelete = () => {
        if (window.confirm("Är du säker på att du vill ta bort denna skuld?")) {
            deleteMutation.mutate();
        }
    };

    return (
        <button
            onClick={handleDelete}
            className="p-2 hover:bg-gray-100 rounded"
            aria-label="Radera skuld"
        >
            <Trash2 className="w-5 h-5 text-red-600 hover:text-red-800" />
        </button>
    );
}
