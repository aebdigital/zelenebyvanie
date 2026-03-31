import { RentalCard } from "../../components/rental-card";
import { SectionHeading } from "../../components/section-heading";
import { createMetadata, rentals } from "../../lib/site-data";

export const metadata = createMetadata({
  title: "Požičiavame",
  description: "Prenájom prívesného vozíka, vibračnej dosky, vrtáka, lešenia, minibágra a náradia.",
  path: "/poziciavame",
  image: "/site/rentals/trailer-main.jpg"
});

export default function RentalsPage() {
  return (
    <div className="shell space-y-10 py-10">
      <section className="panel px-6 py-10 sm:px-8 sm:py-12 lg:px-12">
        <SectionHeading
          delay={0}
          eyebrow="Požičiavame"
          title="Technika pripravená na stavbu, výkop, prepravu aj údržbu."
          description="Vyberte si vybavenie, ktoré potrebujete na deň, víkend alebo dlhší prenájom. Ak si nie ste istí vhodným strojom, poradíme."
        />
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {rentals.map((rental, index) => (
          <RentalCard key={rental.slug} rental={rental} delay={120 + index * 70} />
        ))}
      </section>
    </div>
  );
}
