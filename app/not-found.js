import Link from "next/link";

export default function NotFound() {
  return (
    <div className="shell py-20">
      <div data-reveal style={{ "--reveal-delay": "0ms" }} className="panel px-6 py-12 text-center sm:px-8">
        <p data-reveal style={{ "--reveal-delay": "80ms" }} className="eyebrow">404</p>
        <h1 data-reveal style={{ "--reveal-delay": "160ms" }} className="mt-4 text-5xl">Táto stránka sa nenašla.</h1>
        <p
          data-reveal
          style={{ "--reveal-delay": "240ms" }}
          className="mx-auto mt-5 max-w-xl text-lg leading-8 text-[color:var(--muted)]"
        >
          Skúste sa vrátiť na úvod alebo pokračujte na kontakt a radi vám pomôžeme.
        </p>
        <div data-reveal style={{ "--reveal-delay": "320ms" }} className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/" className="button-primary">
            Späť na úvod
          </Link>
          <Link href="/kontakt" className="button-secondary">
            Kontakt
          </Link>
        </div>
      </div>
    </div>
  );
}
