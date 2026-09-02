"use client";

import Link from "next/link";

export function DeveloperCredits() {
  return (
    <Link
      href="https://www.dromornarh.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="mt-8 md:mt-10 flex flex-col items-center justify-center text-center"
    >
      <img
        src="/assets/images/dhronetechlogo.jpg"
        alt="DhroneTech Solutions"
        className="h-8 sm:h-10 w-auto object-contain"
        loading="lazy"
      />
      <span className="mt-2 text-xs font-body tracking-wide text-[var(--text-muted)] transition-colors duration-200 hover:text-[var(--brand-gold)]">
        Developed by Dromor Narh for DhroneTech Solutions
      </span>
    </Link>
  );
}
