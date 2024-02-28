import { Link } from "react-router-dom";
import React from "react";

export default function FlatButton({ type, className, href = "", children }: { type?: "submit" | "button"; className?: string; href?: string; children: React.ReactNode }) {
  const btnClass = `focus:outline-[3px] focus:outline-white whitespace-nowrap ${className}`;

  return href === "" ? (
    <button type={type} className={btnClass}>
      {children}
    </button>
  ) : (
    <Link to={href} className={btnClass}>
      {children}
    </Link>
  );
}
