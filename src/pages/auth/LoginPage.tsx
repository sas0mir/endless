import React, { useState } from "react";
import { useAuthStore } from "@/store/auth.store";
import CyberBackground from "@/components/login/CyberBackground.tsx";

export default function LoginPage() {
    const { login } = useAuthStore();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const user = {
            id: crypto.randomUUID(),
            email,
        };

        // save to localStorage (mock backend session)
        localStorage.setItem("mock_user", JSON.stringify(user));

        // save to zustand store
        login(user);

        // redirect to dashboard
        window.location.href = "/endless/dashboard";
    };

    return (
        <main
            style={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "black",
                color: "#00ff9c",
                position: "relative",
                overflow: "hidden"
            }}
        >
            <CyberBackground />
            <canvas
                id="cyber-bg"
                style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 0
                }}
            />

            <form
                onSubmit={handleSubmit}
                style={{
                    position: "relative",
                    zIndex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    padding: "32px",
                    border: "1px solid #00ff9c",
                    background: "rgba(0,0,0,0.7)",
                    minWidth: "280px"
                }}
            >
                <h2 style={{ marginBottom: "8px" }}>Endless Login</h2>

                <input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                        padding: "8px",
                        background: "black",
                        border: "1px solid #00ff9c",
                        color: "#00ff9c"
                    }}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                        padding: "8px",
                        background: "black",
                        border: "1px solid #00ff9c",
                        color: "#00ff9c"
                    }}
                />

                <button
                    type="submit"
                    style={{
                        padding: "10px",
                        background: "#001a12",
                        border: "1px solid #00ff9c",
                        color: "#00ff9c",
                        cursor: "pointer"
                    }}
                >
                    Login
                </button>
            </form>
        </main>
    );
}