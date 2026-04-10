import React, {type ReactNode, useState} from "react"
import {
    useFloating,
    offset,
    flip,
    shift,
    useHover,
    useFocus,
    useDismiss,
    useRole,
    useInteractions
} from "@floating-ui/react";

export interface IButton2d {
    variant?: "default" | "link" | "icon";
    type?: "submit" | "button";
    text?: string;
    className?: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    tooltip?: string;
}

export function Button2d({ variant = "default", type = "button", text, className = "", icon, onClick, tooltip }: IButton2d) {

    const [showTooltip, setShowTooltip] = useState(false);

    const { refs, floatingStyles, context } = useFloating({
        placement: "top",
        open: showTooltip,
        onOpenChange: setShowTooltip,
        middleware: [
            offset(8),
            flip(),
            shift()
        ]
    });

    const hover = useHover(context);
    const focus = useFocus(context);
    const dismiss = useDismiss(context);
    const role = useRole(context);

    const { getReferenceProps, getFloatingProps } = useInteractions([
        hover,
        focus,
        dismiss,
        role
    ]);

    return (
        <>
            <button
                ref={refs.setReference}
                type={type}
                {...getReferenceProps()}
                onClick={onClick}
                className={`button2d btn-${variant} ${className}`}
            >
                {icon && icon}
                {text}
            </button>
            {tooltip && showTooltip && (
                <div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()} className="tooltip2d">{tooltip}</div>
            )}
        </>
    )
}