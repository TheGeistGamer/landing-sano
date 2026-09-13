import { useEffect, useState } from 'react';

interface NavLink {
  href: string;
  label: string;
}

// Menú desplegable para móvil (isla de React, se hidrata solo en pantallas chicas).
export default function MobileMenu({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="grid size-10 place-items-center rounded-full border border-line bg-card text-ink shadow-soft-sm focus-visible:outline-3 focus-visible:outline-brand-100"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
          {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>

      {open && (
        <div className="absolute inset-x-0 top-17 border-b border-line2 bg-bg px-6 pb-6 pt-2 shadow-soft">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-line2 py-3.5 font-display text-base font-semibold text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="/#descarga" onClick={() => setOpen(false)} className="btn btn-p mt-5 w-full justify-center">
            Descargar gratis
          </a>
        </div>
      )}
    </div>
  );
}
