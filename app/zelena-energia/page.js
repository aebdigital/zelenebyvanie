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
  "Fotovoltické panely – Vyrábajte si vlastnú elektrinu zo slnka a znížte svoje účty za energie.",
  "Tepelné čerpadlá – Účinné vykurovanie a chladenie s výraznou úsporou nákladov.",
  "Rekuperácia vzduchu – Zabezpečte si čerstvý vzduch v dome s minimálnymi stratami tepla.",
  "Inteligentná domácnosť – Ovládajte osvetlenie, kúrenie, bezpečnosť a spotrebu energie pohodlne cez mobilnú aplikáciu.",
  "Inteligentné energetické riešenia – Optimalizujte spotrebu energie pomocou moderných technológií."
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

          <div data-reveal style={{ "--reveal-delay": "90ms" }} className="mt-8 space-y-3">
            <h3 className="text-2xl">Naše riešenia pre úsporné a inteligentné bývanie</h3>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {greenSolutions.map((feature, index) => (
              <article
                key={feature}
                data-reveal
                style={{ "--reveal-delay": `${120 + index * 70}ms` }}
                className="border border-[color:var(--line)] bg-white/80 p-5"
              >
                <p className="text-sm leading-7 text-[color:var(--muted)]">{feature}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="grid gap-6">
          <div data-reveal style={{ "--reveal-delay": "120ms" }} className="panel relative aspect-[4/3] overflow-hidden">
            <Image
              src="/site/energy/solar.jpg"
              alt="Fotovoltické panely"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
          <div data-reveal style={{ "--reveal-delay": "240ms" }} className="panel relative aspect-[4/3] overflow-hidden">
            <Image
              src="/site/energy/smart-home.webp"
              alt="Inteligentná domácnosť"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
        </div>
      </section>

      <section className="panel p-6 sm:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div data-reveal style={{ "--reveal-delay": "0ms" }}>
            <p className="eyebrow">Prečo si vybrať nás</p>
            <h2 className="mt-4 text-4xl">Prečo si vybrať nás?</h2>
          </div>
          <ul className="space-y-4">
            {greenBenefits.map((item, index) => (
              <li
                key={item}
                data-reveal
                style={{ "--reveal-delay": `${120 + index * 70}ms` }}
                className="flex gap-3 border border-[color:var(--line)] bg-white/75 px-5 py-4"
              >
                <span className="mt-2 h-2 w-2 bg-[color:var(--gold)]" />
                <span className="text-sm leading-7 text-[color:var(--ink)]">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div data-reveal style={{ "--reveal-delay": "420ms" }} className="mt-8 space-y-5">
          <p className="leading-7 text-[color:var(--muted)]">Urobte svoj dom ekologickejším a inteligentnejším!</p>
          <Link href="/kontakt" className="button-primary">
            Kontakt
          </Link>
        </div>
      </section>
    </div>
  );
}
