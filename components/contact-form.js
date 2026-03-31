"use client";

import { useState } from "react";

import { siteConfig } from "../lib/site-data";

const initialState = {
  status: "idle",
  message: ""
};

export function ContactForm() {
  const [formState, setFormState] = useState(initialState);

  async function handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setFormState({
      status: "loading",
      message: "Odosielame vašu správu, chvíľu strpenia."
    });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          message: formData.get("message"),
          website: formData.get("website")
        })
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || "Správu sa nepodarilo odoslať.");
      }

      form.reset();
      setFormState({
        status: "success",
        message:
          payload.message || "Ďakujeme, správu sme prijali a čoskoro sa vám ozveme."
      });
    } catch (error) {
      setFormState({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Nastala chyba pri odosielaní formulára. Skúste to prosím znova."
      });
    }
  }

  const isLoading = formState.status === "loading";

  return (
    <form
      onSubmit={handleSubmit}
      data-reveal
      style={{ "--reveal-delay": "120ms" }}
      className="panel space-y-5 p-6 sm:p-8"
      noValidate
    >
      <div className="space-y-2">
        <p className="eyebrow">Formulár</p>
        <h2 className="text-3xl">Napíšte nám stručne, čo potrebujete.</h2>
        <p className="text-sm leading-7 text-[color:var(--muted)]">
          Správa príde priamo do našej schránky na {siteConfig.email}.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-medium">
          <span>Meno</span>
          <input
            required
            name="name"
            autoComplete="name"
            className="w-full border border-[color:var(--line)] bg-white px-4 py-3 outline-none focus:border-[color:var(--forest)]"
          />
        </label>
        <label className="space-y-2 text-sm font-medium">
          <span>E-mail</span>
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            className="w-full border border-[color:var(--line)] bg-white px-4 py-3 outline-none focus:border-[color:var(--forest)]"
          />
        </label>
      </div>

      <label className="space-y-2 text-sm font-medium">
        <span>Telefón</span>
        <input
          name="phone"
          autoComplete="tel"
          className="w-full border border-[color:var(--line)] bg-white px-4 py-3 outline-none focus:border-[color:var(--forest)]"
        />
      </label>

      <label className="hidden" aria-hidden="true">
        <span>Website</span>
        <input tabIndex={-1} autoComplete="off" name="website" />
      </label>

      <label className="space-y-2 text-sm font-medium">
        <span>Správa</span>
        <textarea
          required
          name="message"
          rows={6}
          className="w-full border border-[color:var(--line)] bg-white px-4 py-3 outline-none focus:border-[color:var(--forest)]"
        />
      </label>

      <button type="submit" className="button-primary min-h-14 px-7" disabled={isLoading}>
        {isLoading ? "Odosielame..." : "Odoslať správu"}
      </button>

      {formState.message ? (
        <p
          className={
            formState.status === "error"
              ? "text-sm text-red-700"
              : "text-sm text-[color:var(--forest)]"
          }
        >
          {formState.message}
        </p>
      ) : null}
    </form>
  );
}
