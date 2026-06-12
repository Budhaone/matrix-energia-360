import { Zap, Mail } from "lucide-react";

const LINKS = [
  { label: "Como Funciona", href: "#como-funciona" },
  { label: "Benefícios", href: "#beneficios" },
  { label: "Perguntas Frequentes", href: "#faq" },
  { label: "Contato", href: "#contato" },
];

const Footer = () => (
  <footer className="bg-black border-t border-zinc-900 py-16">
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
        {/* Brand */}
        <div>
          <img
            src="https://assinaturaenergiaeletrica.com.br/wp-content/uploads/2025/12/LOGO-MATRIX360-1024x482.png"
            alt="Matrix Energia 360"
            className="h-10 w-auto mb-4"
          />
          <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
            Conectando você a energia solar limpa por assinatura. Sem obras.
            Sem investimento. 100% digital.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-chivo font-bold text-white text-sm uppercase tracking-widest mb-5">
            Navegação
          </h4>
          <ul className="space-y-3">
            {LINKS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="text-zinc-500 text-sm hover:text-white transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-chivo font-bold text-white text-sm uppercase tracking-widest mb-5">
            Contato
          </h4>
          <a
            href="mailto:contas@matrixenergia360.com.br"
            className="flex items-center gap-2 text-[#FF6B00] hover:text-orange-400 transition-colors text-sm font-medium"
            data-testid="footer-email-link"
          >
            <Mail size={16} />
            contas@matrixenergia360.com.br
          </a>
          <p className="text-zinc-600 text-sm mt-3 leading-relaxed">
            Nossa equipe responde em até 24 horas úteis.
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-zinc-600 text-sm">
          © 2026 Matrix Energia 360. Todos os direitos reservados.
        </p>
        <div className="flex items-center gap-2 text-zinc-600 text-xs">
          <Zap size={12} className="text-[#FF6B00]" />
          <span>Energia limpa para todos</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
