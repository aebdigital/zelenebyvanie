import Image from "next/image";
import Link from "next/link";

export function RentalCard({ rental, delay = 0 }) {
  return (
    <div
      data-reveal
      style={{ "--reveal-delay": `${delay}ms` }}
    >
      <Link
        href={`/${rental.slug}`}
        className="group block cursor-pointer"
      >
        <article className="panel relative flex h-full flex-col overflow-hidden transition-transform duration-500 ease-out will-change-transform group-hover:scale-[1.03]">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={rental.image}
              alt={rental.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
            <div className="absolute right-4 top-4 bg-[color:var(--forest)] px-4 py-2 text-sm font-semibold text-white shadow-[0_16px_28px_rgba(13,44,34,0.18)]">
              {rental.price}
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="border border-white/18 bg-white/88 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--forest)] shadow-[0_14px_28px_rgba(13,44,34,0.14)]">
                Viac info
              </span>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-5 p-6">
            <div className="space-y-3">
              <h3 className="text-3xl">{rental.shortTitle}</h3>
              <p className="leading-7 text-[color:var(--muted)]">{rental.teaser}</p>
            </div>

            <ul className="space-y-2 text-sm text-[color:var(--ink)]">
              {rental.highlights.slice(0, 3).map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 bg-[color:var(--forest)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </Link>
    </div>
  );
}
