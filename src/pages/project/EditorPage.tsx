"use client"

import { Canvas } from "@react-three/fiber"
import { ControlPanel } from "@/components/reusable";
import { OrbitControls, TransformControls, Grid } from "@react-three/drei"

// type SceneObject = {
//     id: string
//     type: "box" | "sphere"
//     position: [number, number, number]
// }

export default function EditorPage() {
    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            <Canvas camera={{ position: [5, 5, 5], fov: 60 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} />

                <Grid
                    args={[20, 20]}
                    cellSize={1}
                    cellThickness={0.5}
                    sectionSize={5}
                    sectionThickness={1}
                    fadeDistance={30}
                    fadeStrength={1}
                />

                <mesh rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[20, 20]} />
                    <meshStandardMaterial color="#222" />
                </mesh>
                <mesh position={[0, 0.5, 0]}>
                    <boxGeometry />
                    <meshStandardMaterial color="orange" />
                </mesh>
                <TransformControls />
                <OrbitControls />
            </Canvas>
            <ControlPanel />
            <div style={{
                position: "absolute",
                bottom: 0,
                left: "50%",
                display: "flex",
                width: "200px",
                height: "100px",
                backgroundColor: "white",
                justifyContent: "center"
            }}>test</div>
        </div>
    )
}