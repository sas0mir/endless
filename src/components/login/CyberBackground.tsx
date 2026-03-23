import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Stars } from "@react-three/drei"
import { PlayIcon, SquarePauseIcon } from "lucide-react";
import { Button2d } from "@/components/reusable";
import { useRef, useState, useEffect } from "react"
import * as THREE from "three"

function Cube() {
    const group = useRef<THREE.Group>(null!)

    useFrame((state, delta) => {
        const t = state.clock.elapsedTime

        // rotation
        group.current.rotation.x += delta * 0.25
        group.current.rotation.y += delta * 0.35

        // pulse scale
        const pulse = 1 + Math.sin(t * 2) * 0.05
        group.current.scale.set(pulse, pulse, pulse)
    })

    return (
        <group ref={group}>
            {/* main cube */}
            <mesh>
                <boxGeometry args={[3, 3, 3]} />
                <meshBasicMaterial
                    color="#00ff9c"
                    wireframe
                    transparent
                    opacity={0.9}
                />
            </mesh>

            {/* glow cube */}
            <mesh scale={1.03}>
                <boxGeometry args={[3, 3, 3]} />
                <meshBasicMaterial
                    color="#00ff9c"
                    wireframe
                    transparent
                    opacity={0.25}
                />
            </mesh>
        </group>
    )
}

function CameraDrift() {
    const { camera } = useThree()

    useFrame((state) => {
        const t = state.clock.elapsedTime

        // camera.position.x = Math.sin(t * 0.3) * 0.5
        // camera.position.y = Math.cos(t * 0.25) * 0.3
        camera.position.set(
            Math.sin(t * 0.3) * 0.5,
            Math.cos(t * 0.25) * 0.3,
            camera.position.z
        )
        camera.lookAt(0, 0, 0)
    })

    return null
}


export default function CyberBackground() {
    const audioRef = useRef<HTMLAudioElement | null>(null)

    const [volume, setVolume] = useState(0.2)

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume
        }
    }, [volume])

    const toggleAudio = () => {
        if (!audioRef.current) return

        if (audioRef.current.paused) {
            audioRef.current.play()
        } else {
            audioRef.current.pause()
        }
    }

    return (
        <>
            <Canvas
                camera={{ position: [0, 0, 10] }}
                style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 0
                }}
            >
                <color attach="background" args={["black"]} />
                <Stars
                    radius={100}
                    depth={50}
                    count={2000}
                    factor={4}
                    saturation={0}
                    fade
                    speed={0.5}
                />
                <CameraDrift />
                <Cube />
            </Canvas>
            <audio
                ref={audioRef}
                src="/endless/audio/background.mp3"
                loop
                autoPlay
            />
            <div
                style={{
                    position: "absolute",
                    bottom: "20px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    gap: "12px",
                    alignItems: "center",
                    zIndex: 2
                }}
            >
                <Button2d text="toggle music" onClick={toggleAudio} icon={<PlayIcon />} />

                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    style={{
                        cursor: "pointer"
                    }}
                />
            </div>
        </>
    )
}