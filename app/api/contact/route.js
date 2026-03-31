import { NextResponse } from "next/server";

import { siteConfig } from "../../../lib/site-data";

const SMTP2GO_ENDPOINT = "https://api.smtp2go.com/v3/email/send";

function sanitizeText(value, maxLength) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(request) {
  const apiKey = process.env.SMTP2GO_API_KEY;
  const sender = process.env.SMTP2GO_SENDER;
  const recipient = process.env.CONTACT_FORM_RECIPIENT;

  if (!apiKey || !sender || !recipient) {
    return NextResponse.json(
      { error: "Kontakt formulár nie je správne nakonfigurovaný." },
      { status: 500 }
    );
  }

  let payload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Neplatné dáta formulára." }, { status: 400 });
  }

  if (payload.website) {
    return NextResponse.json({ message: "Správa bola prijatá." }, { status: 200 });
  }

  const name = sanitizeText(payload.name, 120);
  const email = sanitizeText(payload.email, 160);
  const phone = sanitizeText(payload.phone, 60);
  const message = String(payload.message || "").trim().slice(0, 5000);

  if (name.length < 2) {
    return NextResponse.json({ error: "Prosím doplňte meno." }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Prosím zadajte platný e-mail." }, { status: 400 });
  }

  if (message.length < 10) {
    return NextResponse.json(
      { error: "Správa je príliš krátka. Napíšte nám aspoň pár viet." },
      { status: 400 }
    );
  }

  const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone || "Neuvedené");

  const smtpPayload = {
    api_key: apiKey,
    to: [recipient],
    sender,
    reply_to: email,
    subject: `Dopyt z webu | ${name}`,
    text_body: [
      `Meno: ${name}`,
      `E-mail: ${email}`,
      `Telefón: ${phone || "Neuvedené"}`,
      "",
      "Správa:",
      message
    ].join("\n"),
    html_body: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#1f2937">
        <h2 style="margin:0 0 16px">Nový dopyt zo zelenebyvanie.sk</h2>
        <p><strong>Meno:</strong> ${safeName}</p>
        <p><strong>E-mail:</strong> ${safeEmail}</p>
        <p><strong>Telefón:</strong> ${safePhone}</p>
        <p><strong>Web:</strong> <a href="${siteConfig.siteUrl}">${siteConfig.siteUrl}</a></p>
        <hr style="margin:24px 0;border:none;border-top:1px solid #d1d5db" />
        <p><strong>Správa:</strong></p>
        <p>${safeMessage}</p>
      </div>
    `
  };

  try {
    const response = await fetch(SMTP2GO_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(smtpPayload),
      cache: "no-store"
    });

    const result = await response.json().catch(() => null);
    const failedCount = Number(result?.data?.failed || 0);

    if (!response.ok || result?.error_code || failedCount > 0) {
      return NextResponse.json(
        {
          error:
            result?.data?.error ||
            result?.error ||
            "Správu sa nepodarilo odoslať. Skúste to prosím znova."
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      message: "Ďakujeme, správu sme úspešne odoslali a čoskoro sa vám ozveme."
    });
  } catch {
    return NextResponse.json(
      { error: "Nepodarilo sa spojiť s e-mailovou službou. Skúste to prosím znova." },
      { status: 502 }
    );
  }
}
