"use client";

import Image from "next/image";
import { useState } from "react";

import { Lightbox } from "./lightbox";

export function RentalGallery({ gallery, title }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const lightboxItems = gallery.map((src) => ({ src, remoteSrc: src }));

  function openLightbox(src) {
    const index = lightboxItems.findIndex((item) => item.src === src);
    if (index >= 0) setActiveIndex(index);
  }

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {gallery.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => openLightbox(image)}
            data-reveal
            style={{ "--reveal-delay": `${220 + index * 40}ms` }}
            className="group relative block cursor-pointer overflow-hidden text-left"
            aria-label={`Zobraziť fotografiu ${index + 1}`}
          >
            <div className="relative aspect-[4/3] min-h-[200px]">
              <Image
                src={image}
                alt={`${title} ${index + 1}`}
                fill
                className="object-cover transition duration-500 group-hover:scale-[1.04]"
                sizes="(max-width: 640px) 95vw, (max-width: 1280px) 28vw, 18vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100">
                <span className="border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
                  Zväčšiť
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {activeIndex !== null ? (
        <Lightbox
          items={lightboxItems}
          currentIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
          onNext={() => setActiveIndex((i) => (i + 1) % lightboxItems.length)}
          onPrevious={() => setActiveIndex((i) => (i - 1 + lightboxItems.length) % lightboxItems.length)}
        />
      ) : null}
    </>
  );
}
