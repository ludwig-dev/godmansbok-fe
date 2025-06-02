// src/hooks/useLiabilities.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/client";

export interface LiabilityDTO {
  id: number;
  creditor: string;
  debtStartOfYear: number;
  debtEndOfYear: number;
  changeAmount?: number;
  attachmentNumber?: string;
}

// Hämta alla skulder (GET)
export function useLiabilities(clientId: number) {
  return useQuery<LiabilityDTO[], Error>({
    queryKey: ["liabilities", clientId],
    queryFn: () =>
      api
        .get<LiabilityDTO[]>(`/api/clients/${clientId}/liabilities`)
        .then((res) => res.data),
    enabled: !!clientId,
  });
}

// Skapa skuld (POST)
export function useCreateLiability(clientId: number) {
  const qc = useQueryClient();
  return useMutation<LiabilityDTO, Error, Omit<LiabilityDTO, "id">>({
    mutationFn: (newLiab) =>
      api
        .post<LiabilityDTO>(`/api/clients/${clientId}/liabilities`, newLiab)
        .then((res) => res.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["liabilities", clientId] });
    },
    onError: (err: any) => {
      alert(err.response?.data || "Fel vid skapande av skuld");
    },
  });
}

// Hämta en enskild skuld
export function useLiability(clientId: number, liabilityId: number) {
  return useQuery<LiabilityDTO, Error>({
    queryKey: ["liability", clientId, liabilityId],
    queryFn: () =>
      api
        .get<LiabilityDTO>(
          `/api/clients/${clientId}/liabilities/${liabilityId}`
        )
        .then((res) => res.data),
    enabled: !!clientId && !!liabilityId,
  });
}

// Uppdatera skuld (PATCH)
export function useUpdateLiability(clientId: number, liabilityId: number) {
  const qc = useQueryClient();
  return useMutation<LiabilityDTO, Error, Partial<Omit<LiabilityDTO, "id">>>({
    mutationFn: (upd) =>
      api
        .patch<LiabilityDTO>(
          `/api/clients/${clientId}/liabilities/${liabilityId}`,
          upd
        )
        .then((res) => res.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["liabilities", clientId] });
      qc.invalidateQueries({ queryKey: ["liability", clientId, liabilityId] });
    },
    onError: (err: any) => {
      alert(err.response?.data || "Fel vid uppdatering av skuld");
    },
  });
}

// Ta bort skuld (DELETE)
export function useDeleteLiability(clientId: number, liabilityId: number) {
  const qc = useQueryClient();
  return useMutation<void, Error>({
    mutationFn: () =>
      api
        .delete(`/api/clients/${clientId}/liabilities/${liabilityId}`)
        .then(() => {}),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["liabilities", clientId] });
    },
    onError: (err: any) => {
      alert(err.response?.data || "Fel vid radering av skuld");
    },
  });
}
