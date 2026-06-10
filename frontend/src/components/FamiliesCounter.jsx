import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const MINI_STATS = [
  { value: "35%", label: "Economia média" },
  { value: "R$ 0", label: "Custo inicial" },
  { value: "+500%", label: "Crescimento do setor" },
  { value: "100%", label: "Digital e sem obras" },
];

const FamiliesCounter = () => {
  const [displayed, setDisplayed] = useState(57860);
  const [animDone, setAnimDone] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // Count up from 55000 to 57860 on scroll in
  useEffect(() => {
    if (!isInView) return;
    let current = 55000;
    const target = 57860;
    const timer = setInterval(() => {
      current += 30;
      if (current >= target) {
        setDisplayed(target);
        setAnimDone(true);
        clearInterval(timer);
      } else {
        setDisplayed(current);
      }
    }, 10);
    return () => clearInterval(timer);
  }, [isInView]);

  // Live increment after animation
  useEffect(() => {
    if (!animDone) return;
    const interval = setInterval(() => {
      setDisplayed((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 3500);
    return () => clearInterval(interval);
  }, [animDone]);

  return (
    <section ref={ref} className="py-20 bg-[#0A0A0A] border-y border-[#27272A]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 bg-[#FF6B00] rounded-full animate-pulse" />
              <span className="text-[#FF6B00] text-xs tracking-widest uppercase font-semibold">
                Ao Vivo
              </span>
            </div>
            <div
              className="font-chivo text-6xl md:text-7xl font-black text-white"
              data-testid="families-counter"
            >
              {displayed.toLocaleString("pt-BR")}
              <span className="text-[#FF6B00]">+</span>
            </div>
            <p className="text-zinc-400 text-lg mt-2 max-w-sm">
              Famílias e empresas já economizando com Matrix Energia 360
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {MINI_STATS.map((s) => (
              <div
                key={s.label}
                className="bg-[#141414] border border-[#27272A] p-5 text-center min-w-[130px]"
              >
                <div className="font-chivo text-2xl font-black text-[#FF6B00]">{s.value}</div>
                <div className="text-zinc-500 text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FamiliesCounter;
