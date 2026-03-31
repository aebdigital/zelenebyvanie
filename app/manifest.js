import { siteConfig } from "../lib/site-data";

export default function manifest() {
  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f5efe4",
    theme_color: "#102319",
    lang: "sk-SK",
    icons: [
      {
        src: "/site/brand/logo.png",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  };
}
