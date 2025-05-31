
interface InputProps {
    label?: string;
    type?: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    required?: boolean;
    name?: string;
    className?: string;
}

export const Input = (
    {
        label,
        type = "text",
        placeholder = "",
        value,
        onChange,
        disabled = false,
        required = false,
        name,
        className = ""
    } : InputProps
) => {
    return (
        <div className="flex flex-col gap-1 w-full">
            {label && <label className="text-sm font-medium tracking-tight">{label}</label>}
            <input
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
                required={required}
                className={`border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-800 ${className}`}
            />
        </div>
    )
}