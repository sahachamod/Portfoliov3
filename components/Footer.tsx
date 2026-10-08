import { identity, socials } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="section-shell flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-semibold text-white">{identity.name}</p>
          <p className="mt-1 text-sm text-slate-400">{identity.headline}</p>
          <p className="mt-1 font-mono text-xs uppercase tracking-[0.16em] text-slate-500">
            {identity.location}
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-slate-300">
          {socials.map((link) => (
            <a key={link.label} href={link.href} target={link.external ? "_blank" : undefined} rel={link.external ? "noreferrer" : undefined} className="transition hover:text-accent">
              {link.label}
            </a>
          ))}
        </div>
        <p className="text-sm text-slate-500">© {new Date().getFullYear()} {identity.name}</p>
      </div>
    </footer>
  );
}
