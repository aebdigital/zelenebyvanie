"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { navItems, siteConfig } from "../lib/site-data";

function isActive(pathname, href) {
  if (href === "/#cinnost") {
    return pathname === "/";
  }

  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isHome = pathname === "/";

  return (
    <header
      className={`sticky top-0 z-50 border-b border-[color:var(--line)] backdrop-blur-xl ${
        isHome ? "bg-[rgba(251,248,242,0.64)]" : "bg-[rgba(251,248,242,0.88)]"
      }`}
      style={isHome ? { marginBottom: "calc(var(--header-overlap) * -1)" } : undefined}
    >
      <div className="border-b border-[color:var(--line)]">
        <div className="shell flex flex-wrap items-center justify-between gap-3 py-2 text-xs text-[color:var(--muted)]">
          <p className="font-medium text-[color:var(--forest)]">Dajte zelenú vášmu bývaniu</p>
          <div className="flex flex-wrap items-center gap-4">
            <a href={`mailto:${siteConfig.email}`} className="hover:text-[color:var(--forest)]">
              {siteConfig.email}
            </a>
            <a href={siteConfig.phoneHref} className="hover:text-[color:var(--forest)]">
              {siteConfig.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      <div className="shell flex items-center justify-between gap-4 py-4">
        <Link href="/" className="shrink-0">
          <Image
            src="/site/brand/logo.png"
            alt={siteConfig.name}
            width={338}
            height={59}
            className="h-auto w-[182px] sm:w-[210px]"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-semibold ${
                isActive(pathname, item.href)
                  ? "text-[color:var(--forest)]"
                  : "text-[color:var(--ink)] hover:text-[color:var(--forest)]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link href="/kontakt" className="button-primary">
            Kontakt
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--line)] bg-white/70 text-[color:var(--forest)] lg:hidden"
          aria-expanded={open}
          aria-label="Otvoriť menu"
        >
          <span className="flex flex-col gap-1.5">
            <span className={`h-0.5 w-5 bg-current ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`h-0.5 w-5 bg-current ${open ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-5 bg-current ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      {open ? (
        <div className="border-t border-[color:var(--line)] bg-[color:var(--cream)] lg:hidden">
          <div className="shell flex flex-col gap-2 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-2xl px-4 py-3 text-sm font-semibold ${
                  isActive(pathname, item.href)
                    ? "bg-[color:var(--forest)] text-white"
                    : "bg-white/70 text-[color:var(--ink)]"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/kontakt"
              onClick={() => setOpen(false)}
              className="button-primary mt-2 w-full"
            >
              Napísať správu
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
