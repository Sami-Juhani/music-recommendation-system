import React from "react";

type FormInputProps = {
  id: string;
  name: string;
  dataTestId?: string;
  type: string;
  placeholder: string;
  formData: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function FormInput({ id, name, dataTestId, type, placeholder, formData, handleChange }: FormInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-extrabold">
        {placeholder}
      </label>
      <input
        type={type}
        name={name}
        data-testid={dataTestId}
        id={id}
        placeholder={placeholder}
        value={formData}
        onChange={handleChange}
        className="p-3 rounded-[5px] border-[1px] outline-none focus:outline-offset-0 focus:outline-2 focus:outline-white bg-zinc-900 border-zinc-400 hover:border-white placeholder:text-sm placeholder:font-bold transition-all"
      />
    </div>
  );
}
