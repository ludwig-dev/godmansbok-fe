// src/hooks/useAccounts.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/client";

export type AccountDTO = {
  id: number;
  accountName: string;
  accountNumber: string | null;
  startBalance: number | null;
  endBalance: number | null;
};

// Hämta alla konton för en klient (GET /api/clients/:clientId/accounts)
export function useAccounts(clientId: number) {
  return useQuery<AccountDTO[], Error>({
    queryKey: ["accounts", clientId],
    queryFn: () =>
      api
        .get<AccountDTO[]>(`/api/clients/${clientId}/accounts`)
        .then((res) => res.data),
    enabled: !!clientId,
  });
}

// Skapa konto (POST /api/clients/:clientId/accounts)
export function useCreateAccount(clientId: number) {
  const qc = useQueryClient();
  return useMutation<AccountDTO, Error, Omit<AccountDTO, "id">>({
    mutationFn: (newAccount) =>
      api
        .post<AccountDTO>(`/api/clients/${clientId}/accounts`, newAccount)
        .then((res) => res.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["accounts", clientId] });
    },
    onError: (err: any) => {
      alert(err.response?.data || "Fel vid skapande av konto");
    },
  });
}

// Hämta ett konto (GET /api/clients/:clientId/accounts/:accountId)
export function useAccount(clientId: number, accountId: number) {
  return useQuery<AccountDTO, Error>({
    queryKey: ["account", clientId, accountId],
    queryFn: () =>
      api
        .get<AccountDTO>(`/api/clients/${clientId}/accounts/${accountId}`)
        .then((res) => res.data),
    enabled: !!clientId && !!accountId,
  });
}

// Uppdatera konto (PATCH /api/clients/:clientId/accounts/:accountId)
export function useUpdateAccount(clientId: number, accountId: number) {
  const qc = useQueryClient();
  return useMutation<AccountDTO, Error, Partial<Omit<AccountDTO, "id">>>({
    mutationFn: (upd) =>
      api
        .patch<AccountDTO>(
          `/api/clients/${clientId}/accounts/${accountId}`,
          upd
        )
        .then((res) => res.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["accounts", clientId] });
      qc.invalidateQueries({ queryKey: ["account", clientId, accountId] });
    },
    onError: (err: any) => {
      alert(err.response?.data || "Fel vid uppdatering av konto");
    },
  });
}

// Ta bort konto (DELETE /api/clients/:clientId/accounts/:accountId)
export function useDeleteAccount(clientId: number, accountId: number) {
  const qc = useQueryClient();
  return useMutation<void, Error>({
    mutationFn: () =>
      api
        .delete(`/api/clients/${clientId}/accounts/${accountId}`)
        .then(() => {}),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["accounts", clientId] });
    },
    onError: (err: any) => {
      alert(err.response?.data || "Fel vid borttagning av konto");
    },
  });
}
