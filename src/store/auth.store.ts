import { create } from "zustand";

interface AuthState {
    user: null | { id: string; email: string };
    isAuthenticated: boolean;
    login: (user: any) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    login: (user) => set({ user, isAuthenticated: true }),
    logout: () => set({ user: null, isAuthenticated: false }),
}));