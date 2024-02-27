import React from "react";
import FlatButton from "./FlatButton";

export default function RoundedButton({ type, className, href, children }: { type?: "submit" | "button"; className?: string; href?: string; children: React.ReactNode }) {
  return (
    <FlatButton type={type} href={href} className={`rounded-3xl ${className}`}>
      {children}
    </FlatButton>
  );
}
