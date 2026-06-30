import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Como Funciona", href: "#como-funciona" },
  { label: "Benefícios", href: "#beneficios" },
  { label: "Dúvidas", href: "#faq" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      data-testid="site-header"
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/90 backdrop-blur-xl border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2" data-testid="header-logo">
          <div className="w-8 h-8 bg-[#FF6B00] flex items-center justify-center flex-shrink-0">
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
              <path d="M6 26 L11 8 L16 18 L21 8 L26 26" stroke="black" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-white font-black text-sm tracking-wider" style={{ fontFamily: "'Chivo', sans-serif" }}>MATRIX</span>
            <span className="text-[#FF6B00] font-black text-xs tracking-widest" style={{ fontFamily: "'Chivo', sans-serif" }}>ENERGIA 360</span>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-zinc-400 hover:text-white transition-colors text-sm tracking-wide"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contato"
            data-testid="header-cta-btn"
            className="bg-[#FF6B00] text-black font-bold px-5 py-2.5 text-sm hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(255,107,0,0.4)] transition-all duration-200"
          >
            Simular Economia
          </a>
          <button
            className="md:hidden text-white p-1"
            onClick={() => setOpen(!open)}
            data-testid="mobile-menu-btn"
            aria-label="Menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-black/95 border-b border-white/10 px-6 py-4 flex flex-col gap-3">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-zinc-300 hover:text-white text-base py-2 border-b border-white/5"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
