"use client";

import { useMemo, useState } from "react";

import { Lightbox } from "./lightbox";

export function RealizationsGallery({ galleries }) {
  const lightboxItems = useMemo(
    () =>
      galleries.flatMap((gallery) =>
        gallery.photos.map((photo) => ({
          ...photo,
          galleryTitle: gallery.title
        }))
      ),
    [galleries]
  );

  const [activeIndex, setActiveIndex] = useState(null);

  const openLightbox = (photoSrc) => {
    const nextIndex = lightboxItems.findIndex(
      (item) => (item.remoteSrc || item.src) === photoSrc
    );

    if (nextIndex >= 0) {
      setActiveIndex(nextIndex);
    }
  };

  const closeLightbox = () => setActiveIndex(null);
  const goNext = () =>
    setActiveIndex((current) =>
      current === null ? null : (current + 1) % lightboxItems.length
    );
  const goPrevious = () =>
    setActiveIndex((current) =>
      current === null ? null : (current - 1 + lightboxItems.length) % lightboxItems.length
    );

  return (
    <>
      {galleries.map((gallery, galleryIndex) => (
        <section key={gallery.slug} className="space-y-6">
          <div
            data-reveal
            style={{ "--reveal-delay": `${galleryIndex * 40}ms` }}
            className="border-b border-[color:var(--line)] pb-4"
          >
            <h2 className="text-4xl sm:text-5xl">{gallery.title}</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {gallery.photos.map((photo, photoIndex) => (
              <button
                key={`${gallery.slug}-${photoIndex}-${photo.remoteSrc || photo.src}`}
                type="button"
                onClick={() => openLightbox(photo.remoteSrc || photo.src)}
                data-reveal
                style={{ "--reveal-delay": `${120 + photoIndex * 45}ms` }}
                className="group relative block cursor-pointer overflow-hidden text-left"
              >
                <div className="relative aspect-[4/3] min-h-[220px]">
                  <img
                    src={photo.remoteSrc || photo.src}
                    alt={photo.caption || gallery.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/30 to-transparent opacity-90 transition duration-300 md:opacity-0 md:group-hover:opacity-100" />
                  {photo.caption ? (
                    <div className="absolute inset-0 flex items-center justify-center p-5 text-center text-sm font-medium leading-7 text-white opacity-100 transition duration-300 md:opacity-0 md:group-hover:opacity-100">
                      <p>{photo.caption}</p>
                    </div>
                  ) : null}
                </div>
              </button>
            ))}
          </div>
        </section>
      ))}

      {activeIndex !== null ? (
        <Lightbox
          items={lightboxItems}
          currentIndex={activeIndex}
          onClose={closeLightbox}
          onNext={goNext}
          onPrevious={goPrevious}
        />
      ) : null}
    </>
  );
}
