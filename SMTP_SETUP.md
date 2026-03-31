# SMTP2GO setup

Nastavte tieto premenné prostredia pre produkciu aj preview:

- `CONTACT_FORM_RECIPIENT`
- `SMTP2GO_API_KEY`
- `SMTP2GO_SENDER`

Odporucena hodnota pre odosielatela:

```env
SMTP2GO_SENDER=ZeleneByvanie <noreply@zelenebyvanie.sk>
```

Ako to funguje:

1. Formular na `/kontakt` odosiela data na `POST /api/contact`
2. Next.js route `app/api/contact/route.js` data validuje
3. Server kontaktuje SMTP2GO API
4. Sprava sa odosle na `CONTACT_FORM_RECIPIENT`

Volitelne:

- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` pre Google Search Console

Poznamka:

- `SMTP2GO_SENDER` musi byt overena adresa alebo domena v SMTP2GO.
