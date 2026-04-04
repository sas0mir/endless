import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

export type LabelPosition = "top" | "left";

export interface IControlPanelProps {
    userId?: string;
}

export function ControlPanel({ userId }: IControlPanelProps) {

    //todo const { avatar_url } = api.user.getById(userId);
    const navigate = useNavigate();
    const controls = [
        { label: "constructor", onclick: () => navigate('/project/0')},
        { label: "game mode", onclick: () => navigate('/play/0')},
        { label: "settings", onclick: () => navigate('/settings')},
        { label: "logout", onclick: () => navigate('/login')}
    ]
    return (
        <div className={styles.container}>
            <img className={styles.avatar} src={"https://i.pravatar.cc/300"} alt="user avatar" />
            {controls.map((control, i) => (
                <button
                    key={control.label}
                    className={styles.control_item}
                    style={{ ["--i" as any]: i } as React.CSSProperties}
                    onClick={control.onclick}
                >
                    {control.label}
                </button>
            ))}
        </div>
    );
}