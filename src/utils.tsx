import type { ReactNode } from 'react';

/** Asset URL that works both locally and under a GitHub Pages subpath. */
export const asset = (path: string) =>
  /^(data:|https?:)/.test(path) ? path : `${import.meta.env.BASE_URL}${path}`;

/** Placeholder values start with "[" and must never become live links. */
export const isPlaceholder = (value?: string) => !value || value.trim().startsWith('[');

export function SafeLink({ href, className, children }: { href?: string; className?: string; children: ReactNode }) {
  if (isPlaceholder(href)) return null;
  const external = /^https?:\/\//.test(href!);
  return (
    <a className={className} href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {children}
    </a>
  );
}

export function Section({
  id,
  title,
  eyebrow,
  children,
}: {
  id: string;
  title: string;
  eyebrow?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="section" aria-labelledby={`${id}-title`}>
      <div className="container">
        <header className="section-head">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h2 id={`${id}-title`}>{title}</h2>
        </header>
        {children}
      </div>
    </section>
  );
}

export function Tags({ items }: { items: string[] }) {
  return (
    <ul className="tags" aria-label="Technologies">
      {items.map((item) => (
        <li key={item} className="tag">
          {item}
        </li>
      ))}
    </ul>
  );
}
