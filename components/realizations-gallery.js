"use client";

import { useEffect, useMemo, useState } from "react";

function Lightbox({ items, currentIndex, onClose, onNext, onPrevious }) {
  const [isVisible, setIsVisible] = useState(false);
  const [displayIndex, setDisplayIndex] = useState(currentIndex);
  const [direction, setDirection] = useState("next");
  const current = items[displayIndex];

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setIsVisible(true);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    if (currentIndex === displayIndex) {
      return undefined;
    }

    setDirection(currentIndex > displayIndex ? "next" : "prev");
    setDisplayIndex(currentIndex);

    return undefined;
  }, [currentIndex, displayIndex]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsVisible(false);
        window.setTimeout(onClose, 220);
      }

      if (event.key === "ArrowRight") {
        onNext();
      }

      if (event.key === "ArrowLeft") {
        onPrevious();
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, onNext, onPrevious]);

  if (!current) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-[120] flex items-center justify-center px-4 py-6 transition-opacity duration-300 ${
        isVisible ? "bg-[rgba(6,16,12,0.92)] opacity-100" : "bg-[rgba(6,16,12,0)] opacity-0"
      }`}
      onClick={() => {
        setIsVisible(false);
        window.setTimeout(onClose, 220);
      }}
    >
      <button
        type="button"
        onClick={() => {
          setIsVisible(false);
          window.setTimeout(onClose, 220);
        }}
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center border border-white/16 bg-white/10 text-2xl leading-none text-white transition-transform duration-300 hover:-translate-y-0.5"
        aria-label="Zavrieť galériu"
      >
        ×
      </button>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onPrevious();
        }}
        className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/16 bg-white/10 text-3xl leading-none text-white"
        aria-label="Predchádzajúca fotografia"
      >
        ‹
      </button>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onNext();
        }}
        className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/16 bg-white/10 text-3xl leading-none text-white"
        aria-label="Ďalšia fotografia"
      >
        ›
      </button>

      <div
        className={`mx-auto flex max-h-full w-full max-w-6xl flex-col gap-4 transition duration-300 ${
          isVisible ? "translate-y-0 scale-100 opacity-100" : "translate-y-5 scale-[0.985] opacity-0"
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        <div
          key={`${displayIndex}-${direction}`}
          className={`lightbox-media relative overflow-hidden bg-black/20 ${
            direction === "prev" ? "lightbox-media-prev" : "lightbox-media-next"
          }`}
        >
          <img
            src={current.remoteSrc || current.src}
            alt={current.caption || current.galleryTitle}
            className="max-h-[78vh] w-full object-contain"
          />
        </div>

        {(current.caption || current.galleryTitle) ? (
          <div className="mx-auto w-full max-w-4xl border border-white/10 bg-white/10 px-5 py-4 text-center text-sm leading-7 text-white/88 backdrop-blur-sm">
            <p className="font-semibold text-white">{current.galleryTitle}</p>
            {current.caption ? <p className="mt-2">{current.caption}</p> : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

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
