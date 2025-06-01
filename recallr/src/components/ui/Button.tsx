import type { ReactElement } from "react";
import clsx from "clsx";

interface ButtonProps {
    variant?: "primary" | "secondary";
    size?: "sm" | "md" | "lg";
    text: string;
    starticon?: ReactElement;
    endicon?: ReactElement;
    onClick?:() => void;
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
    onClick
   
}: ButtonProps) {
    const baseStyles = "inline-flex items-center justify-center font-normal rounded-lg transition-colors duration-200 cursor-pointer";

    const variantStyles = {
        primary: "bg-neutral-900 text-white hover:bg-neutral-800 border-[1px] border-neutral-900",
        secondary: "bg-primary border-[1px] border-neutral-300 text-black hover:bg-secondary"
    };

    const sizeStyles = {
        sm: "text-sm px-3 py-1.5",
        md: "text-md px-5 py-2",
        lg: "text-lg px-6 py-2.5"
    };

    const classes = clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size]
    );

    return (

    <button className = {`${classes} gap-2  `} onClick={onClick} >
        {starticon}{text}{endicon}
    </button>
    )
}

export default Button
