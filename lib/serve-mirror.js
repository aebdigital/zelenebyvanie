import { readFile } from "node:fs/promises";
import path from "node:path";

const MIRROR_ROOT = path.join(
  /*turbopackIgnore: true*/ process.cwd(),
  "mirror-pages"
);

function toMirrorFile(pathname) {
  const rootPath = pathname === "/" ? [] : pathname.split("/").filter(Boolean).map((segment) => decodeURIComponent(segment));

  const candidates = [
    path.join(MIRROR_ROOT, ...rootPath, "index.html"),
    path.join(MIRROR_ROOT, ...rootPath, "index.xml"),
    path.join(MIRROR_ROOT, ...rootPath, "index.txt")
  ];

  return candidates;
}

function contentTypeForFile(filePath) {
  if (filePath.endsWith(".xml")) {
    return "application/rss+xml; charset=utf-8";
  }

  if (filePath.endsWith(".txt")) {
    return "text/plain; charset=utf-8";
  }

  return "text/html; charset=utf-8";
}

async function readMirrorFile(pathname) {
  for (const filePath of toMirrorFile(pathname)) {
    try {
      const body = await readFile(filePath, "utf8");
      return { body, filePath };
    } catch (error) {
      if (!error || error.code !== "ENOENT") {
        throw error;
      }
    }
  }

  const missing = new Error(`Mirror route not found: ${pathname}`);
  missing.code = "ENOENT";
  throw missing;
}

export async function serveMirrorPage(pathname) {
  if (pathname === "/") {
    pathname = "/";
  }
  try {
    const { body, filePath } = await readMirrorFile(pathname);

    return new Response(body, {
      headers: {
        "content-type": contentTypeForFile(filePath),
        "cache-control": "public, max-age=0, must-revalidate"
      }
    });
  } catch (error) {
    if (error && error.code === "ENOENT") {
      return new Response("Not found", { status: 404 });
    }

    throw error;
  }
}
