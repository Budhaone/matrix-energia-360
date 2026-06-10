import { motion } from "framer-motion";
import { Zap, ArrowRight } from "lucide-react";

const STATS = [
  { value: "35%", label: "Economia média" },
  { value: "R$ 0", label: "Investimento inicial" },
  { value: "100%", label: "Energia renovável" },
];

const Hero = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 bg-[#0A0A0A]">
      <img
        src="https://images.pexels.com/photos/13219418/pexels-photo-13219418.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1080&w=1920"
        className="w-full h-full object-cover opacity-20"
        alt="Fazenda solar"
        loading="eager"
      />
    </div>
    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0A0A0A]" />

    <div className="relative max-w-7xl mx-auto px-6 md:px-12 text-center py-32 pt-40">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="inline-flex items-center gap-2 border border-[#FF6B00]/40 bg-[#FF6B00]/10 px-4 py-2 mb-8">
          <Zap size={12} className="text-[#FF6B00]" fill="#FF6B00" />
          <span className="text-[#FF6B00] text-xs tracking-widest uppercase font-semibold">
            Energia Solar por Assinatura
          </span>
        </div>

        <h1
          className="font-chivo text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-none mb-6"
          data-testid="hero-headline"
        >
          Economize até{" "}
          <span className="text-[#FF6B00]">35%</span>
          <br />
          na Conta de Luz
          <br />
          <span className="text-zinc-300">Sem Instalar Nada.</span>
        </h1>

        <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          A Matrix Energia 360 conecta você a fazendas solares certificadas.{" "}
          <span className="text-white font-medium">Zero investimento inicial.</span>{" "}
          100% digital. Para sua residência ou empresa.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#contato"
            data-testid="hero-cta-primary"
            className="inline-flex items-center justify-center gap-2 bg-[#FF6B00] text-black font-bold px-8 py-4 text-base hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(255,107,0,0.5)] transition-all duration-200 font-chivo"
          >
            Quero Economizar Agora <ArrowRight size={18} />
          </a>
          <a
            href="#como-funciona"
            data-testid="hero-cta-secondary"
            className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-medium px-8 py-4 text-base hover:border-white/50 hover:bg-white/5 transition-all duration-200"
          >
            Entender o Cálculo
          </a>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12 mt-16"
        >
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-chivo text-3xl font-black text-white">{s.value}</div>
              <div className="text-zinc-500 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  </section>
);

export default Hero;
