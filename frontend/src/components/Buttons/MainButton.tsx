import RoundedButton from "./RoundedButton";
import React from "react";

export default function MainButton({ type, href, className, children }: { type?: "submit" | "button"; href?: string; className?: string; children: React.ReactNode }) {
  return (
    <RoundedButton
      type={type}
      href={href}
      className={`text-black justify-center font-bold hover:scale-105 ${className}`}
    >
      {children}
    </RoundedButton>
  );
}
