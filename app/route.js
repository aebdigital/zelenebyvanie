import { serveMirrorPage } from "../lib/serve-mirror";

export async function GET() {
  return serveMirrorPage("/");
}
