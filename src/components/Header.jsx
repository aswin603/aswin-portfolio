import React from 'react';

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#tech-stack', label: 'Tech Stack' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
];

export default function Header({ isDark, onToggleTheme, menuOpen, onMenuToggle, onNavClick }) {
  return (
    <header className="header">
      <nav className="nav container">
        <a href="#hero" className="nav-logo" onClick={onNavClick}>
          AK
        </a>
        <button
          type="button"
          className="theme-toggle"
          aria-label="Toggle dark mode"
          onClick={onToggleTheme}
        >
          <span className="theme-icon sun" aria-hidden="true">
            ☀️
          </span>
          <span className="theme-icon moon" aria-hidden="true">
            🌙
          </span>
        </button>
        <button
          type="button"
          className="nav-toggle"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={onMenuToggle}
        >
          <span />
          <span />
          <span />
        </button>
        <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <a href={href} onClick={onNavClick}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
