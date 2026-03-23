import React from "react"

export interface IRange2d {
    className?: string;
    wrapperClassName?: string;
    icon: React.ReactNode;
    onChange?: () => void;
    value?: number;
}

export function Range2d({ className = "", wrapperClassName = "", icon, onChange, value }: IRange2d) {

    return (
        <div className={`range2d ${wrapperClassName}`}>
            {icon && icon}
            <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={value}
                onChange={onChange}
                className={className}
            />
        </div>
    )
}