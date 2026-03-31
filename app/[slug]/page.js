import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { RentalCard } from "../../components/rental-card";
import { createMetadata, getRentalBySlug, rentals, siteConfig } from "../../lib/site-data";

export function generateStaticParams() {
  return rentals.map((rental) => ({ slug: rental.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const rental = getRentalBySlug(slug);

  if (!rental) {
    return {};
  }

  return createMetadata({
    title: rental.title,
    description: rental.teaser,
    path: `/${rental.slug}`,
    image: rental.image
  });
}

export default async function RentalDetailPage({ params }) {
  const { slug } = await params;
  const rental = getRentalBySlug(slug);

  if (!rental) {
    notFound();
  }

  const otherRentals = rentals.filter((item) => item.slug !== rental.slug).slice(0, 3);

  return (
    <div className="shell space-y-10 py-10">
      <section className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
        <div data-reveal style={{ "--reveal-delay": "0ms" }} className="panel p-6 sm:p-8 lg:p-10">
          <p data-reveal style={{ "--reveal-delay": "80ms" }} className="eyebrow">Prenájom techniky</p>
          <h1 data-reveal style={{ "--reveal-delay": "160ms" }} className="mt-4 text-5xl sm:text-6xl">{rental.title}</h1>
          <p
            data-reveal
            style={{ "--reveal-delay": "240ms" }}
            className="mt-5 max-w-2xl text-lg leading-8 text-[color:var(--muted)]"
          >
            {rental.teaser}
          </p>

          <div data-reveal style={{ "--reveal-delay": "320ms" }} className="mt-8 flex flex-wrap gap-3">
            <span className="rounded-full bg-[color:var(--forest)] px-4 py-2 text-sm font-semibold text-white">
              {rental.price}
            </span>
            <span className="rounded-full border border-[color:var(--line)] bg-white/75 px-4 py-2 text-sm font-semibold text-[color:var(--forest)]">
              {rental.deposit}
            </span>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {rental.specs.map(([label, value], index) => (
              <div
                key={label}
                data-reveal
                style={{ "--reveal-delay": `${380 + index * 60}ms` }}
                className="rounded-[24px] border border-[color:var(--line)] bg-white/80 p-4"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--muted)]">
                  {label}
                </p>
                <p className="mt-2 text-lg font-semibold text-[color:var(--ink)]">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div data-reveal style={{ "--reveal-delay": "160ms" }} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {rental.gallery.map((image, index) => (
            <div
              key={image}
              data-reveal
              style={{ "--reveal-delay": `${220 + index * 40}ms` }}
              className="panel relative aspect-square overflow-hidden"
            >
              <Image
                src={image}
                alt={`${rental.title} ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 95vw, (max-width: 1280px) 28vw, 18vw"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <article data-reveal style={{ "--reveal-delay": "0ms" }} className="panel space-y-5 p-6 sm:p-8">
          <h2 className="text-4xl">Prehľad</h2>
          {rental.summary.map((paragraph, index) => (
            <p
              key={paragraph}
              data-reveal
              style={{ "--reveal-delay": `${120 + index * 70}ms` }}
              className="leading-7 text-[color:var(--muted)]"
            >
              {paragraph}
            </p>
          ))}
        </article>

        <article data-reveal style={{ "--reveal-delay": "120ms" }} className="panel p-6 sm:p-8">
          <h2 className="text-4xl">Dôležité informácie</h2>
          <ul className="mt-6 space-y-4">
            {rental.highlights.map((item, index) => (
              <li
                key={item}
                data-reveal
                style={{ "--reveal-delay": `${200 + index * 60}ms` }}
                className="flex gap-3 text-sm leading-7 text-[color:var(--ink)]"
              >
                <span className="mt-2 h-2 w-2 rounded-full bg-[color:var(--gold)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section data-reveal style={{ "--reveal-delay": "0ms" }} className="panel p-6 sm:p-8 lg:p-10">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div data-reveal style={{ "--reveal-delay": "120ms" }} className="space-y-3">
            <p className="eyebrow">Rezervácia a dopyt</p>
            <h2 className="text-4xl">{rental.ctaTitle || `Máte záujem o ${rental.shortTitle.toLowerCase()}?`}</h2>
            <p className="max-w-2xl text-base leading-7 text-[color:var(--muted)]">
              Zavolajte nám na {siteConfig.phoneDisplay} alebo napíšte na {siteConfig.email} a dohodneme termín,
              dostupnosť aj prípadnú dopravu.
            </p>
          </div>
          <div data-reveal style={{ "--reveal-delay": "220ms" }} className="flex flex-col gap-3 sm:flex-row">
            <Link href="/kontakt" className="button-primary">
              Kontakt
            </Link>
            <Link href="/poziciavame" className="button-secondary">
              Všetka technika
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-end justify-between gap-4">
          <div data-reveal style={{ "--reveal-delay": "0ms" }} className="space-y-3">
            <p className="eyebrow">Ďalší prenájom</p>
            <h2 className="text-4xl">Možno sa vám hodí aj ďalšie vybavenie</h2>
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {otherRentals.map((item, index) => (
            <RentalCard key={item.slug} rental={item} delay={120 + index * 70} />
          ))}
        </div>
      </section>
    </div>
  );
}
