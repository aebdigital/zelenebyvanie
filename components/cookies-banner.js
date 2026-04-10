"use client";

import { useEffect, useState } from "react";

function Toggle({ checked, onChange, disabled }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`relative inline-block h-6 w-11 shrink-0 overflow-hidden transition-colors duration-200 ${
        checked ? "bg-[color:var(--forest)]" : "bg-[color:var(--sage-deep)]"
      } ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 bg-white shadow-sm transition-transform duration-200 ${
          checked ? "translate-x-[22px]" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

const DEFAULT_PREFS = { analytics: false, marketing: false };

export function CookiesBanner() {
  const [bannerVisible, setBannerVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [prefs, setPrefs] = useState(DEFAULT_PREFS);

  useEffect(() => {
    const saved = localStorage.getItem("cookieConsent");
    if (!saved) {
      setBannerVisible(true);
    } else {
      try {
        const parsed = JSON.parse(saved);
        setPrefs({ analytics: !!parsed.analytics, marketing: !!parsed.marketing });
      } catch (_) {}
    }

    function handleOpen() {
      const current = localStorage.getItem("cookieConsent");
      if (current) {
        try {
          const parsed = JSON.parse(current);
          setPrefs({ analytics: !!parsed.analytics, marketing: !!parsed.marketing });
        } catch (_) {}
      }
      setShowSettings(true);
      setBannerVisible(true);
    }

    window.addEventListener("openCookieSettings", handleOpen);
    return () => window.removeEventListener("openCookieSettings", handleOpen);
  }, []);

  function acceptAll() {
    localStorage.setItem("cookieConsent", JSON.stringify({ necessary: true, analytics: true, marketing: true }));
    setBannerVisible(false);
    setShowSettings(false);
  }

  function decline() {
    localStorage.setItem("cookieConsent", JSON.stringify({ necessary: true, analytics: false, marketing: false }));
    setBannerVisible(false);
    setShowSettings(false);
  }

  function saveSettings() {
    localStorage.setItem("cookieConsent", JSON.stringify({ necessary: true, ...prefs }));
    setBannerVisible(false);
    setShowSettings(false);
  }

  if (!bannerVisible) return null;

  return (
    <>
      {showSettings && (
        <div
          className="fixed inset-0 z-[210] flex items-center justify-center bg-black/60 p-4"
          onClick={() => setShowSettings(false)}
        >
          <div
            className="w-full max-w-lg bg-white shadow-[0_32px_80px_rgba(13,44,34,0.22)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between bg-[color:var(--forest)] px-6 py-4">
              <h2 className="text-lg font-bold text-white">Nastavenia cookies</h2>
              <button
                type="button"
                onClick={() => setShowSettings(false)}
                className="flex h-8 w-8 items-center justify-center text-white/80 hover:text-white"
                aria-label="Zavrieť"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-0">
              <p className="text-sm leading-7 text-[color:var(--muted)]">
                Vyberte, ktoré kategórie cookies chcete povoliť. Nevyhnutné cookies sú vždy aktívne.
              </p>

              <div className="mt-5 divide-y divide-[color:var(--line)]">
                {[
                  {
                    key: "necessary",
                    label: "Nevyhnutné cookies",
                    desc: "Zabezpečujú základnú funkčnosť stránky. Bez nich stránka nemôže fungovať.",
                    value: true,
                    disabled: true
                  },
                  {
                    key: "analytics",
                    label: "Analytické cookies",
                    desc: "Pomáhajú nám pochopiť, ako návštevníci stránku používajú, a zlepšovať jej obsah.",
                    value: prefs.analytics,
                    disabled: false
                  },
                  {
                    key: "marketing",
                    label: "Marketingové cookies",
                    desc: "Umožňujú zobrazovanie relevantných reklám a sledovanie výkonnosti kampaní.",
                    value: prefs.marketing,
                    disabled: false
                  }
                ].map((item) => (
                  <div key={item.key} className="flex items-start justify-between gap-4 py-4">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-[color:var(--ink)]">{item.label}</p>
                      <p className="mt-1 text-xs leading-6 text-[color:var(--muted)]">{item.desc}</p>
                    </div>
                    <div className="mt-0.5">
                      <Toggle
                        checked={item.value}
                        disabled={item.disabled}
                        onChange={(val) => setPrefs((prev) => ({ ...prev, [item.key]: val }))}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-[color:var(--line)] p-6 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={saveSettings}
                className="button-secondary text-sm"
              >
                Uložiť nastavenia
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="button-primary text-sm"
              >
                Prijať všetky
              </button>
            </div>
          </div>
        </div>
      )}

      {!showSettings && (
        <div className="fixed bottom-0 left-0 right-0 z-[200] bg-[color:var(--forest)] shadow-[0_-8px_32px_rgba(13,44,34,0.22)]">
          <div className="shell flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-7 text-white">
              <span className="font-semibold">Na tejto stránke používame cookies.</span>{" "}
              Niektoré sú nevyhnutné pre fungovanie stránky, iné nám pomáhajú zlepšovať váš zážitok.
            </p>
            <div className="flex shrink-0 flex-wrap gap-2">
              <button
                type="button"
                onClick={acceptAll}
                className="inline-flex items-center justify-center bg-white px-4 py-2 text-sm font-semibold text-[color:var(--forest)] transition-colors hover:bg-white/90"
              >
                Prijať všetky
              </button>
              <button
                type="button"
                onClick={() => setShowSettings(true)}
                className="inline-flex items-center justify-center border border-white/40 bg-transparent px-4 py-2 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
              >
                Nastavenia
              </button>
              <button
                type="button"
                onClick={decline}
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white/70 transition-colors hover:text-white"
              >
                Odmietnuť
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
