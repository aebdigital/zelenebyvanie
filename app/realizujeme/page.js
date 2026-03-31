import { RealizationsGallery } from "../../components/realizations-gallery";
import { SectionHeading } from "../../components/section-heading";
import { realizationGalleries } from "../../lib/realizations-data";
import { createMetadata } from "../../lib/site-data";

export const metadata = createMetadata({
  title: "Realizujeme",
  description: "Prehľad realizovaných a pripravovaných projektov ZelenéhoBývania.",
  path: "/realizujeme",
  image: "/site/projects/marsova-cover.jpg"
});

export default function RealizationsPage() {
  return (
    <div className="shell space-y-12 py-10">
      <section className="panel px-6 py-10 sm:px-8 sm:py-12 lg:px-12">
        <SectionHeading
          delay={0}
          eyebrow="Naše realizácie"
          title="Kompletné portfólio realizácií s reálnymi fotografiami z výstavby, rekonštrukcií aj vizualizácií."
          description="Každý projekt má vlastnú galériu a pri fotkách sa na hover zobrazí pôvodný text z live stránky."
        />
      </section>

      <RealizationsGallery galleries={realizationGalleries} />
    </div>
  );
}
