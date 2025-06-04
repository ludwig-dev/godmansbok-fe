// src/hooks/useClients.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/client";

// Typdefinitioner (svara mot ClientDTO i backend)
export interface ClientDTO {
  id: number;
  name: string;
  personalNumber?: string;
}

// Hämta alla klienter (GET /api/clients)
export function useClients() {
  return useQuery<ClientDTO[], Error>({
    queryKey: ["clients"],
    queryFn: () => api.get<ClientDTO[]>("/api/clients").then((res) => res.data),
  });
}

// Skapa klient (POST /api/clients)
export function useCreateClient() {
  const qc = useQueryClient();
  return useMutation<ClientDTO, Error, Omit<ClientDTO, "id">>({
    mutationFn: (newClient) =>
      api.post<ClientDTO>("/api/clients", newClient).then((res) => res.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["clients"] });
    },
    onError: (err: any) => {
      alert(err.response?.data || "Fel vid skapande av klient");
    },
  });
}

// Hämta en klient by id (GET /api/clients/:clientId)
export function useClient(clientId: number) {
  return useQuery<ClientDTO, Error>({
    queryKey: ["client", clientId],
    queryFn: () =>
      api.get<ClientDTO>(`/api/clients/${clientId}`).then((res) => res.data),
    enabled: !!clientId,
  });
}

// Uppdatera klient (PATCH /api/clients/:clientId)
export function useUpdateClient(clientId: number) {
  const qc = useQueryClient();
  return useMutation<ClientDTO, Error, Partial<Omit<ClientDTO, "id">>>({
    mutationFn: (upd) =>
      api
        .patch<ClientDTO>(`/api/clients/${clientId}`, upd)
        .then((res) => res.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["client", clientId] });
      qc.invalidateQueries({ queryKey: ["clients"] });
    },
    onError: (err: any) => {
      alert(err.response?.data || "Fel vid uppdatering av klient");
    },
  });
}

// Ta bort klient (DELETE /api/clients/:clientId)
export function useDeleteClient(clientId: number) {
  const qc = useQueryClient();
  return useMutation<void, Error>({
    mutationFn: () => api.delete(`/api/clients/${clientId}`).then(() => {}),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["clients"] });
    },
    onError: (err: any) => {
      alert(err.response?.data || "Fel vid borttagning av klient");
    },
  });
}
