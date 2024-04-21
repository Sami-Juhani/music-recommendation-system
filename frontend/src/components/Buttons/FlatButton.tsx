import { Link } from "react-router-dom";
import React from "react";

export default function FlatButton({ type, className, href = "", children, testid }: { type?: "submit" | "button"; testid?: string, className?: string; href?: string; children: React.ReactNode }) {
  const btnClass = `focus:outline-[3px] focus:outline-white whitespace-nowrap ${className}`;

  return href === "" ? (
    <button type={type} className={btnClass} data-testid={testid}>
      {children}
    </button>
  ) : (
    <Link to={href} className={btnClass}>
      {children}
    </Link>
  );
}
