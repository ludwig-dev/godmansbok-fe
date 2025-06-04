import { useQuery } from "@tanstack/react-query";
import api from "../api/client";

export interface FullSummary {
  startBalance: number; // A
  sumIncome: number; // B
  totalAB: number;
  sumExpenses: number; // C
  endBalance: number; // D
  totalCD: number;
  match: boolean;
  accountName: string;
  accountNumber?: string;
  accountId: number;
}

export function useSummary(clientId: number, year?: number) {
  return useQuery<FullSummary, Error>({
    queryKey: ["summary", clientId, year],
    queryFn: () =>
      api
        .get<FullSummary>(
          `/api/clients/${clientId}/summary${year ? `?year=${year}` : ""}`
        )
        .then((res) => res.data),
    enabled: !!clientId,
  });
}
