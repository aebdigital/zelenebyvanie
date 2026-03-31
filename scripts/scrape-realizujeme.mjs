import fs from "node:fs";
import path from "node:path";

const outputDir = path.resolve("public/site/realizations");
const outputDataFile = path.resolve("lib/realizations-data.js");
const outputManifestFile = path.resolve("/tmp/realizujeme-downloads.tsv");
const htmlSnapshotFile = process.env.REALIZUJEME_HTML || "/tmp/realizujeme.html";

function stripTags(value) {
  return value
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#8220;|&#8221;/g, "\"")
    .replace(/&#8211;/g, "–")
    .replace(/&#8230;/g, "…")
    .replace(/\s+/g, " ")
    .trim();
}

function slugify(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

if (!fs.existsSync(htmlSnapshotFile)) {
  throw new Error(`Missing HTML snapshot at ${htmlSnapshotFile}`);
}

const html = fs.readFileSync(htmlSnapshotFile, "utf8");
const headings = [...html.matchAll(/<h2[^>]*>(.*?)<\/h2>/gs)]
  .map((match) => ({
    title: stripTags(match[1]),
    index: match.index ?? 0
  }))
  .filter((item) => item.title && !["Navigácia", "Adresa", "Kontakt"].includes(item.title));

const manifestLines = [];

const galleries = headings.map((heading, headingIndex) => {
  const end = headingIndex + 1 < headings.length ? headings[headingIndex + 1].index : html.length;
  const block = html.slice(heading.index, end);
  const photos = [...block.matchAll(/<a[^>]+href(?:="([^"]*)")?[^>]*class="[^"]*parent[^"]*"[^>]*>(.*?)<\/a>/gs)]
    .map((match, photoIndex) => {
      const source = (match[1] || "").trim();

      if (!source.startsWith("http")) {
        return null;
      }

      const captionMatch = match[2].match(/<p>(.*?)<\/p>/s);
      const caption = captionMatch ? stripTags(captionMatch[1]) : "";
      const cleanUrl = source.split("?")[0];
      const baseName = path.basename(cleanUrl);
      const prefixedName = `${String(photoIndex + 1).padStart(2, "0")}-${baseName}`;
      const slug = slugify(heading.title);
      const dir = path.join(outputDir, slug);
      const filePath = path.join(dir, prefixedName);

      fs.mkdirSync(dir, { recursive: true });
      manifestLines.push(`${source}\t${filePath}`);

      return {
        src: `/site/realizations/${slug}/${prefixedName}`,
        remoteSrc: source,
        caption
      };
    })
    .filter(Boolean);

  return {
    title: heading.title,
    slug: slugify(heading.title),
    photos
  };
});

const fileContents = `export const realizationGalleries = ${JSON.stringify(galleries, null, 2)};\n`;
fs.writeFileSync(outputDataFile, fileContents);
fs.writeFileSync(outputManifestFile, manifestLines.join("\n"));

console.log(`Saved ${galleries.length} galleries to ${outputDataFile}`);
console.log(`Prepared ${galleries.reduce((total, gallery) => total + gallery.photos.length, 0)} photo downloads in ${outputManifestFile}`);
