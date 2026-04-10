import { create } from "zustand";

type SceneObject = {
    id: string
    type: "box" | "sphere"
    position: [number, number, number]
}

interface AuthState {
    sceneObject: null | SceneObject;
    addSceneObject: (sObj: SceneObject) => void;
}

export const useSceneStore = create<AuthState>((set) => ({
    sceneObject: null,
    addSceneObject: (sObj: SceneObject) => set({ sceneObject: sObj })
}));