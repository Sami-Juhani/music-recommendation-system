import { Link } from "react-router-dom";
import React from "react";

type ButtonProps = {
  type?: "submit" | "button";
  className?: string;
  href?: string;
  children: React.ReactNode;
  customStyle?: "flat" | "rounded" | "main" | "primary";
  dataTestId?: string;
};
let btnClass: string;

export function CustomButton({ type, className, href = "", children, customStyle, dataTestId }: ButtonProps) {
  if (customStyle === "flat") btnClass = `focus:outline-[3px] focus:outline-white whitespace-nowrap ${className}`;
  if (customStyle === "rounded") btnClass = `rounded-3xl ${className}`;
  if (customStyle === "main") btnClass = `text-black justify-center font-bold hover:scale-105 ${className}`;
  if (customStyle === "primary") btnClass = `py-3 bg-brand rounded-3xl text-black justify-center font-bold hover:scale-105 ${className}`;

  return href === "" ? (
    <button data-testid={dataTestId} type={type} className={btnClass}>
      {children}
    </button>
  ) : (
    <Link to={href} className={btnClass}>
      {children}
    </Link>
  );
}
