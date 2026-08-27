"use client";

import Image from "next/image";

export function DeveloperCredits() {
  return (
    <section className="w-full bg-[var(--bg-secondary)]">
      <a
        href="https://www.dromornarh.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center text-center py-8 md:py-10 px-4 group"
      >
        <div className="mb-3 transition-opacity duration-300 group-hover:opacity-80">
          <Image
            src="/assets/images/dhronetechlogo.jpg"
            alt="DhroneTech Solutions"
            width={120}
            height={36}
            className="h-9 w-auto object-contain rounded-sm"
            priority={false}
          />
        </div>
        <p className="text-xs font-body tracking-wide uppercase text-[var(--text-muted)] transition-colors duration-300 group-hover:text-[var(--text-gold)]">
          Developed by Dromor Narh for DhroneTech Solutions
        </p>
      </a>
    </section>
  );
}
