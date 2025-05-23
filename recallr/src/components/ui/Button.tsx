import type { ReactElement } from "react";
import clsx from "clsx";

interface ButtonProps {
    variant?: "primary" | "secondary";
    size?: "sm" | "md" | "lg";
    text: string;
    starticon?: ReactElement;
    endicon?: ReactElement;
}
//const handleRequest = () => {
// onClick handler function
//}

function Button({
    //passing default props
    variant = "primary",
    size = "sm",
    text,
    starticon,
    endicon,
   
}: ButtonProps) {
    const baseStyles = "inline-flex items-center justify-center font-medium rounded-md transition-colors duration-200 ";

    const variantStyles = {
        primary: "bg-neutral-900 text-white hover:bg-neutral-800",
        secondary: "bg-gray-200 text-black hover:bg-gray-300"
    };

    const sizeStyles = {
        sm: "text-sm px-3 py-1.5",
        md: "text-base px-4 py-2",
        lg: "text-lg px-5 py-3"
    };

    const classes = clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size]
    );

    return (

    <button className = {`${classes} gap-1.5  `}>
        {starticon}{text}{endicon}
    </button>
    )
}

export default Button
