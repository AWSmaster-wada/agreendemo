import React from 'react';

interface InputSectionProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

const InputSection: React.FC<InputSectionProps> = ({
  id,
  label,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <label htmlFor={id} className="text-green-800 font-medium">
          {label}
        </label>
        <span className="text-sm text-gray-500">
          {value.length} 文字
        </span>
      </div>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-32 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
      />
    </div>
  );
};

export default InputSection;