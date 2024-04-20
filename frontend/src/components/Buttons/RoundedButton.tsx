import React from "react";
import FlatButton from "./FlatButton";

export default function RoundedButton({ type, className, href, children, testid }: { type?: "submit" | "button"; testid?: string, className?: string; href?: string; children: React.ReactNode }) {
  return (
    <FlatButton type={type} href={href} testid={testid} className={`rounded-3xl ${className}`}>
      {children}
    </FlatButton>
  );
}
