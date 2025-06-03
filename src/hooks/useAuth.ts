import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/client";

type LoginInput = { email: string; password: string };
type RegisterRequest = { email: string; username: string; password: string; }

export function useLogin() {
    const qc = useQueryClient();
    return useMutation<void, Error, LoginInput>({
        mutationFn: (creds) =>
            api.post("/api/auth/login", creds).then(() => {
            }),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["userProfile"] });
        },
        onError: (err) => {
        },
    });
}

export function useLogout() {
    const qc = useQueryClient();

    return useMutation<void, Error, void>({
        mutationFn: () => api.post("/api/auth/logout").then(() => { }),
        onSuccess: () => {
            // Remove user profile cache
            qc.removeQueries({ queryKey: ["userProfile"] });
        },
    });
}

export function useRegister() {
    const qc = useQueryClient();
    return useMutation<void, Error, RegisterRequest>({
        mutationFn: (creds) =>
            api.post("/api/auth/register", creds).then(() => {
            }
            ),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["userProfile"] });
        }
        ,
        onError: (err) => {
        },
    });
}