import MainButton from "./MainButton";
import React from "react";

export default function PrimaryButton({ type, href, className, children }: { type?: "submit" | "button"; href?: string; className?: string; children: React.ReactNode }) {
  return (
    <MainButton
      type={type}
      href={href}
      className={`py-3 bg-brand ${className}`}
    >
      {children}
    </MainButton>
  );
}
