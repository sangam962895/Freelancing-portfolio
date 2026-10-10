import { useState, useEffect, useRef } from 'react';
import { profile } from '../data/portfolio';

export interface NavItem {
  id: string;
  label: string;
  children?: NavItem[];
}

const isDesktop = () => window.matchMedia('(min-width: 921px)').matches;

function NavDropdown({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  const [subOpen, setSubOpen] = useState(false);
  const menuId = `submenu-${item.id}`;
  const wrapRef = useRef<HTMLLIElement>(null);
  // True when the menu was opened by hover. A click on the arrow then keeps it open.
  const openedByHover = useRef(false);

  // Once open, the menu stays open (even when the cursor leaves). It closes only when the
  // arrow is clicked again, the user clicks outside, presses Escape, or focus leaves it.
  useEffect(() => {
    if (!subOpen) return;
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setSubOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [subOpen]);

  return (
    <li
      ref={wrapRef}
      className="nav-dropdown"
      onMouseEnter={() => {
        if (isDesktop() && !subOpen) {
          setSubOpen(true);
          openedByHover.current = true;
        }
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setSubOpen(false);
      }}
    >
      <div className="nav-dropdown-row">
        <a href={`#${item.id}`} onClick={onNavigate}>
          {item.label}
        </a>
        <button
          type="button"
          className="nav-dropdown-toggle"
          aria-expanded={subOpen}
          aria-controls={menuId}
          aria-label={`${subOpen ? 'Collapse' : 'Expand'} ${item.label} sections`}
          onClick={() => {
            if (openedByHover.current && subOpen) {
              openedByHover.current = false; // hover-opened menu: this click pins it open
              return;
            }
            openedByHover.current = false;
            setSubOpen((v) => !v);
          }}
          onKeyDown={(e) => e.key === 'Escape' && setSubOpen(false)}
        >
          <svg className="nav-chevron" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false">
            <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <ul id={menuId} className={`nav-dropdown-menu ${subOpen ? 'is-open' : ''}`}>
        {item.children!.map((child) => (
          <li key={child.id}>
            <a href={`#${child.id}`} onClick={onNavigate}>
              {child.label}
            </a>
          </li>
        ))}
      </ul>
    </li>
  );
}

export default function Navbar({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="container nav-inner">
        <a className="brand" href="#home" onClick={close}>
          {profile.name}
        </a>
        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden="true">{open ? '✕' : '☰'}</span>
        </button>
        <nav id="site-nav" className={`site-nav ${open ? 'is-open' : ''}`} aria-label="Main">
          <ul>
            {items.map((item) =>
              item.children && item.children.length > 0 ? (
                <NavDropdown key={item.id} item={item} onNavigate={close} />
              ) : (
                <li key={item.id}>
                  <a href={`#${item.id}`} onClick={close}>
                    {item.label}
                  </a>
                </li>
              ),
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
