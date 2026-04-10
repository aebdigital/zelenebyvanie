import Image from "next/image";
import Link from "next/link";

import { createMetadata, siteConfig } from "../../lib/site-data";

export const metadata = createMetadata({
  title: "Financovanie, predaj a výkup",
  description: "Pomoc s financovaním nehnuteľnosti, predajom aj rýchlym výkupom.",
  path: "/financovanie",
  image: "/site/finance/mortgage.jpg"
});

export default function FinancingPage() {
  return (
    <div className="shell space-y-16 py-10">

      {/* Hero intro */}
      <section data-reveal style={{ "--reveal-delay": "0ms" }} className="panel px-6 py-10 sm:px-10 sm:py-12">
        <p className="eyebrow">Financovanie a nehnuteľnosti</p>
        <h1 className="mt-4 max-w-3xl text-5xl sm:text-6xl">Financovanie, predaj a výkup nehnuteľností</h1>
        <p data-reveal style={{ "--reveal-delay": "120ms" }} className="mt-5 max-w-2xl text-lg leading-8 text-[color:var(--muted)]">
          Vybrali sme pre vás prehľad možností financovania a služieb, s ktorými vám vieme prakticky pomôcť od prvého kontaktu až po dokončenie obchodu.
        </p>
      </section>

      {/* Section 1 – Financovanie nehnuteľnosti */}
      <section className="grid gap-0 overflow-hidden rounded-[32px] border border-[color:var(--line)] bg-white/80 shadow-sm lg:grid-cols-[1fr_1.1fr]">
        <div className="relative min-h-[320px]">
          <Image
            src="/site/finance/mortgage.jpg"
            alt="Financovanie nehnuteľnosti"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
        </div>

        <div className="space-y-7 p-6 sm:p-8 lg:p-10">
          <div data-reveal style={{ "--reveal-delay": "80ms" }} className="space-y-3">
            <p className="eyebrow">Služba 01</p>
            <h2 className="text-4xl">Financovanie nehnuteľnosti</h2>
            <p className="leading-7 text-[color:var(--muted)]">
              V prípade ak nemáte dostatok finančných prostriedkov na financovanie stavby alebo kúpu nehnuteľnosti v hotovosti, pomôžeme vám s vybavením hypotekárneho úveru bezplatne. Chápeme, že kúpa nehnuteľnosti je veľký krok a často si vyžaduje správne finančné riešenie. Preto vám prinášame prehľad možností financovania, aby ste si mohli vybrať tú najlepšiu cestu k vášmu novému domovu.
            </p>
          </div>

          <div data-reveal style={{ "--reveal-delay": "160ms" }} className="space-y-2 border-t border-[color:var(--line)] pt-6">
            <h3 className="text-xl font-semibold text-[color:var(--ink)]">1. Hypotekárny úver</h3>
            <p className="leading-7 text-[color:var(--muted)]">
              Najčastejšia forma financovania nehnuteľnosti je hypotéka. Spolupracujeme s viacerými bankami a vieme vám pomôcť s výberom tej najvýhodnejšej ponuky.
            </p>
            <ul className="mt-3 space-y-2">
              {[
                "Možnosť financovania až do 80 – 90 % hodnoty nehnuteľnosti",
                "Výhodné úrokové sadzby",
                "Dlhodobé splácanie (až 30 rokov)"
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm leading-7 text-[color:var(--ink)]">
                  <span className="mt-0.5 shrink-0">✅</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal style={{ "--reveal-delay": "220ms" }} className="space-y-2 border-t border-[color:var(--line)] pt-5">
            <h3 className="text-xl font-semibold text-[color:var(--ink)]">2. Financovanie na splátky</h3>
            <p className="leading-7 text-[color:var(--muted)]">
              V niektorých prípadoch ponúkame možnosť postupného financovania nehnuteľnosti podľa dohodnutého splátkového kalendára. Táto možnosť závisí od konkrétneho projektu a dohody s našou spoločnosťou.
            </p>
          </div>

          <div data-reveal style={{ "--reveal-delay": "280ms" }} className="space-y-2 border-t border-[color:var(--line)] pt-5">
            <h3 className="text-xl font-semibold text-[color:var(--ink)]">3. Štátne dotácie a podpora</h3>
            <p className="leading-7 text-[color:var(--muted)]">
              V prípade, že spĺňate podmienky, môžete využiť rôzne formy štátnej podpory, ako napríklad:
            </p>
            <ul className="mt-3 space-y-2">
              {[
                "Štátny fond rozvoja bývania",
                "Dotácie pre mladé rodiny na bývanie",
                "Zvýhodnené úvery pre energeticky úsporné domy"
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm leading-7 text-[color:var(--ink)]">
                  <span className="mt-0.5 shrink-0">🏡</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal style={{ "--reveal-delay": "340ms" }} className="space-y-2 border-t border-[color:var(--line)] pt-5">
            <h3 className="text-xl font-semibold text-[color:var(--ink)]">4. Hotovostná platba</h3>
            <p className="leading-7 text-[color:var(--muted)]">
              Ak máte možnosť uhradiť celú sumu v hotovosti, ponúkame individuálne zvýhodnené podmienky a rýchlejšie dokončenie stavby alebo kúpy nehnuteľnosti.
            </p>
          </div>

          <div data-reveal style={{ "--reveal-delay": "400ms" }} className="rounded-[20px] bg-[color:var(--sage)]/30 p-5 border border-[color:var(--forest)]/15">
            <h3 className="text-xl font-semibold text-[color:var(--forest)]">Pomôžeme vám s financovaním!</h3>
            <p className="mt-2 text-sm leading-7 text-[color:var(--muted)]">
              Ak si nie ste istí, ktorá možnosť je pre vás najvýhodnejšia, naši odborníci vám radi poradia a pomôžu s vybavením financovania. Spolupracujeme s bankami a finančnými poradcami, aby ste získali tie najlepšie podmienky.
            </p>
            <div className="mt-4">
              <Link href="/kontakt" className="button-primary">Kontakt</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 – Sprostredkovanie predaja (reversed) */}
      <section className="grid gap-0 overflow-hidden rounded-[32px] border border-[color:var(--line)] bg-white/80 shadow-sm lg:grid-cols-[1.1fr_1fr]">
        <div className="space-y-7 p-6 sm:p-8 lg:p-10">
          <div data-reveal style={{ "--reveal-delay": "80ms" }} className="space-y-3">
            <p className="eyebrow">Služba 02</p>
            <h2 className="text-4xl">Sprostredkovanie predaja nehnuteľnosti</h2>
            <p className="leading-7 text-[color:var(--muted)]">
              Chcete predať svoju nehnuteľnosť rýchlo, bezpečne a za najlepšiu cenu? Postaráme sa o celý proces predaja za vás!
            </p>
          </div>

          <div data-reveal style={{ "--reveal-delay": "160ms" }} className="space-y-3 border-t border-[color:var(--line)] pt-6">
            <h3 className="text-xl font-semibold text-[color:var(--ink)]">Ako vám pomôžeme?</h3>
            <ul className="space-y-2">
              {[
                "Odborné poradenstvo – Zhodnotíme vašu nehnuteľnosť a odporučíme optimálnu predajnú stratégiu.",
                "Profesionálna prezentácia – Zabezpečíme kvalitné fotografie, videoobhliadky a atraktívnu inzerciu.",
                "Marketing a propagácia – Vašu nehnuteľnosť spropagujeme na najväčších realitných portáloch a sociálnych sieťach.",
                "Komunikácia s kupujúcimi – Odpovieme na všetky otázky, organizujeme obhliadky a vyjednáme najlepšiu cenu.",
                "Právny servis a administratíva – Postaráme sa o všetky zmluvy, kataster a potrebné dokumenty.",
                "Bezpečný a rýchly predaj – Využívame naše skúsenosti a sieť kontaktov, aby sme našli seriózneho kupca v čo najkratšom čase."
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm leading-7 text-[color:var(--ink)]">
                  <span className="mt-0.5 shrink-0">🔹</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal style={{ "--reveal-delay": "260ms" }} className="space-y-3 border-t border-[color:var(--line)] pt-5">
            <h3 className="text-xl font-semibold text-[color:var(--ink)]">Prečo si vybrať nás?</h3>
            <ul className="space-y-2">
              {[
                "Dlhoročné skúsenosti na realitnom trhu",
                "Individuálny prístup ku každému klientovi",
                "Transparentnosť a férové podmienky"
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm leading-7 text-[color:var(--ink)]">
                  <span className="mt-0.5 shrink-0">✅</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal style={{ "--reveal-delay": "340ms" }} className="rounded-[20px] bg-[color:var(--sage)]/30 p-5 border border-[color:var(--forest)]/15">
            <h3 className="text-xl font-semibold text-[color:var(--forest)]">Kontaktujte nás ešte dnes</h3>
            <p className="mt-2 text-sm leading-7 text-[color:var(--muted)]">
              My sa postaráme o všetko za vás!
            </p>
            <div className="mt-4">
              <Link href="/kontakt" className="button-primary">Kontakt</Link>
            </div>
          </div>
        </div>

        <div className="relative min-h-[320px] lg:order-last order-first">
          <Image
            src="/site/finance/sale.webp"
            alt="Predaj nehnuteľnosti"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
        </div>
      </section>

      {/* Section 3 – Výkup nehnuteľností */}
      <section className="grid gap-0 overflow-hidden rounded-[32px] border border-[color:var(--line)] bg-white/80 shadow-sm lg:grid-cols-[1fr_1.1fr]">
        <div className="relative min-h-[320px]">
          <Image
            src="/site/finance/buyout.webp"
            alt="Výkup nehnuteľností"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
        </div>

        <div className="space-y-7 p-6 sm:p-8 lg:p-10">
          <div data-reveal style={{ "--reveal-delay": "80ms" }} className="space-y-3">
            <p className="eyebrow">Služba 03</p>
            <h2 className="text-4xl">Rýchly a férový výkup nehnuteľností</h2>
            <p className="leading-7 text-[color:var(--muted)]">
              Potrebujete predať svoju nehnuteľnosť rýchlo a bez starostí? Ponúkame vám okamžitý výkup za férovú cenu, bez zdĺhavých obhliadok a komplikácií.
            </p>
          </div>

          <div data-reveal style={{ "--reveal-delay": "160ms" }} className="space-y-3 border-t border-[color:var(--line)] pt-6">
            <h3 className="text-xl font-semibold text-[color:var(--ink)]">Ako prebieha výkup?</h3>
            <ul className="space-y-2">
              {[
                "Bezplatné posúdenie – Odhadneme hodnotu vašej nehnuteľnosti rýchlo a nezáväzne.",
                "Rýchla ponuka – Do 24 hodín vám poskytneme cenovú ponuku.",
                "Expresné vyplatenie – Ak ponuku prijmete, dohodneme sa na vyplatení kúpnej ceny.",
                "Právny servis zdarma – Postaráme sa o všetky zmluvy a úradné záležitosti.",
                "Žiadne skryté poplatky – Celý proces je transparentný a bez sprostredkovateľských poplatkov."
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm leading-7 text-[color:var(--ink)]">
                  <span className="mt-0.5 shrink-0">✅</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal style={{ "--reveal-delay": "260ms" }} className="space-y-3 border-t border-[color:var(--line)] pt-5">
            <h3 className="text-xl font-semibold text-[color:var(--ink)]">Vykupujeme všetky typy nehnuteľností:</h3>
            <ul className="space-y-2">
              {[
                ["🏡", "Byty (aj zadlžené alebo v exekúcii)"],
                ["🏠", "Domy"],
                ["🌳", "Pozemky"],
                ["🏢", "Komerčné priestory"]
              ].map(([emoji, item]) => (
                <li key={item} className="flex items-start gap-2 text-sm leading-7 text-[color:var(--ink)]">
                  <span className="mt-0.5 shrink-0">{emoji}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal style={{ "--reveal-delay": "340ms" }} className="space-y-3 border-t border-[color:var(--line)] pt-5">
            <h3 className="text-xl font-semibold text-[color:var(--ink)]">Pre koho je výkup vhodný?</h3>
            <ul className="space-y-2">
              {[
                "Ak potrebujete rýchlo získať financie",
                "Ak nechcete riešiť inzerovanie, obhliadky a vyjednávanie",
                "Ak máte nehnuteľnosť v exekúcii alebo so záťažou",
                "Ak nechcete čakať mesiace na predaj cez realitnú kanceláriu"
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm leading-7 text-[color:var(--ink)]">
                  <span className="mt-0.5 shrink-0">🔹</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal style={{ "--reveal-delay": "420ms" }} className="rounded-[20px] bg-[color:var(--sage)]/30 p-5 border border-[color:var(--forest)]/15">
            <h3 className="text-xl font-semibold text-[color:var(--forest)]">Kontaktujte nás</h3>
            <p className="mt-2 text-sm leading-7 text-[color:var(--muted)]">
              Získajte nezáväznú ponuku už dnes!
            </p>
            <div className="mt-4">
              <Link href="/kontakt" className="button-primary">Kontakt</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section data-reveal style={{ "--reveal-delay": "0ms" }} className="panel p-6 sm:p-8 lg:p-10">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <p className="eyebrow">Máte otázky?</p>
            <h2 className="text-4xl">Poradíme vám s financovaním, predajom aj výkupom</h2>
            <p className="max-w-2xl text-base leading-7 text-[color:var(--muted)]">
              Zavolajte nám na {siteConfig.phoneDisplay} alebo napíšte na {siteConfig.email}.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/kontakt" className="button-primary">Kontakt</Link>
            <Link href="/" className="button-secondary">Domov</Link>
          </div>
        </div>
      </section>

    </div>
  );
}
