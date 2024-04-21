import RoundedButton from "./RoundedButton";
import React from "react";

export default function MainButton({ type, href, className, children, testid }: { type?: "submit" | "button"; testid?: string, href?: string; className?: string; children: React.ReactNode }) {
  return (
    <RoundedButton
      type={type}
      href={href}
      testid={testid}
      className={`text-black justify-center font-bold hover:scale-105 ${className}`}
    >
      {children}
    </RoundedButton>
  );
}
