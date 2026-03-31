import { siteConfig } from "../lib/site-data";

function jsonLd(data) {
  return JSON.stringify(data);
}

export function SeoSchema() {
  const organizationId = `${siteConfig.siteUrl}#organization`;
  const websiteId = `${siteConfig.siteUrl}#website`;
  const localBusinessId = `${siteConfig.siteUrl}#localbusiness`;

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId,
    name: siteConfig.legalName,
    alternateName: siteConfig.name,
    url: siteConfig.siteUrl,
    logo: `${siteConfig.siteUrl}/site/brand/logo.png`,
    email: siteConfig.email,
    telephone: siteConfig.phoneDisplay,
    sameAs: siteConfig.socials.map((social) => social.href)
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    url: siteConfig.siteUrl,
    name: siteConfig.name,
    description: siteConfig.description,
    inLanguage: "sk-SK",
    publisher: {
      "@id": organizationId
    }
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": localBusinessId,
    name: siteConfig.name,
    url: siteConfig.siteUrl,
    image: `${siteConfig.siteUrl}/site/home/hero-marsova.jpg`,
    email: siteConfig.email,
    telephone: siteConfig.phoneDisplay,
    areaServed: siteConfig.serviceAreas,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.streetAddress,
      addressLocality: siteConfig.addressLocality,
      postalCode: siteConfig.postalCode,
      addressCountry: siteConfig.addressCountry
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.coordinates.latitude,
      longitude: siteConfig.coordinates.longitude
    },
    makesOffer: siteConfig.services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service
      }
    })),
    sameAs: siteConfig.socials.map((social) => social.href),
    parentOrganization: {
      "@id": organizationId
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(localBusinessSchema) }}
      />
    </>
  );
}
