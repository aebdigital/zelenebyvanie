import { rentals, siteConfig } from "../lib/site-data";

const staticRoutes = [
  "",
  "/realizujeme",
  "/zelena-energia",
  "/poziciavame",
  "/financovanie",
  "/kontakt",
  "/ochrana-osobnych-udajov"
];

export default function sitemap() {
  return [
    ...staticRoutes.map((route) => ({
      url: `${siteConfig.siteUrl}${route || "/"}`,
      lastModified: new Date(),
      changeFrequency: route === "" ? "weekly" : "monthly",
      priority: route === "" ? 1 : 0.8
    })),
    ...rentals.map((rental) => ({
      url: `${siteConfig.siteUrl}/${rental.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7
    }))
  ];
}
