"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { motion } from "framer-motion";

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
      <div className="border-b border-[color:var(--line)] bg-[color:var(--forest)]">
        <div className="shell flex flex-wrap items-center justify-between gap-3 py-3 text-sm text-white">
          <div className="relative inline-flex flex-col">
            <motion.p
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ delay: 1.5, duration: 0.8, ease: "easeInOut" }}
              className="text-base font-bold uppercase tracking-wider text-white sm:text-lg"
            >
              Dajte zelenú vášmu bývaniu
            </motion.p>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 2.3, duration: 0.6, ease: "easeOut" }}
              className="mt-1 h-0.5 w-full bg-white"
              style={{ originX: 0 }}
            />
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <a href={`mailto:${siteConfig.email}`} className="font-semibold hover:text-white/80">
              {siteConfig.email}
            </a>
            <a href={siteConfig.phoneHref} className="font-semibold hover:text-white/80">
              {siteConfig.phoneDisplay}
            </a>
            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/Zelen%C3%A9-B%C3%BDvanie-108373237495000/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:text-white/80"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/zelene_byvanie/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-white/80"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
            </div>
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
              className={`group relative text-sm font-semibold ${
                isActive(pathname, item.href)
                  ? "text-[color:var(--forest)]"
                  : "text-[color:var(--ink)] hover:text-[color:var(--forest)]"
              }`}
            >
              {item.label}
              <span
                className={`absolute -bottom-1 left-0 h-0.5 w-full origin-left bg-[color:var(--forest)] transition-transform duration-300 ease-out group-hover:scale-x-100 ${
                  isActive(pathname, item.href) ? "scale-x-100" : "scale-x-0"
                }`}
              />
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
