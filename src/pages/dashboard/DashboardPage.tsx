// import React from "react";
import {ControlPanel} from "@/components/reusable/control_panel/control-panel.tsx";
import styles from "./styles.module.scss";

export default function DashboardPage() {
    return (
        <main className={styles.main}>
            <ControlPanel userId={"test"} />
            <div className={styles.container}>
                <header className={styles.header}>
                    <h2 className="font-dialog-header font-color-elementary">Usernames' dashboard</h2>
                </header>
            </div>
        </main>
    )
}