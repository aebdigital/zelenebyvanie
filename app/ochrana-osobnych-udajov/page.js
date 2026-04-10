import Link from "next/link";

import { createMetadata, siteConfig } from "../../lib/site-data";

export const metadata = createMetadata({
  title: "Ochrana osobných údajov",
  description: "Zásady ochrany osobných údajov spoločnosti ZelenéBývanie s. r. o.",
  path: "/ochrana-osobnych-udajov"
});

export default function PrivacyPage() {
  return (
    <div className="shell space-y-8 py-10">
      <div className="panel p-6 sm:p-8 lg:p-12">
        <p className="eyebrow">Právne informácie</p>
        <h1 className="mt-4 text-5xl sm:text-6xl">Ochrana osobných údajov</h1>

        <div className="mt-8 border border-[color:var(--line)] bg-white/80 p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">Prevádzkovateľ</p>
          <div className="mt-3 space-y-1 text-sm leading-7 text-[color:var(--ink)]">
            <p className="font-semibold">{siteConfig.legalName}</p>
            <p>IČO: <span className="text-[color:var(--muted)]">[doplniť IČO]</span></p>
            <p>Konateľ: <span className="text-[color:var(--muted)]">[doplniť meno konateľa]</span></p>
            <p>
              E-mail:{" "}
              <a href={`mailto:${siteConfig.email}`} className="text-[color:var(--forest)] hover:underline">
                {siteConfig.email}
              </a>
            </p>
            <p>
              Tel.:{" "}
              <a href={siteConfig.phoneHref} className="text-[color:var(--forest)] hover:underline">
                {siteConfig.phoneDisplay}
              </a>
            </p>
          </div>
        </div>

        <p className="mt-8 leading-8 text-[color:var(--muted)]">
          Tieto Zásady ochrany osobných údajov (ďalej len „Zásady") popisujú, aké osobné údaje spracúvame
          v súvislosti s používaním našej webovej stránky a kontaktných formulárov.
        </p>
      </div>

      <div className="panel p-6 sm:p-8 lg:p-12">
        <h2 className="text-3xl font-bold text-[color:var(--forest)]">I. Kontaktný formulár</h2>
        <p className="mt-4 leading-8 text-[color:var(--muted)]">
          Na stránke <strong>www.zelenebyvanie.sk</strong> prevádzkujeme kontaktný formulár, ktorého
          účelom je umožniť vám:
        </p>
        <ul className="mt-4 space-y-2">
          {[
            "Položiť otázku k našim produktom a službám",
            "Požiadať o cenovú ponuku alebo konzultáciu"
          ].map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-7 text-[color:var(--ink)]">
              <span className="mt-2 h-2 w-2 shrink-0 bg-[color:var(--forest)]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 space-y-5">
          <div>
            <p className="font-semibold text-[color:var(--ink)]">Rozsah spracúvaných údajov:</p>
            <ul className="mt-2 space-y-2">
              {["Meno a priezvisko", "E-mailová adresa", "Telefónne číslo"].map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-7 text-[color:var(--muted)]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-[color:var(--gold)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-semibold text-[color:var(--ink)]">Účel spracovania:</p>
            <p className="mt-1 text-sm leading-7 text-[color:var(--muted)]">
              Spracúvame uvedené údaje, aby sme vás mohli kontaktovať a reagovať na váš dopyt.
            </p>
          </div>

          <div>
            <p className="font-semibold text-[color:var(--ink)]">Právny základ:</p>
            <p className="mt-1 text-sm leading-7 text-[color:var(--muted)]">
              Článok 6 ods. 1 písm. b) GDPR – plnenie opatrení pred uzavretím zmluvy na žiadosť dotknutej osoby.
            </p>
          </div>

          <div>
            <p className="font-semibold text-[color:var(--ink)]">Doba uchovávania:</p>
            <p className="mt-1 text-sm leading-7 text-[color:var(--muted)]">
              Osobné údaje budeme uchovávať maximálne 10 rokov od odozvy na váš dopyt, pokiaľ nevznikne ďalší zmluvný vzťah.
            </p>
          </div>
        </div>
      </div>

      <div className="panel p-6 sm:p-8 lg:p-12">
        <h2 className="text-3xl font-bold text-[color:var(--forest)]">II. Súbory cookies</h2>
        <p className="mt-4 leading-8 text-[color:var(--muted)]">
          Na našej webovej stránke používame cookies výlučne na nasledujúce účely:
        </p>
        <ul className="mt-4 space-y-3">
          {[
            { title: "Nevyhnutné cookies", desc: "zabezpečujú základnú funkčnosť stránky (napr. ukladanie relácie, nastavení prehliadača)." },
            { title: "Štatistické (analytické) cookies", desc: "pomáhajú nám pochopiť, ako návštevníci stránku používajú (nasadzujeme ich len so súhlasom používateľa)." },
            { title: "Marketingové cookies", desc: "používajú sa na zobrazovanie relevantných reklám a sledovanie výkonnosti kampaní (len so súhlasom)." }
          ].map((item) => (
            <li key={item.title} className="flex gap-3 text-sm leading-7 text-[color:var(--ink)]">
              <span className="mt-2 h-2 w-2 shrink-0 bg-[color:var(--forest)]" />
              <span><strong>{item.title}</strong> – {item.desc}</span>
            </li>
          ))}
        </ul>
        <div className="mt-5">
          <p className="font-semibold text-[color:var(--ink)]">Správa súhlasov:</p>
          <p className="mt-1 text-sm leading-7 text-[color:var(--muted)]">
            Používateľ môže kedykoľvek odvolať súhlas s využívaním cookies prostredníctvom nastavení
            cookie lišty alebo priamo v prehliadači.
          </p>
        </div>
      </div>

      <div className="panel p-6 sm:p-8 lg:p-12">
        <h2 className="text-3xl font-bold text-[color:var(--forest)]">III. Práva dotknutej osoby</h2>
        <p className="mt-4 leading-8 text-[color:var(--muted)]">
          Podľa nariadenia GDPR máte nasledujúce práva:
        </p>
        <ul className="mt-4 space-y-3">
          {[
            "Prístup k osobným údajom, ktoré spracúvame",
            "Oprava nepresných alebo neúplných údajov",
            "Vymazanie („právo zabudnutia"), ak na spracovanie už nie je právny základ",
            "Obmedzenie spracovania",
            "Prenosnosť údajov",
            "Odvolanie súhlasu – stane sa účinným dňom odvolania",
            "Podanie sťažnosti u Úradu na ochranu osobných údajov SR (Hraničná 12, 820 07 Bratislava, www.dataprotection.gov.sk)"
          ].map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-7 text-[color:var(--ink)]">
              <span className="mt-2 h-2 w-2 shrink-0 bg-[color:var(--forest)]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 border border-[color:var(--line)] bg-white/80 p-5">
          <p className="text-sm leading-7 text-[color:var(--muted)]">
            V prípade otázok alebo uplatnenia Vašich práv nás môžete kontaktovať na{" "}
            <a href={`mailto:${siteConfig.email}`} className="font-semibold text-[color:var(--forest)] hover:underline">
              {siteConfig.email}
            </a>{" "}
            alebo na telefónnom čísle{" "}
            <a href={siteConfig.phoneHref} className="font-semibold text-[color:var(--forest)] hover:underline">
              {siteConfig.phoneDisplay}
            </a>.
          </p>
        </div>
      </div>

      <div className="panel p-6 sm:p-8 lg:p-10">
        <p className="text-sm leading-7 text-[color:var(--muted)]">
          Tieto Zásady nadobúdajú účinnosť dňom 10. 4. 2026.
        </p>
        <div className="mt-4">
          <Link href="/kontakt" className="button-primary">
            Kontaktujte nás
          </Link>
        </div>
      </div>
    </div>
  );
}
