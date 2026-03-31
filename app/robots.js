import { siteConfig } from "../lib/site-data";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    host: siteConfig.siteUrl,
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`
  };
}
