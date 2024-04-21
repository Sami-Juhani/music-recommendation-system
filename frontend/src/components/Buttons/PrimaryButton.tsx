import MainButton from "./MainButton";
import React from "react";

export default function PrimaryButton({ type, href, className, children, testid }: { type?: "submit" | "button"; testid?: string, href?: string; className?: string; children: React.ReactNode }) {
  return (
    <MainButton
      type={type}
      href={href}
      testid={testid}
      className={`py-3 bg-brand ${className}`}
    >
      {children}
    </MainButton>
  );
}
