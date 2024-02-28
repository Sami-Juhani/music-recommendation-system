import React from "react";

export default function Link({ className, text, to }: { className?: string; text: string; to: string }) {
  return (
    <a
      href={to}
      className="outline-none underline underline-offset-1 focus:underline-offset-[7px] focus:decoration-[3px] hover:text-brand transition-all"
    >
      {text}
    </a>
  );
}
