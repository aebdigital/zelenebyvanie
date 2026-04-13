"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

export function HomeHero() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;

    if (!section || !image) {
      return undefined;
    }

    let frameId = 0;

    const update = () => {
      frameId = 0;

      const rect = section.getBoundingClientRect();
      const progress = Math.min(Math.max(-rect.top / window.innerHeight, 0), 1);
      const translate = progress * 15;

      image.style.transform = `translate3d(0, ${translate}%, 0) scale(1.14)`;
    };

    const onScroll = () => {
      if (frameId) {
        return;
      }

      frameId = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-svh">
      <div className="sticky top-0 h-svh overflow-hidden">
        <div ref={imageRef} className="absolute inset-0 will-change-transform">
          <Image
            src="/site/home/hero-marsova.jpg"
            alt="Vizualizácia rodinného domu"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(8,18,14,0.82)_0%,rgba(8,18,14,0.48)_45%,rgba(8,18,14,0.18)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(184,139,72,0.28),transparent_24rem)]" />
        <div className="absolute inset-0 soft-grid opacity-20 mix-blend-soft-light" />

        <div className="shell relative flex h-svh items-end pb-12 pt-28 sm:pb-14 sm:pt-32 lg:pb-18">
          <div className="grid w-full items-end gap-10 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="max-w-5xl text-white">
              <p data-reveal style={{ "--reveal-delay": "80ms" }} className="eyebrow border-white/18 bg-white/8 text-white">
                Rodinné domy, byty, haly a zástavby
              </p>
              <h1
                data-reveal
                style={{ "--reveal-delay": "180ms" }}
                className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.92] sm:text-6xl lg:text-[clamp(3.9rem,6.9vw,6.8rem)]"
              >
                Domy na kľúč s dlhoročnými skúsenosťami
              </h1>
              <p
                data-reveal
                style={{ "--reveal-delay": "300ms" }}
                className="mt-6 max-w-3xl text-base leading-8 text-white/78 sm:text-lg"
              >
                Riešenie pre všetky druhy výstavby: výstavba, údržba, rekonštrukcie,
                výkopové práce, zeleň, zelená energia aj pomoc s nehnuteľnosťami.
              </p>
              <div
                data-reveal
                style={{ "--reveal-delay": "420ms" }}
                className="mt-8 flex flex-col gap-3 sm:flex-row"
              >
                <Link href="/kontakt" className="button-primary min-h-14 px-7 py-4 text-base sm:min-w-52">
                  Kontaktujte nás
                </Link>
                <Link
                  href="/realizujeme"
                  className="button-secondary min-h-14 px-7 py-4 text-base sm:min-w-52 border-white/18 bg-white/10 text-white hover:border-white/30 hover:bg-white/16 hover:text-white"
                >
                  Pozrieť realizácie
                </Link>
              </div>
            </div>

            <div
              data-reveal
              style={{ "--reveal-delay": "560ms" }}
              className="panel max-w-xl justify-self-end bg-[rgba(255,255,255,0.14)] p-6 text-white shadow-[0_24px_70px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:p-8"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/60">
                Kompletné riešenie bývania
              </p>
              <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
                Stavba, energie, prenájom techniky aj financovanie.
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[24px] border border-white/12 bg-white/8 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-white/58">Oblasť pôsobenia</p>
                  <p className="mt-2 text-sm leading-7 text-white/78">
                    Považská Bystrica, Púchov, Bytča, Žilina a okolie, v prípade potreby celá SR a ČR
                  </p>
                </div>
                <div className="rounded-[24px] border border-white/12 bg-white/8 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-white/58">Naša činnosť</p>
                  <p className="mt-2 text-sm leading-7 text-white/78">
                    Domy na kľúč, rekonštrukcie, zelená energia a technika
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
