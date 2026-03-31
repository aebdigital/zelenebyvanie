import Link from "next/link";

import { navItems, siteConfig } from "../lib/site-data";

export function SiteFooter() {
  return (
    <footer className="footer-scene mt-20 text-white">
      <div className="relative z-10 shell grid gap-10 py-14 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div data-reveal style={{ "--reveal-delay": "0ms" }} className="space-y-4">
          <p className="eyebrow border-white/15 bg-white/5 text-white">ZelenéBývanie</p>
          <h2 className="max-w-md text-3xl">Staviame, modernizujeme a hľadáme riešenia pre vaše bývanie.</h2>
          <p className="max-w-lg text-sm text-white/72">
            Výstavba, rekonštrukcie, zelená energia, prenájom techniky a pomoc s
            nehnuteľnosťami v jednom tíme.
          </p>
        </div>

        <div data-reveal style={{ "--reveal-delay": "120ms" }} className="space-y-4">
          <h3 className="text-xl">Navigácia</h3>
          <div className="flex flex-col gap-3 text-sm text-white/80">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div data-reveal style={{ "--reveal-delay": "220ms" }} className="space-y-4">
          <h3 className="text-xl">Kontakt</h3>
          <div className="space-y-2 text-sm text-white/80">
            {siteConfig.address.map((line) => (
              <p key={line}>{line}</p>
            ))}
            <a href={`mailto:${siteConfig.email}`} className="block hover:text-white">
              {siteConfig.email}
            </a>
            <a href={siteConfig.phoneHref} className="block hover:text-white">
              {siteConfig.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-white/10">
        <div className="shell flex flex-col gap-3 py-5 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright © 2026 {siteConfig.legalName}. Všetky práva vyhradené.</p>
          <p>
            Tvorba stránky –
            {" "}
            <a href="https://aebdigital.sk" className="hover:text-white">
              AEB Digital
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
