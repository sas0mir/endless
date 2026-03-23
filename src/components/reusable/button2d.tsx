import React from "react"

export interface IButton2d {
    variant?: "default" | "link" | "icon";
    text?: string;
    className?: string;
    icon: React.ReactNode;
    onClick?: () => void;
}

export function Button2d({ variant = "default", text, className = "", icon, onClick }: IButton2d) {

    return (
        <button
            onClick={onClick}
            className={`button2d btn-${variant} ${className}`}
        >
            {icon && icon}
            {text}
        </button>
    )
}