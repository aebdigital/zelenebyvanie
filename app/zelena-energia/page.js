import Image from "next/image";
import Link from "next/link";

import { SectionHeading } from "../../components/section-heading";
import { createMetadata } from "../../lib/site-data";

export const metadata = createMetadata({
  title: "Zelená energia",
  description: "Fotovoltika, tepelné čerpadlá, rekuperácia a inteligentné energetické riešenia.",
  path: "/zelena-energia",
  image: "/site/energy/solar.jpg"
});

const greenSolutions = [
  { emoji: "☀️", text: "Fotovoltické panely – Vyrábajte si vlastnú elektrinu zo slnka a znížte svoje účty za energie." },
  { emoji: "🔥", text: "Tepelné čerpadlá – Účinné vykurovanie a chladenie s výraznou úsporou nákladov." },
  { emoji: "🌬️", text: "Rekuperácia vzduchu – Zabezpečte si čerstvý vzduch v dome s minimálnymi stratami tepla." },
  { emoji: "💡", text: "Inteligentná domácnosť – Ovládajte osvetlenie, kúrenie, bezpečnosť a spotrebu energie pohodlne cez mobilnú aplikáciu." },
  { emoji: "🔋", text: "Inteligentné energetické riešenia – Optimalizujte spotrebu energie pomocou moderných technológií." }
];

const greenBenefits = [
  "Kompletný servis – od návrhu až po montáž a servis",
  "Individuálne riešenia – prispôsobíme technológiu vašim potrebám",
  "Štátne dotácie – poradíme vám alebo vybavíme za vás ako získať finančnú podporu na ekologické riešenia",
  "Rýchla návratnosť investície – zníženie nákladov na energie už od prvých mesiacov"
];

export default function GreenEnergyPage() {
  return (
    <div className="shell space-y-10 py-10">
      <section className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
        <div data-reveal style={{ "--reveal-delay": "0ms" }} className="panel p-6 sm:p-8 lg:p-10">
          <SectionHeading
            delay={0}
            eyebrow="Zelená energia pre váš domov"
            title="Chcete ušetriť na energiách a zároveň investovať do udržateľnej budúcnosti?"
            description="Ponúkame vám montáž moderných systémov zelenej energie, ktoré vám pomôžu znížiť náklady na bývanie a zvýšiť hodnotu vašej nehnuteľnosti."
          />

          <div data-reveal style={{ "--reveal-delay": "90ms" }} className="mt-8">
            <h3 className="text-2xl font-bold text-[color:var(--forest)]">Naše riešenia pre úsporné a inteligentné bývanie</h3>
          </div>

          <ul className="mt-6 space-y-4">
            {greenSolutions.map((item, index) => (
              <li
                key={item.text}
                data-reveal
                style={{ "--reveal-delay": `${120 + index * 70}ms` }}
                className="flex items-start gap-3 text-sm leading-7 text-[color:var(--ink)]"
              >
                <span className="mt-0.5 shrink-0 text-xl leading-7">{item.emoji}</span>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div data-reveal style={{ "--reveal-delay": "120ms" }} className="panel relative min-h-[420px] overflow-hidden">
          <Image
            src="/site/energy/solar.jpg"
            alt="Fotovoltické panely"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 46vw"
          />
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[0.95fr_1fr]">
        <div data-reveal style={{ "--reveal-delay": "0ms" }} className="panel relative min-h-[380px] overflow-hidden">
          <Image
            src="/site/energy/smart-home.webp"
            alt="Inteligentná domácnosť"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 46vw"
          />
        </div>

        <div data-reveal style={{ "--reveal-delay": "120ms" }} className="panel p-6 sm:p-8 lg:p-10">
          <p className="eyebrow">Prečo si vybrať nás</p>
          <h2 className="mt-4 text-4xl font-bold text-[color:var(--forest)]">Prečo si vybrať nás?</h2>

          <ul className="mt-6 space-y-4">
            {greenBenefits.map((item, index) => (
              <li
                key={item}
                data-reveal
                style={{ "--reveal-delay": `${160 + index * 70}ms` }}
                className="flex items-start gap-3 text-sm leading-7 text-[color:var(--ink)]"
              >
                <span className="mt-0.5 shrink-0 text-base leading-7">✅</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div data-reveal style={{ "--reveal-delay": "440ms" }} className="mt-8 space-y-5">
            <p className="text-base font-semibold text-[color:var(--ink)]">Urobte svoj dom ekologickejším a inteligentnejším!</p>
            <Link href="/kontakt" className="button-primary">
              Kontakt
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
