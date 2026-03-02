import { create } from "zustand";

interface UIState {
    smth: any;
    setSmth: (smth: any) => void;
}

export const useUIStore = create<UIState>((set) => ({
    smth: null,
    setSmth: (smth: any) => set( smth, true ),
}));