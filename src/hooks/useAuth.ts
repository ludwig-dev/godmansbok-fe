import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/client";

type LoginInput = { email: string; password: string };

export function useLogin() {
    const qc = useQueryClient();
    return useMutation<void, Error, LoginInput>({
        mutationFn: (creds) =>
            api.post("/api/auth/login", creds).then(() => {
            }),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["userProfile"] });
            alert("loggade in")
        },
        onError: (err) => {
            alert(err.response.data)
        },
    });
}

export function useLogout() {
    // const qc = useQueryClient();

    return useMutation<void, Error, void>({
        mutationFn: () => api.post("/api/auth/logout").then(() => { }),
        onSuccess: () => {
            // Remove user profile cache
            // qc.removeQueries({ queryKey: ["userProfile"] });
            // // Remove recipes list & any recipe detail caches
            // qc.removeQueries({ queryKey: ["recipes"] });
            // qc.removeQueries({ queryKey: ["recipe"] });
            // // Remove any in-flight or cached food searches
            // qc.removeQueries({ queryKey: ["foodSearch"] });
        },
    });
}