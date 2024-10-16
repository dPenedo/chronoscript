import { ChangeEvent } from "react";

interface InputProps {
    type: string;
    name: string;
    value: number | string;
    max?: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ type, name, value, max, placeholder, onChange }: InputProps) {
    return (
        <div className="input">
            <input
                type={type}
                name={name}
                max={max}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                autoFocus
    step="1"
                required
            />
        </div>
    );
}
