import React from "react";

export default function FormInput({ id, name, type, placeholder, formData, handleChange }: { id: string; name: string; type: string; placeholder: string; formData: string; handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void}) {

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-extrabold">
        {placeholder}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        value={formData}
        onChange={handleChange}
        className="p-3 rounded-[5px] border-[1px] outline-none focus:outline-offset-0 focus:outline-2 focus:outline-white bg-zinc-900 border-zinc-400 hover:border-white placeholder:text-sm placeholder:font-bold transition-all"
      />
    </div>
  );
}
