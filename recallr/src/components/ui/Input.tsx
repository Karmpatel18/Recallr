
interface InputProps {
    label?: string;
    type?: string;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    name?: string;
    className?: string;
    ref: React.Ref<HTMLInputElement>
}

export const Input = (
    {
        label,
        type = "text",
        placeholder = "",
        disabled = false,
        required = false,
        name,
        className = "",
        ref
    } : InputProps
) => {
    return (
        <div className="flex flex-col gap-1 w-full">
            {label && <label className="text-sm font-medium tracking-tight">{label}</label>}
            <input
                ref={ref}
                name={name}
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                required={required}
                className={`border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-800 ${className}`}
            />
        </div>
    )
}