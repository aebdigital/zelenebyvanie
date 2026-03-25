import { serveMirrorPage } from "../../lib/serve-mirror";

export async function GET(_request, { params }) {
  const { slug = [] } = await params;
  const pathname = `/${slug.join("/")}/`;

  return serveMirrorPage(pathname);
}
