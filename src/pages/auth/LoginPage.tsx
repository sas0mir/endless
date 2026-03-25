import React, { useState } from "react";
import { useAuthStore } from "@/store/auth.store";
import CyberBackground from "@/components/login/CyberBackground.tsx";
import { InputText, Button2d } from "@/components/reusable";
import styles from "./styles.module.scss";

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
        <main className={styles.container}>
            <CyberBackground />

            <form
                onSubmit={handleSubmit}
                className={styles.form}
            >
                <h2 className="font-dialog-header font-color-elementary">Welcome to ENDLESS</h2>
                <InputText placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <InputText placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button2d text="Login" type="submit" />
            </form>
        </main>
    );
}