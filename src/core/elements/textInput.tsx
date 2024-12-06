import React, { useState, FocusEvent } from "react";
import { Input } from "./input";
// import { Input } from "@/components/ui/input";

interface TextInputProps {
    label: string;
    name: string;
    type?: string;
    value: string;
    placeholder?: string;
    error?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<TextInputProps> = ({
    label,
    name,
    type = 'text',
    value,
    placeholder,
    error,
    onChange,
}) => {
    const [isFocused, setIsFocused] = useState(false)
    const handleFocus = (_: FocusEvent<HTMLInputElement>) => setIsFocused(true);
    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
        if (e.target.value === '') setIsFocused(false);
    }
    return (
        <div className="relative mb-4">
            <label
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 transition-all duration-200 ${isFocused || value ? 'text-xs top-1.5 left-2' : 'text-sm'
                    }`}>{label}
                    </label>
                    <Input
                    label=""
                    type={type}
                    name={name}
                    value={value}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={onChange}
                    placeholder={!isFocused && !value?placeholder:''}
                    className={`w-full p-3 border rounded focus:outline-none focus:ring-2 ${error?'border-red-500':'border-gray-300 focus:ring-[#00A9E0]'}`}
                    />
                    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    )
}

export default TextInput


