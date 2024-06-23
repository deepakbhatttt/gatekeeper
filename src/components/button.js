import React from "react";

export default function Button({
    children,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "",
    ...props
}) {
    return (
        <button className={`btn bg-dark text-white shadow-none text ${bgColor} ${textColor} ${className}`} {...props}>
            {children}
        </button>
    );
}
