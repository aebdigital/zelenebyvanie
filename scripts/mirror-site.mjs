import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const SITE_URL = "https://www.zelenebyvanie.sk";
const SITE_HOSTS = new Set(["www.zelenebyvanie.sk", "zelenebyvanie.sk"]);
const PAGE_DIR = path.join(process.cwd(), "mirror-pages");
const PUBLIC_DIR = path.join(process.cwd(), "public");
const XML_SITEMAPS = [
  "/sitemap.xml",
  "/page-sitemap.xml",
  "/post-sitemap.xml",
  "/bricks_template-sitemap.xml",
  "/category-sitemap.xml"
];
const EXTRA_ROUTE_URLS = [
  "/feed/",
  "/comments/feed/",
  "/category/uncategorized/feed/",
  "/hello-world/feed/"
];
const STATIC_URLS = [
  "/robots.txt",
  "/sitemap.rss",
  "/default-sitemap.xsl?sitemap=root",
  "/default-sitemap.xsl?sitemap=page",
  "/default-sitemap.xsl?sitemap=post",
  "/default-sitemap.xsl?sitemap=bricks_template",
  "/default-sitemap.xsl?sitemap=category"
];
const ASSET_EXTENSIONS = new Set([
  ".avif",
  ".css",
  ".eot",
  ".gif",
  ".ico",
  ".jpeg",
  ".jpg",
  ".js",
  ".json",
  ".map",
  ".mp4",
  ".otf",
  ".pdf",
  ".png",
  ".rss",
  ".svg",
  ".ttf",
  ".txt",
  ".webm",
  ".webp",
  ".woff",
  ".woff2",
  ".xml"
]);

function ensureTrailingSlashForPages(pathname) {
  if (pathname === "/") {
    return pathname;
  }

  const extension = path.posix.extname(pathname);
  if (extension) {
    return pathname;
  }

  return pathname.endsWith("/") ? pathname : `${pathname}/`;
}

function isInternalUrl(url) {
  return SITE_HOSTS.has(url.hostname);
}

function isPagePath(pathname) {
  if (!pathname || pathname === "/") {
    return true;
  }

  if (
    pathname.startsWith("/wp-content/") ||
    pathname.startsWith("/wp-includes/") ||
    pathname.startsWith("/wp-admin/")
  ) {
    return false;
  }

  return path.posix.extname(pathname) === "";
}

function extractLocs(xml) {
  return [...xml.matchAll(/<loc><!\[CDATA\[(.*?)\]\]><\/loc>/g)].map(
    (match) => match[1]
  );
}

function normalizeUrl(rawUrl, baseUrl = SITE_URL) {
  if (!rawUrl) {
    return null;
  }

  const trimmed = rawUrl.trim().replace(/^['"]|['"]$/g, "");

  if (
    !trimmed ||
    trimmed.startsWith("#") ||
    trimmed.startsWith("mailto:") ||
    trimmed.startsWith("tel:") ||
    trimmed.startsWith("javascript:")
  ) {
    return null;
  }

  try {
    const url = new URL(trimmed, baseUrl);
    return isInternalUrl(url) ? url : null;
  } catch {
    return null;
  }
}

function extractUrlsFromSrcset(value, baseUrl) {
  return value
    .split(",")
    .map((entry) => entry.trim().split(/\s+/)[0])
    .map((entry) => normalizeUrl(entry, baseUrl))
    .filter(Boolean);
}

function extractInternalUrls(content, baseUrl) {
  const discovered = new Map();
  const add = (url) => {
    if (!url) {
      return;
    }

    discovered.set(url.toString(), url);
  };

  for (const match of content.matchAll(
    /\b(?:href|src|poster|data-src|data-pswp-src|content)=["']([^"']+)["']/gi
  )) {
    add(normalizeUrl(match[1], baseUrl));
  }

  for (const match of content.matchAll(
    /\b(?:srcset|data-srcset)=["']([^"']+)["']/gi
  )) {
    for (const url of extractUrlsFromSrcset(match[1], baseUrl)) {
      add(url);
    }
  }

  for (const match of content.matchAll(/url\(([^)]+)\)/gi)) {
    add(normalizeUrl(match[1], baseUrl));
  }

  for (const match of content.matchAll(
    /https?:\/\/(?:www\.)?zelenebyvanie\.sk[^\s"'<>)]*/gi
  )) {
    add(normalizeUrl(match[0], baseUrl));
  }

  return [...discovered.values()];
}

function rewriteInternalLinks(html) {
  return html.replace(
    /https?:\/\/(?:www\.)?zelenebyvanie\.sk(?:(\/[^\s"'<>)]*)?)?/gi,
    (_match, suffix = "") => suffix || "/"
  );
}

function pageFilePath(url) {
  if (url.pathname === "/") {
    return path.join(PAGE_DIR, "index.html");
  }

  const relativePath = ensureTrailingSlashForPages(url.pathname)
    .replace(/^\/+/, "")
    .replace(/\/$/, "");

  return path.join(PAGE_DIR, relativePath, "index.html");
}

function routeFilePath(url, extension = ".html") {
  if (url.pathname === "/") {
    return path.join(PAGE_DIR, `index${extension}`);
  }

  const relativePath = ensureTrailingSlashForPages(url.pathname)
    .replace(/^\/+/, "")
    .replace(/\/$/, "");

  return path.join(PAGE_DIR, relativePath, `index${extension}`);
}

function publicFilePath(url) {
  const rawPath = decodeURIComponent(url.pathname).replace(/^\/+/, "");
  return path.join(PUBLIC_DIR, rawPath);
}

async function ensureParentDir(filePath) {
  await mkdir(path.dirname(filePath), { recursive: true });
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      "user-agent": "Mozilla/5.0 (compatible; Codex Mirror Bot/1.0)"
    }
  });

  if (!response.ok) {
    throw new Error(`Request failed for ${url}: ${response.status}`);
  }

  return response.text();
}

async function fetchBinary(url) {
  const response = await fetch(url, {
    headers: {
      "user-agent": "Mozilla/5.0 (compatible; Codex Mirror Bot/1.0)"
    }
  });

  if (!response.ok) {
    throw new Error(`Request failed for ${url}: ${response.status}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  const contentType = response.headers.get("content-type") || "";
  return { buffer, contentType };
}

function isSkippableAssetError(error) {
  return /Request failed for .*: 404/.test(String(error));
}

async function savePage(url, html) {
  const filePath = pageFilePath(url);
  await ensureParentDir(filePath);
  await writeFile(filePath, html, "utf8");
}

function routeExtensionForContentType(contentType) {
  if (contentType.includes("xml") || contentType.includes("rss")) {
    return ".xml";
  }

  if (contentType.includes("text/plain")) {
    return ".txt";
  }

  return ".html";
}

async function saveExtraRoute(url, body, contentType) {
  const filePath = routeFilePath(url, routeExtensionForContentType(contentType));
  await ensureParentDir(filePath);
  await writeFile(filePath, body, "utf8");
}

async function saveAsset(url, buffer) {
  const filePath = publicFilePath(url);
  await ensureParentDir(filePath);
  await writeFile(filePath, buffer);
}

async function cleanMirrorOutput() {
  await rm(PAGE_DIR, { recursive: true, force: true });
  await rm(PUBLIC_DIR, { recursive: true, force: true });
  await mkdir(PAGE_DIR, { recursive: true });
  await mkdir(PUBLIC_DIR, { recursive: true });
}

async function collectPageUrls() {
  const sitemapIndex = await fetchText(`${SITE_URL}/sitemap.xml`);
  const sitemapUrls = [...new Set(extractLocs(sitemapIndex))];
  const pageUrls = new Map();

  for (const sitemapUrl of sitemapUrls) {
    const xml = await fetchText(sitemapUrl);

    for (const loc of extractLocs(xml)) {
      const url = new URL(loc);
      pageUrls.set(ensureTrailingSlashForPages(url.pathname), url);
    }
  }

  return [...pageUrls.values()];
}

async function main() {
  await cleanMirrorOutput();

  const pageUrls = await collectPageUrls();
  const pagePaths = new Set(pageUrls.map((url) => ensureTrailingSlashForPages(url.pathname)));
  const assetQueue = [];
  const queuedAssets = new Set();

  const enqueueAsset = (url) => {
    if (!url) {
      return;
    }

    const extension = path.posix.extname(url.pathname).toLowerCase();
    const looksLikeAsset =
      ASSET_EXTENSIONS.has(extension) ||
      url.pathname.startsWith("/wp-content/") ||
      url.pathname.startsWith("/wp-includes/") ||
      url.pathname.startsWith("/wp-admin/");

    if (!looksLikeAsset) {
      return;
    }

    const key = url.toString();
    if (queuedAssets.has(key)) {
      return;
    }

    queuedAssets.add(key);
    assetQueue.push(url);
  };

  for (const relativeUrl of [...XML_SITEMAPS, ...STATIC_URLS]) {
    enqueueAsset(new URL(relativeUrl, SITE_URL));
  }

  for (const pageUrl of pageUrls) {
    const originalHtml = await fetchText(pageUrl);

    for (const discoveredUrl of extractInternalUrls(originalHtml, pageUrl)) {
      const normalizedPath = ensureTrailingSlashForPages(discoveredUrl.pathname);
      if (pagePaths.has(normalizedPath) && isPagePath(discoveredUrl.pathname)) {
        continue;
      }

      enqueueAsset(discoveredUrl);
    }

    const rewrittenHtml = rewriteInternalLinks(originalHtml);
    await savePage(pageUrl, rewrittenHtml);
  }

  for (const relativeUrl of EXTRA_ROUTE_URLS) {
    const url = new URL(relativeUrl, SITE_URL);
    const response = await fetch(url, {
      headers: {
        "user-agent": "Mozilla/5.0 (compatible; Codex Mirror Bot/1.0)"
      }
    });

    if (!response.ok) {
      throw new Error(`Request failed for ${url}: ${response.status}`);
    }

    const contentType = response.headers.get("content-type") || "text/html";
    const body = rewriteInternalLinks(await response.text());
    await saveExtraRoute(url, body, contentType);

    for (const discoveredUrl of extractInternalUrls(body, url)) {
      const normalizedPath = ensureTrailingSlashForPages(discoveredUrl.pathname);
      if (pagePaths.has(normalizedPath) && isPagePath(discoveredUrl.pathname)) {
        continue;
      }

      enqueueAsset(discoveredUrl);
    }
  }

  while (assetQueue.length > 0) {
    const assetUrl = assetQueue.shift();
    let asset;

    try {
      asset = await fetchBinary(assetUrl);
    } catch (error) {
      if (isSkippableAssetError(error)) {
        console.warn(`Skipping missing asset: ${assetUrl}`);
        continue;
      }

      throw error;
    }

    const { buffer, contentType } = asset;
    await saveAsset(assetUrl, buffer);

    if (
      contentType.includes("text/css") ||
      assetUrl.pathname.endsWith(".css") ||
      assetUrl.pathname.endsWith(".xml") ||
      assetUrl.pathname.endsWith(".xsl") ||
      assetUrl.pathname.endsWith(".rss") ||
      assetUrl.pathname.endsWith(".txt")
    ) {
      const text = buffer.toString("utf8");

      for (const nestedUrl of extractInternalUrls(text, assetUrl)) {
        const normalizedPath = ensureTrailingSlashForPages(nestedUrl.pathname);
        if (pagePaths.has(normalizedPath) && isPagePath(nestedUrl.pathname)) {
          continue;
        }

        enqueueAsset(nestedUrl);
      }
    }
  }

  const homePage = await readFile(path.join(PAGE_DIR, "index.html"), "utf8");
  const hasMirror = /wp-content/.test(homePage);

  if (!hasMirror) {
    throw new Error("Mirror output looks incomplete.");
  }

  console.log(`Mirrored ${pageUrls.length} pages into ${PAGE_DIR}`);
  console.log(`Downloaded ${queuedAssets.size} static assets into ${PUBLIC_DIR}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
