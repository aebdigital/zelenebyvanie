export function SectionHeading({ eyebrow, title, description, align = "left", delay = 0 }) {
  const alignment = align === "center" ? "mx-auto text-center" : "";

  return (
    <div
      data-reveal
      style={{ "--reveal-delay": `${delay}ms` }}
      className={`max-w-4xl space-y-4 ${alignment}`}
    >
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="text-4xl sm:text-5xl">{title}</h2>
      {description ? <p className="text-base leading-7 text-[color:var(--muted)]">{description}</p> : null}
    </div>
  );
}
