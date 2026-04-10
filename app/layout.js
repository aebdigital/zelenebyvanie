import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/700.css";

import { CookiesBanner } from "../components/cookies-banner";
import { RevealObserver } from "../components/reveal-observer";
import { SeoSchema } from "../components/seo-schema";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { SmoothScroll } from "../components/smooth-scroll";
import { siteConfig } from "../lib/site-data";
import "./globals.css";

export const metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: siteConfig.keywords,
  authors: [{ name: "AEB Digital", url: "https://aebdigital.sk" }],
  creator: "AEB Digital",
  publisher: siteConfig.legalName,
  category: "construction",
  alternates: {
    canonical: siteConfig.siteUrl
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    url: siteConfig.siteUrl,
    type: "website",
    locale: siteConfig.locale,
    images: [{ url: siteConfig.defaultOgImage }]
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.defaultOgImage]
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  appleWebApp: {
    capable: true,
    title: siteConfig.name,
    statusBarStyle: "default"
  },
  other: {
    "geo.region": "SK-TC",
    "geo.placename": `${siteConfig.addressLocality}, Slovensko`,
    "geo.position": `${siteConfig.coordinates.latitude};${siteConfig.coordinates.longitude}`,
    ICBM: `${siteConfig.coordinates.latitude}, ${siteConfig.coordinates.longitude}`
  }
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#102319"
};

export default function RootLayout({ children }) {
  return (
    <html lang="sk">
      <body>
        <SeoSchema />
        <SmoothScroll />
        <RevealObserver />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <CookiesBanner />
      </body>
    </html>
  );
}
