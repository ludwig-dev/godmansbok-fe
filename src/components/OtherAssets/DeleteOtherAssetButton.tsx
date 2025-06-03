import { Trash2 } from "lucide-react";
import { useDeleteOtherAsset } from "../../hooks/useOtherAssets";

interface DeleteOtherAssetButtonProps {
    clientId: number;
    assetId: number;
}

export default function DeleteOtherAssetButton({
    clientId,
    assetId,
}: DeleteOtherAssetButtonProps) {
    const deleteMutation = useDeleteOtherAsset(clientId, assetId);

    const handleDelete = () => {
        if (
            window.confirm("Är du säker på att du vill ta bort denna tillgång?")
        ) {
            deleteMutation.mutate();
        }
    };

    return (
        <button
            onClick={handleDelete}
            className="p-2 hover:bg-gray-100 rounded"
            aria-label="Radera tillgång"
        >
            <Trash2 className="w-5 h-5 text-red-600 hover:text-red-800" />
        </button>
    );
}
