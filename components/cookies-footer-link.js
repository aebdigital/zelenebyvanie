"use client";

export function CookiesFooterLink() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("openCookieSettings"))}
      className="hover:text-white"
    >
      Cookies
    </button>
  );
}
