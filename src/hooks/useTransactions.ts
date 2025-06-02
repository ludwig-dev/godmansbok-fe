// src/hooks/useTransactions.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/client";

export interface TransactionDTO {
  id: number;
  date: string; // ISO‐string, ex. "2023-05-01"
  amount: number;
  type: "INKOMST" | "UTGIFT";
  description?: string;
  attachmentNumber?: string;
}

// Hämta alla transaktioner på ett konto
export function useTransactions(clientId: number, accountId: number) {
  return useQuery<TransactionDTO[], Error>({
    queryKey: ["transactions", clientId, accountId],
    queryFn: () =>
      api
        .get<
          TransactionDTO[]
        >(`/api/clients/${clientId}/accounts/${accountId}/transactions`)
        .then((res) => res.data),
    enabled: !!clientId && !!accountId,
  });
}

// Skapa transaktion (POST)
export function useCreateTransaction(clientId: number, accountId: number) {
  const qc = useQueryClient();
  return useMutation<TransactionDTO, Error, Omit<TransactionDTO, "id">>({
    mutationFn: (newTx) =>
      api
        .post<TransactionDTO>(
          `/api/clients/${clientId}/accounts/${accountId}/transactions`,
          newTx
        )
        .then((res) => res.data),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["transactions", clientId, accountId],
      });
    },
    onError: (err: any) => {
      alert(err.response?.data || "Fel vid skapande av transaktion");
    },
  });
}

// Hämta enskild transaktion
export function useTransaction(
  clientId: number,
  accountId: number,
  txId: number
) {
  return useQuery<TransactionDTO, Error>({
    queryKey: ["transaction", clientId, accountId, txId],
    queryFn: () =>
      api
        .get<TransactionDTO>(
          `/api/clients/${clientId}/accounts/${accountId}/transactions/${txId}`
        )
        .then((res) => res.data),
    enabled: !!clientId && !!accountId && !!txId,
  });
}

// Uppdatera transaktion (PATCH)
export function useUpdateTransaction(
  clientId: number,
  accountId: number,
  txId: number
) {
  const qc = useQueryClient();
  return useMutation<
    TransactionDTO,
    Error,
    Partial<Omit<TransactionDTO, "id">>
  >({
    mutationFn: (upd) =>
      api
        .patch<TransactionDTO>(
          `/api/clients/${clientId}/accounts/${accountId}/transactions/${txId}`,
          upd
        )
        .then((res) => res.data),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["transactions", clientId, accountId],
      });
      qc.invalidateQueries({
        queryKey: ["transaction", clientId, accountId, txId],
      });
    },
    onError: (err: any) => {
      alert(err.response?.data || "Fel vid uppdatering av transaktion");
    },
  });
}

// Ta bort transaktion (DELETE)
export function useDeleteTransaction(
  clientId: number,
  accountId: number,
  txId: number
) {
  const qc = useQueryClient();
  return useMutation<void, Error>({
    mutationFn: () =>
      api
        .delete(
          `/api/clients/${clientId}/accounts/${accountId}/transactions/${txId}`
        )
        .then(() => {}),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["transactions", clientId, accountId],
      });
    },
    onError: (err: any) => {
      alert(err.response?.data || "Fel vid borttagning av transaktion");
    },
  });
}
