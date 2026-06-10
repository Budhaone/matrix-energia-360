import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const Calculator = () => {
  const [bill, setBill] = useState(370);
  const savings = Math.round(bill * 0.10);
  const annualSavings = savings * 12;
  const fiveYearSavings = savings * 60;

  const results = [
    { label: "Economia / Mês", value: `R$ ${savings.toLocaleString("pt-BR")}`, sub: "todo mês, garantido", highlight: true },
    { label: "Economia / Ano", value: `R$ ${annualSavings.toLocaleString("pt-BR")}`, sub: "em 12 meses" },
    { label: "Em 5 Anos", value: `R$ ${fiveYearSavings.toLocaleString("pt-BR")}`, sub: "sem investir nada" },
  ];

  return (
    <section id="calculadora" className="py-24 md:py-32 bg-[#141414]">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-[#FF6B00] text-xs tracking-widest uppercase font-semibold">
            Simulação Instantânea
          </span>
          <h2 className="font-chivo text-3xl md:text-5xl font-black text-white tracking-tight mt-3">
            Simulador de Economia
          </h2>
          <p className="text-zinc-500 mt-4 text-base">
            Arraste o controle e veja quanto você pode economizar por mês
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-[#0A0A0A] border border-[#27272A] p-8 md:p-12"
        >
          <div className="mb-10">
            <div className="flex justify-between items-end mb-4">
              <label className="text-zinc-400 text-sm uppercase tracking-widest">
                Sua Conta Mensal Atual
              </label>
              <span className="font-chivo text-4xl font-black text-white">
                R$ {bill.toLocaleString("pt-BR")}
              </span>
            </div>
            <input
              type="range"
              min={370}
              max={5000}
              step={10}
              value={bill}
              onChange={(e) => setBill(Number(e.target.value))}
              data-testid="calculator-slider"
              style={{ accentColor: "#FF6B00" }}
              className="w-full h-2 cursor-pointer bg-[#27272A] rounded-full"
            />
            <div className="flex justify-between text-zinc-600 text-xs mt-2">
              <span>R$ 370</span>
              <span>R$ 5.000</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {results.map((r, i) => (
              <div
                key={i}
                className={`p-6 text-center transition-all duration-300 ${
                  r.highlight
                    ? "bg-[#FF6B00]"
                    : "bg-[#141414] border border-[#27272A]"
                }`}
                data-testid={`calc-result-${i}`}
              >
                <div className={`text-xs uppercase tracking-widest mb-2 ${r.highlight ? "text-black/60" : "text-zinc-500"}`}>
                  {r.label}
                </div>
                <div className={`font-chivo text-3xl font-black ${r.highlight ? "text-black" : "text-[#FF6B00]"}`}>
                  {r.value}
                </div>
                <div className={`text-xs mt-1 ${r.highlight ? "text-black/50" : "text-zinc-600"}`}>
                  {r.sub}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a
              href="#contato"
              data-testid="calculator-cta"
              className="inline-flex items-center gap-2 bg-[#FF6B00] text-black font-black px-8 py-4 text-base hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(255,107,0,0.4)] transition-all duration-200 font-chivo"
            >
              Quero Economizar R$ {savings.toLocaleString("pt-BR")}/mês
              <ArrowRight size={18} />
            </a>
          </div>
          <p className="text-center text-zinc-600 text-xs mt-5 leading-relaxed">
            * Os valores acima são ilustrativos. O desconto real será apurado e oficializado após a análise individual de cada cliente, podendo variar conforme a distribuidora e localidade.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Calculator;
