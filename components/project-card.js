import Image from "next/image";
import Link from "next/link";

export function ProjectCard({ project, delay = 0 }) {
  return (
    <div
      data-reveal
      style={{ "--reveal-delay": `${delay}ms` }}
    >
      <Link
        href="/realizujeme"
        className="group block overflow-hidden"
      >
        <div className="panel overflow-hidden transition-transform duration-500 ease-out will-change-transform group-hover:scale-[1.03]">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 text-white">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">
                  {project.phase}
                </p>
                <h3 className="mt-2 text-3xl">{project.title}</h3>
              </div>
              <span className="border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]">
                {project.location}
              </span>
            </div>
          </div>

          <div className="space-y-5 p-6">
            <p className="leading-7 text-[color:var(--muted)]">{project.summary}</p>
            <ul className="space-y-3 text-sm text-[color:var(--ink)]">
              {project.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 bg-[color:var(--gold)]" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Link>
    </div>
  );
}
