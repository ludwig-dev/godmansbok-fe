// src/hooks/useOtherAssets.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/client";

export interface OtherAssetDTO {
  id: number;
  assetType: string;
  description?: string;
  units?: number;
  valueStartOfYear: number;
  valueEndOfYear: number;
  attachmentNumber?: string;
}

// Hämta alla övriga tillgångar (GET)
export function useOtherAssets(clientId: number) {
  return useQuery<OtherAssetDTO[], Error>({
    queryKey: ["otherAssets", clientId],
    queryFn: () =>
      api
        .get<OtherAssetDTO[]>(`/api/clients/${clientId}/other-assets`)
        .then((res) => res.data),
    enabled: !!clientId,
  });
}

// Skapa OtherAsset (POST)
export function useCreateOtherAsset(clientId: number) {
  const qc = useQueryClient();
  return useMutation<OtherAssetDTO, Error, Omit<OtherAssetDTO, "id">>({
    mutationFn: (newAsset) =>
      api
        .post<OtherAssetDTO>(`/api/clients/${clientId}/other-assets`, newAsset)
        .then((res) => res.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["otherAssets", clientId] });
    },
    onError: (err: any) => {
      alert(err.response?.data || "Fel vid skapande av tillgång");
    },
  });
}

// Hämta enskild OtherAsset
export function useOtherAsset(clientId: number, assetId: number) {
  return useQuery<OtherAssetDTO, Error>({
    queryKey: ["otherAsset", clientId, assetId],
    queryFn: () =>
      api
        .get<OtherAssetDTO>(`/api/clients/${clientId}/other-assets/${assetId}`)
        .then((res) => res.data),
    enabled: !!clientId && !!assetId,
  });
}

// Uppdatera OtherAsset (PATCH)
export function useUpdateOtherAsset(clientId: number, assetId: number) {
  const qc = useQueryClient();
  return useMutation<OtherAssetDTO, Error, Partial<Omit<OtherAssetDTO, "id">>>({
    mutationFn: (upd) =>
      api
        .patch<OtherAssetDTO>(
          `/api/clients/${clientId}/other-assets/${assetId}`,
          upd
        )
        .then((res) => res.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["otherAssets", clientId] });
      qc.invalidateQueries({ queryKey: ["otherAsset", clientId, assetId] });
    },
    onError: (err: any) => {
      alert(err.response?.data || "Fel vid uppdatering av tillgång");
    },
  });
}

// Ta bort OtherAsset (DELETE)
export function useDeleteOtherAsset(clientId: number, assetId: number) {
  const qc = useQueryClient();
  return useMutation<void, Error>({
    mutationFn: () =>
      api
        .delete(`/api/clients/${clientId}/other-assets/${assetId}`)
        .then(() => {}),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["otherAssets", clientId] });
    },
    onError: (err: any) => {
      alert(err.response?.data || "Fel vid radering av tillgång");
    },
  });
}
