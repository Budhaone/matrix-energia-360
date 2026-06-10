import { motion } from "framer-motion";
import { PiggyBank, Wrench, Leaf, Building2 } from "lucide-react";

const benefits = [
  {
    icon: PiggyBank,
    title: "Economia de até 35%",
    description:
      "Redução imediata e contínua na sua fatura de energia elétrica. Sem letras miúdas, sem surpresas no final do mês.",
    highlight: true,
  },
  {
    icon: Wrench,
    title: "Zero Investimento",
    description:
      "Você não compra painéis, não faz obras e não tem custo de manutenção. Sua economia começa do zero.",
    highlight: false,
  },
  {
    icon: Leaf,
    title: "100% Energia Limpa",
    description:
      "Contribua para um planeta mais sustentável. Energia gerada 100% por fontes renováveis, sem emissão de carbono.",
    highlight: false,
  },
  {
    icon: Building2,
    title: "Casa e Empresa",
    description:
      "Soluções adaptadas para CPF e CNPJ. Da residência familiar ao complexo corporativo, todos podem economizar.",
    highlight: false,
  },
];

const Benefits = () => (
  <section id="beneficios" className="py-24 md:py-32 bg-[#0A0A0A]">
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <span className="text-[#FF6B00] text-xs tracking-widest uppercase font-semibold">
          Por Que a Matrix
        </span>
        <h2 className="font-chivo text-3xl md:text-5xl font-black text-white tracking-tight mt-3">
          Vantagens que Transformam
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {benefits.map((b, i) => {
          const Icon = b.icon;
          return (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`p-8 border transition-all duration-300 cursor-default ${
                b.highlight
                  ? "bg-[#FF6B00] border-[#FF6B00]"
                  : "bg-[#141414] border-[#27272A] hover:border-[#FF6B00]/40"
              }`}
              data-testid={`benefit-card-${i}`}
            >
              <div
                className={`w-12 h-12 flex items-center justify-center mb-5 ${
                  b.highlight ? "bg-black/20" : "bg-[#FF6B00]/10"
                }`}
              >
                <Icon size={22} className={b.highlight ? "text-black" : "text-[#FF6B00]"} />
              </div>
              <h3
                className={`font-chivo text-2xl font-black mb-3 ${
                  b.highlight ? "text-black" : "text-white"
                }`}
              >
                {b.title}
              </h3>
              <p
                className={`text-sm leading-relaxed ${
                  b.highlight ? "text-black/70" : "text-zinc-400"
                }`}
              >
                {b.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default Benefits;
