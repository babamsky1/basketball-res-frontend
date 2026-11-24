import { ArrowUpRight, CircleDot, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { NAV_LINKS } from "../../constants/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white">
      {/* Skip link for keyboard & screen reader users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-slate-950 focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
      >
        Skip to main content
      </a>

      <nav
        aria-label="Primary navigation"
        className="flex h-16 w-full items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        {/* Brand */}
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-2.5 rounded-lg"
        >
          <div className="flex size-9 items-center justify-center rounded-lg bg-orange-600 text-white">
            <CircleDot size={22} strokeWidth={2.5} aria-hidden="true" />
          </div>
          <span className="text-lg font-extrabold tracking-tight text-slate-950">
            Court<span className="text-orange-600">Reserve</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.end}
              className={({ isActive }) =>
                `rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-orange-50 text-orange-800"
                    : "text-slate-700 hover:bg-slate-100 hover:text-slate-950"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Desktop CTA */}
        <Link
          to="/booking"
          className="hidden items-center gap-1.5 rounded-lg bg-orange-600 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-orange-700 md:inline-flex"
        >
          Reserve Now
          <ArrowUpRight size={16} aria-hidden="true" />
        </Link>

        {/* Mobile Toggle */}
        <button
          type="button"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="flex size-10 items-center justify-center rounded-lg border border-slate-300 text-slate-800 hover:bg-slate-100 md:hidden"
        >
          {isMenuOpen ? (
            <X size={20} aria-hidden="true" />
          ) : (
            <Menu size={20} aria-hidden="true" />
          )}
        </button>
      </nav>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-slate-200 bg-white px-4 py-3 md:hidden"
        >
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.end}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `rounded-lg px-3.5 py-2.5 text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-orange-50 text-orange-800"
                      : "text-slate-700 hover:bg-slate-100"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <Link
              to="/booking"
              onClick={closeMenu}
              className="mt-2 flex items-center justify-center gap-1.5 rounded-lg bg-orange-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-orange-700"
            >
              Reserve Now
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
