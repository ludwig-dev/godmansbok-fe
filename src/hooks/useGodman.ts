import { useQuery } from "@tanstack/react-query";
import api from "../api/client";

export type GodmanDTO = {
    id: string;
    email: string;
    username: string;
    role: string;
};

export function useGodmanProfile() {
    return useQuery<GodmanDTO, Error>({
        queryKey: ["userProfile"],
        queryFn: () => api.get<GodmanDTO>("/api/godman/me").then((res) => res.data),
        retry: false,
    });
}
