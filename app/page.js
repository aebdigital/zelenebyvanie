import Image from "next/image";
import Link from "next/link";

import { HomeHero } from "../components/home-hero";
import { ProjectCard } from "../components/project-card";
import { RentalCard } from "../components/rental-card";
import { SectionHeading } from "../components/section-heading";
import { createMetadata, greenEnergyBenefits, homeServices, projects, reasons, rentals } from "../lib/site-data";

export const metadata = createMetadata({
  title: "Domy na kľúč s dlhoročnými skúsenosťami",
  description:
    "Výstavba, rekonštrukcie, zelená energia, prenájom techniky a pomoc s nehnuteľnosťami v okolí Považskej Bystrice, Púchova, Bytče a Žiliny.",
  path: "/"
});

const featuredProjects = projects.filter((project) => project.featured);
const featuredRentals = rentals.slice(0, 3);

export default function HomePage() {
  return (
    <div className="pb-8">
      <HomeHero />

      <div className="relative z-20 space-y-20 pt-10 pb-8">
        <section id="cinnost" className="shell">
          <div className="panel soft-grid px-6 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
            <SectionHeading
              delay={0}
              eyebrow="Naše služby"
              title="Staviame, rekonštruujeme a pomáhame dotiahnuť bývanie od prvého kroku po odovzdanie."
              description="Záber máme od rodinných domov a technických prác až po energetické riešenia a podporu pri kúpe či predaji nehnuteľnosti."
            />

            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {homeServices.map((service, index) => (
                <article
                  key={service.title}
                  data-reveal
                  style={{ "--reveal-delay": `${120 + index * 70}ms` }}
                  className="panel relative min-h-[240px] overflow-hidden flex flex-col justify-end p-6"
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 95vw, (max-width: 1280px) 46vw, 30vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d2c22]/95 via-[#0d2c22]/60 to-[#184c37]/20" />
                  <div className="relative z-10">
                    <h3 className="text-3xl font-bold text-white">{service.title}</h3>
                    <p className="mt-3 leading-7 text-white/80">{service.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="shell">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              delay={0}
              eyebrow="Realizácie"
              title="Pozrite sa na projekty, na ktorých je vidieť náš spôsob práce."
              description="Od vizualizácií a nových domov až po bytové a radové projekty. Každá realizácia má vlastné zadanie, ale rovnaký cieľ: spoľahlivý výsledok."
            />
            <Link
              href="/realizujeme"
              data-reveal
              style={{ "--reveal-delay": "120ms" }}
              className="button-primary min-h-14 px-7 text-base"
            >
              Všetky realizácie
            </Link>
          </div>

          <div className="mt-10 grid gap-6 xl:grid-cols-3">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.title} project={project} delay={120 + index * 90} />
            ))}
          </div>
        </section>

        <section className="shell">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div data-reveal style={{ "--reveal-delay": "0ms" }} className="panel soft-grid overflow-hidden p-8 sm:p-10">
              <SectionHeading
                delay={0}
                eyebrow="Zelená energia"
                title="Úsporné a inteligentné bývanie pre dnešok aj ďalšie roky."
                description="Fotovoltika, tepelné čerpadlá, rekuperácia a inteligentné riadenie domu navrhujeme tak, aby dávali zmysel technicky aj finančne."
              />

              <ul className="mt-8 space-y-4">
                {greenEnergyBenefits.map((benefit, index) => (
                  <li
                    key={benefit}
                    data-reveal
                    style={{ "--reveal-delay": `${120 + index * 70}ms` }}
                    className="flex gap-3 text-sm leading-7 text-[color:var(--ink)]"
                  >
                    <span className="mt-2 h-2 w-2 rounded-full bg-[color:var(--gold)]" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <div data-reveal style={{ "--reveal-delay": "360ms" }} className="mt-8">
                <Link href="/zelena-energia" className="button-primary">
                  Zistiť viac
                </Link>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div data-reveal style={{ "--reveal-delay": "120ms" }} className="panel relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/site/energy/solar.jpg"
                  alt="Fotovoltické panely"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 95vw, 46vw"
                />
              </div>
              <div
                data-reveal
                style={{ "--reveal-delay": "240ms" }}
                className="panel relative aspect-[4/5] overflow-hidden sm:translate-y-10"
              >
                <Image
                  src="/site/energy/smart-home.webp"
                  alt="Inteligentná domácnosť"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 95vw, 46vw"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="shell">
          <SectionHeading
            delay={0}
            eyebrow="Požičiavame"
            title="Technika a vybavenie pripravené pre stavbu aj krátkodobé zásahy."
            description="Prenájom robíme jednoducho: jasný cenník, rýchly kontakt a technika, ktorú poznáme z vlastnej praxe."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {featuredRentals.map((rental, index) => (
              <RentalCard key={rental.slug} rental={rental} delay={120 + index * 90} />
            ))}
          </div>
        </section>

        <section className="shell">
          <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr]">
            <div data-reveal style={{ "--reveal-delay": "0ms" }} className="panel p-6 sm:p-8 lg:p-10">
              <p className="eyebrow">O nás</p>
              <h2 className="mt-4 text-4xl sm:text-5xl">Rodinná firma postavená na skúsenostiach zo skutočných stavieb.</h2>
              <div className="mt-6 space-y-5 text-base leading-8 text-[color:var(--muted)]">
                <p>
                  Naša rodinná firma bola založená na základe dlhoročných skúseností a odbornosti
                  zakladateľov a zamestnancov v stavebníctve. Podľa sezóny zamestnávame 10-20 ľudí,
                  spolupracujeme s viacerými živnostníkmi a remeselníkmi, odborné práce prenechávame
                  skúseným subdodávateľom.
                </p>
                <p>
                  Pôsobíme v regiónoch Žilinského a Trenčianskeho samosprávneho kraja a to hlavne v
                  Považskej Bystrici, Púchove, Bytči a Žiline a okolitých obciach. V prípade potreby
                  pôsobíme na celom území SR a ČR.
                </p>
              </div>
            </div>

            <div data-reveal style={{ "--reveal-delay": "140ms" }} className="panel relative min-h-[420px] overflow-hidden">
              <Image
                src="/site/home/about-family.jpg"
                alt="Realizácia rodinného domu od ZelenéBývanie"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 95vw, 46vw"
              />
            </div>
          </div>
        </section>

        <section className="shell">
          <SectionHeading
            delay={0}
            eyebrow="Prečo si nás vybrať"
            title="Spájame výstavbu, technológie a praktické riešenia do jedného procesu."
            description="Nie sme len dodávateľ jednej profesie. Vieme pomôcť s celým rámcom projektu od terénu a hrubej stavby až po energie a financovanie."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {reasons.map((item, index) => (
              <article
                key={item.title}
                data-reveal
                style={{ "--reveal-delay": `${120 + index * 70}ms` }}
                className="panel p-6"
              >
                <h3 className="text-3xl">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="shell">
          <div data-reveal style={{ "--reveal-delay": "0ms" }} className="panel soft-grid overflow-hidden px-6 py-10 sm:px-10 sm:py-12">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl space-y-4">
                <p className="eyebrow">Dajte zelenú vášmu bývaniu</p>
                <h2 className="text-4xl sm:text-5xl">Potrebujete dom na kľúč, techniku alebo poradiť s nehnuteľnosťou?</h2>
                <p className="text-base leading-7 text-[color:var(--muted)]">
                  Ozvite sa a prejdeme spolu, čo je pre váš projekt najlepší ďalší krok.
                </p>
              </div>
              <div data-reveal style={{ "--reveal-delay": "160ms" }} className="flex flex-col gap-3 sm:flex-row">
                <Link href="/kontakt" className="button-primary">
                  Kontakt
                </Link>
                <Link href="/financovanie" className="button-secondary">
                  Financovanie a predaj
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
