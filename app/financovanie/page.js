import Image from "next/image";
import Link from "next/link";

import { SectionHeading } from "../../components/section-heading";
import { createMetadata } from "../../lib/site-data";

export const metadata = createMetadata({
  title: "Financovanie, predaj a výkup",
  description: "Pomoc s financovaním nehnuteľnosti, predajom aj rýchlym výkupom.",
  path: "/financovanie",
  image: "/site/finance/mortgage.jpg"
});

const financingContent = [
  {
    title: "Financovanie nehnuteľnosti",
    image: "/site/finance/mortgage.jpg",
    intro:
      "V prípade ak nemáte dostatok finančných prostriedkov na financovanie stavby alebo kúpu nehnuteľnosti v hotovosti, pomôžeme vám s vybavením hypotekárneho úveru bezplatne.",
    paragraphs: [
      "Chápeme, že kúpa nehnuteľnosti je veľký krok a často si vyžaduje správne finančné riešenie. Preto vám prinášame prehľad možností financovania, aby ste si mohli vybrať tú najlepšiu cestu k vášmu novému domovu."
    ],
    groups: [
      {
        title: "1. Hypotekárny úver",
        text: "Najčastejšia forma financovania nehnuteľnosti je hypotéka. Spolupracujeme s viacerými bankami a vieme vám pomôcť s výberom tej najvýhodnejšej ponuky.",
        bullets: [
          "Možnosť financovania až do 80 – 90 % hodnoty nehnuteľnosti",
          "Výhodné úrokové sadzby",
          "Dlhodobé splácanie (až 30 rokov)"
        ]
      },
      {
        title: "2. Financovanie na splátky",
        text: "V niektorých prípadoch ponúkame možnosť postupného financovania nehnuteľnosti podľa dohodnutého splátkového kalendára. Táto možnosť závisí od konkrétneho projektu a dohody s našou spoločnosťou.",
        bullets: []
      },
      {
        title: "3. Štátne dotácie a podpora",
        text: "V prípade, že spĺňate podmienky, môžete využiť rôzne formy štátnej podpory, ako napríklad:",
        bullets: [
          "Štátny fond rozvoja bývania",
          "Dotácie pre mladé rodiny na bývanie",
          "Zvýhodnené úvery pre energeticky úsporné domy"
        ]
      },
      {
        title: "4. Hotovostná platba",
        text: "Ak máte možnosť uhradiť celú sumu v hotovosti, ponúkame individuálne zvýhodnené podmienky a rýchlejšie dokončenie stavby alebo kúpy nehnuteľnosti.",
        bullets: []
      }
    ],
    outroTitle: "Pomôžeme vám s financovaním!",
    outro:
      "Ak si nie ste istí, ktorá možnosť je pre vás najvýhodnejšia, naši odborníci vám radi poradia a pomôžu s vybavením financovania. Spolupracujeme s bankami a finančnými poradcami, aby ste získali tie najlepšie podmienky."
  },
  {
    title: "Sprostredkovanie predaja nehnuteľnosti",
    image: "/site/finance/sale.webp",
    intro: "Chcete predať svoju nehnuteľnosť rýchlo, bezpečne a za najlepšiu cenu? Postaráme sa o celý proces predaja za vás!",
    paragraphs: [],
    groups: [
      {
        title: "Ako vám pomôžeme?",
        text: "",
        bullets: [
          "Odborné poradenstvo – Zhodnotíme vašu nehnuteľnosť a odporučíme optimálnu predajnú stratégiu.",
          "Profesionálna prezentácia – Zabezpečíme kvalitné fotografie, videoobhliadky a atraktívnu inzerciu.",
          "Marketing a propagácia – Vašu nehnuteľnosť spropagujeme na najväčších realitných portáloch a sociálnych sieťach.",
          "Komunikácia s kupujúcimi – Odpovieme na všetky otázky, organizujeme obhliadky a vyjednáme najlepšiu cenu.",
          "Právny servis a administratíva – Postaráme sa o všetky zmluvy, kataster a potrebné dokumenty.",
          "Bezpečný a rýchly predaj – Využívame naše skúsenosti a sieť kontaktov, aby sme našli seriózneho kupca v čo najkratšom čase."
        ]
      },
      {
        title: "Prečo si vybrať nás?",
        text: "",
        bullets: [
          "Dlhoročné skúsenosti na realitnom trhu",
          "Individuálny prístup ku každému klientovi",
          "Transparentnosť a férové podmienky"
        ]
      }
    ],
    outroTitle: "Kontaktujte nás ešte dnes",
    outro: "My sa postaráme o všetko za vás!"
  },
  {
    title: "Rýchly a férový výkup nehnuteľností",
    image: "/site/finance/buyout.webp",
    intro: "Potrebujete predať svoju nehnuteľnosť rýchlo a bez starostí? Ponúkame vám okamžitý výkup za férovú cenu, bez zdĺhavých obhliadok a komplikácií.",
    paragraphs: [],
    groups: [
      {
        title: "Ako prebieha výkup?",
        text: "",
        bullets: [
          "Bezplatné posúdenie – Odhadneme hodnotu vašej nehnuteľnosti rýchlo a nezáväzne.",
          "Rýchla ponuka – Do 24 hodín vám poskytneme cenovú ponuku.",
          "Expresné vyplatenie – Ak ponuku prijmete, dohodneme sa na vyplatení kúpnej ceny.",
          "Právny servis zdarma – Postaráme sa o všetky zmluvy a úradné záležitosti.",
          "Žiadne skryté poplatky – Celý proces je transparentný a bez sprostredkovateľských poplatkov."
        ]
      },
      {
        title: "Vykupujeme všetky typy nehnuteľností:",
        text: "",
        bullets: [
          "Byty (aj zadlžené alebo v exekúcii)",
          "Domy",
          "Pozemky",
          "Komerčné priestory"
        ]
      },
      {
        title: "Pre koho je výkup vhodný?",
        text: "",
        bullets: [
          "Ak potrebujete rýchlo získať financie",
          "Ak nechcete riešiť inzerovanie, obhliadky a vyjednávanie",
          "Ak máte nehnuteľnosť v exekúcii alebo so záťažou",
          "Ak nechcete čakať mesiace na predaj cez realitnú kanceláriu"
        ]
      }
    ],
    outroTitle: "Kontaktujte nás",
    outro: "Získajte nezáväznú ponuku už dnes!"
  }
];

export default function FinancingPage() {
  return (
    <div className="shell space-y-10 py-10">
      <section className="panel px-6 py-10 sm:px-8 sm:py-12 lg:px-12">
        <SectionHeading
          delay={0}
          eyebrow="Financovanie a nehnuteľnosti"
          title="Financovanie nehnuteľnosti, sprostredkovanie predaja a rýchly výkup na jednom mieste."
          description="Vybrali sme pre vás prehľad možností financovania a služieb, s ktorými vám vieme prakticky pomôcť od prvého kontaktu až po dokončenie obchodu."
        />
      </section>

      <section className="grid gap-6">
        {financingContent.map((section, index) => (
          <article
            key={section.title}
            data-reveal
            style={{ "--reveal-delay": `${120 + index * 90}ms` }}
            className="panel overflow-hidden"
          >
            <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="relative min-h-[280px]">
                <Image
                  src={section.image}
                  alt={section.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>

              <div className="space-y-6 p-6 sm:p-8 lg:p-10">
                <div data-reveal style={{ "--reveal-delay": `${180 + index * 90}ms` }} className="space-y-3">
                  <p className="eyebrow">Služba</p>
                  <h2 className="text-4xl">{section.title}</h2>
                  <p className="leading-7 text-[color:var(--muted)]">{section.intro}</p>
                </div>

                {section.paragraphs.map((paragraph, paragraphIndex) => (
                  <p
                    key={paragraph}
                    data-reveal
                    style={{ "--reveal-delay": `${220 + index * 90 + paragraphIndex * 40}ms` }}
                    className="leading-7 text-[color:var(--muted)]"
                  >
                    {paragraph}
                  </p>
                ))}

                <div className="space-y-6">
                  {section.groups.map((group, groupIndex) => (
                    <div
                      key={group.title}
                      data-reveal
                      style={{ "--reveal-delay": `${260 + index * 90 + groupIndex * 70}ms` }}
                      className="space-y-3 border-t border-[color:var(--line)] pt-5"
                    >
                      <h3 className="text-2xl">{group.title}</h3>
                      {group.text ? (
                        <p className="leading-7 text-[color:var(--muted)]">{group.text}</p>
                      ) : null}
                      {group.bullets.length > 0 ? (
                        <ul className="space-y-3">
                          {group.bullets.map((bullet) => (
                            <li key={bullet} className="flex gap-3 text-sm leading-7 text-[color:var(--ink)]">
                              <span className="mt-2 h-1.5 w-1.5 bg-[color:var(--forest)]" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  ))}
                </div>

                <div
                  data-reveal
                  style={{ "--reveal-delay": `${420 + index * 90}ms` }}
                  className="space-y-3 border-t border-[color:var(--line)] pt-5"
                >
                  <h3 className="text-2xl">{section.outroTitle}</h3>
                  <p className="leading-7 text-[color:var(--muted)]">{section.outro}</p>
                  <div className="pt-2">
                    <Link href="/kontakt" className="button-primary">
                      Kontakt
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
