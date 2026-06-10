import { motion } from "framer-motion";
import { ClipboardList, Zap, CreditCard } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: ClipboardList,
    title: "Assinatura Digital",
    description:
      "Faça seu cadastro 100% online, sem burocracia e sem taxa de adesão. Em poucos minutos, você já é um assinante Matrix.",
  },
  {
    num: "02",
    icon: Zap,
    title: "Injeção na Rede",
    description:
      "Nossas fazendas solares certificadas geram energia limpa e a injetam diretamente na rede da sua distribuidora local.",
  },
  {
    num: "03",
    icon: CreditCard,
    title: "Desconto na Fatura",
    description:
      "Os créditos de energia aparecem automaticamente na sua conta de luz atual, gerando até 35% de economia todo mês.",
  },
];

const HowItWorks = () => (
  <section id="como-funciona" className="py-24 md:py-32 bg-[#141414]">
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <span className="text-[#FF6B00] text-xs tracking-widest uppercase font-semibold">
          Simples Assim
        </span>
        <h2 className="font-chivo text-3xl md:text-5xl font-black text-white tracking-tight mt-3">
          3 Passos para a Liberdade Energética
        </h2>
        <p className="text-zinc-500 text-base mt-4 max-w-xl mx-auto">
          Sem obras, sem técnicos, sem burocracia. Só economia desde o primeiro mês.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-[#0A0A0A] border border-[#27272A] p-8 hover:border-[#FF6B00]/40 transition-all duration-300 group"
              data-testid={`step-card-${i}`}
            >
              <div className="flex items-start gap-4 mb-6">
                <span className="font-chivo font-black text-6xl text-[#FF6B00]/15 leading-none group-hover:text-[#FF6B00]/30 transition-colors">
                  {step.num}
                </span>
                <div className="w-10 h-10 bg-[#FF6B00] flex items-center justify-center flex-shrink-0 mt-1">
                  <Icon size={18} className="text-black" />
                </div>
              </div>
              <h3 className="font-chivo text-xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-10 text-center"
      >
        <a
          href="#contato"
          data-testid="how-it-works-cta"
          className="inline-flex items-center gap-2 bg-[#FF6B00] text-black font-bold px-8 py-4 text-base hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(255,107,0,0.4)] transition-all duration-200 font-chivo"
        >
          Começar Agora - É Grátis
        </a>
      </motion.div>
    </div>
  </section>
);

export default HowItWorks;
