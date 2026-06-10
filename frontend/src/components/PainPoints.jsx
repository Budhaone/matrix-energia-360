import { motion } from "framer-motion";
import { TrendingUp, Hammer, CloudOff } from "lucide-react";

const pains = [
  {
    icon: TrendingUp,
    title: "Tarifas Abusivas",
    description:
      "Bandeiras tarifárias, reajustes anuais e impostos corroem seu orçamento todo mês. Em 10 anos, sua conta de luz pode dobrar.",
  },
  {
    icon: Hammer,
    title: "Painéis Solares Exigem Obras",
    description:
      "Instalar energia solar tradicional exige de R$ 15.000 a R$ 60.000 em equipamentos, obras estruturais e anos para o retorno do investimento.",
  },
  {
    icon: CloudOff,
    title: "Energia Fóssil & Insustentável",
    description:
      "A energia convencional agride o meio ambiente e aumenta a pegada de carbono da sua casa ou empresa sem oferecer alternativas acessíveis.",
  },
];

const PainPoints = () => (
  <section className="py-24 md:py-32 bg-[#0A0A0A]">
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <span className="text-[#FF6B00] text-xs tracking-widest uppercase font-semibold">
          O Problema
        </span>
        <h2 className="font-chivo text-3xl md:text-5xl font-black text-white tracking-tight mt-3 max-w-3xl leading-tight">
          Você está pagando caro por uma energia que{" "}
          <span className="text-[#FF6B00]">não é sua.</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Image card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden bg-[#141414] md:row-span-3 min-h-[280px]"
        >
          <img
            src="https://images.pexels.com/photos/1009033/pexels-photo-1009033.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=600"
            className="w-full h-full object-cover opacity-40"
            alt="Energia"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8">
            <div className="font-chivo font-black text-[#FF6B00] text-7xl md:text-8xl leading-none">
              +200%
            </div>
            <div className="text-white text-base font-semibold mt-2 leading-tight">
              Aumento nas tarifas de energia nos últimos 15 anos no Brasil
            </div>
          </div>
        </motion.div>

        {/* Pain cards */}
        {pains.map((pain, i) => {
          const Icon = pain.icon;
          return (
            <motion.div
              key={pain.title}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-[#141414] border border-[#27272A] hover:border-[#FF6B00]/30 transition-colors duration-300 p-6"
              data-testid={`pain-card-${i}`}
            >
              <div className="w-10 h-10 bg-[#FF6B00]/10 flex items-center justify-center mb-4">
                <Icon size={20} className="text-[#FF6B00]" />
              </div>
              <h3 className="font-chivo text-xl font-bold text-white mb-2">{pain.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{pain.description}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default PainPoints;
