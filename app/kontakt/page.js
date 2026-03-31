import { ContactForm } from "../../components/contact-form";
import { createMetadata, siteConfig } from "../../lib/site-data";

export const metadata = createMetadata({
  title: "Kontakt",
  description: "Spojte sa so ZelenýmBývaním telefonicky, e-mailom alebo cez formulár.",
  path: "/kontakt"
});

export default function ContactPage() {
  return (
    <div className="shell space-y-10 py-10">
      <section className="panel px-6 py-10 sm:px-8 sm:py-12 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div data-reveal style={{ "--reveal-delay": "0ms" }} className="space-y-5">
            <p className="eyebrow">Kontakt</p>
            <h1 className="text-5xl sm:text-6xl">Radi si vypočujeme, čo plánujete.</h1>
            <p className="max-w-xl text-lg leading-8 text-[color:var(--muted)]">
              Napíšte nám krátku správu, zavolajte alebo sa zastavte. Či riešite dom,
              techniku, energie alebo nehnuteľnosť, vieme sa rýchlo zorientovať.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <article
              data-reveal
              style={{ "--reveal-delay": "120ms" }}
              className="rounded-[28px] border border-[color:var(--line)] bg-white/75 p-6"
            >
              <h2 className="text-3xl">Adresa</h2>
              <div className="mt-4 space-y-2 text-sm leading-7 text-[color:var(--muted)]">
                {siteConfig.address.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </article>
            <article
              data-reveal
              style={{ "--reveal-delay": "200ms" }}
              className="rounded-[28px] border border-[color:var(--line)] bg-white/75 p-6"
            >
              <h2 className="text-3xl">Kontakty</h2>
              <div className="mt-4 space-y-2 text-sm leading-7 text-[color:var(--muted)]">
                <a href={`mailto:${siteConfig.email}`} className="block text-[color:var(--forest)] hover:underline">
                  {siteConfig.email}
                </a>
                <a href={siteConfig.phoneHref} className="block text-[color:var(--forest)] hover:underline">
                  {siteConfig.phoneDisplay}
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <ContactForm />

        <aside data-reveal style={{ "--reveal-delay": "220ms" }} className="panel flex flex-col justify-between gap-6 p-6 sm:p-8">
          <div
            data-reveal
            style={{ "--reveal-delay": "300ms" }}
            className="space-y-4"
          >
            <p className="eyebrow">Kde nás nájdete</p>
            <h2 className="text-3xl">Mapa</h2>
            <div className="overflow-hidden border border-[color:var(--line)]">
              <iframe
                title="Mapa ZelenéBývanie"
                src="https://www.google.com/maps?q=49.1118371,18.4822404&z=17&output=embed"
                className="h-[420px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
