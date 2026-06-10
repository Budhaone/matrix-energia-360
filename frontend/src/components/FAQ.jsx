import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Preciso fazer alguma obra ou instalar equipamentos em casa?",
    a: "Não. Toda a energia é gerada remotamente nas nossas fazendas solares e injetada diretamente na rede da sua distribuidora. Você não instala nenhum equipamento, não faz obras e não contrata eletricistas.",
  },
  {
    q: "Minha distribuidora de energia vai mudar?",
    a: "Não. Sua distribuidora atual continua a mesma — CEMIG, COPEL, ENEL, CPFL, Light, etc. Você apenas recebe créditos de energia renovável na sua fatura existente. Nenhum contrato com a distribuidora é alterado.",
  },
  {
    q: "Tem prazo de fidelidade ou taxa de cancelamento?",
    a: "Nosso modelo garante total portabilidade e liberdade. Você pode solicitar cancelamento sem multas abusivas. Consulte os termos específicos com nossos consultores para sua situação.",
  },
  {
    q: "Como o desconto aparece na minha conta de luz?",
    a: "Os créditos de energia solar são injetados na rede pela nossa fazenda e compensados automaticamente na sua fatura pela distribuidora. O desconto aparece na sua conta de luz mensalmente, sem necessidade de nenhuma ação da sua parte.",
  },
  {
    q: "Em quanto tempo começo a economizar?",
    a: "Após a ativação do seu contrato (geralmente em até 30 dias), os créditos já aparecem no próximo ciclo de faturamento. A economia começa imediatamente a partir da primeira fatura após a ativação.",
  },
  {
    q: "Funciona para empresas (CNPJ) também?",
    a: "Sim! Atendemos tanto CPF (residências) quanto CNPJ (empresas de todos os portes). Quanto maior o consumo, maior a economia mensal. Temos soluções personalizadas para pequenas, médias e grandes empresas.",
  },
];

const FAQ = () => (
  <section id="faq" className="py-24 md:py-32 bg-[#141414]">
    <div className="max-w-3xl mx-auto px-6 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <span className="text-[#FF6B00] text-xs tracking-widest uppercase font-semibold">
          Tire Suas Dúvidas
        </span>
        <h2 className="font-chivo text-3xl md:text-5xl font-black text-white tracking-tight mt-3">
          Perguntas Frequentes
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="bg-[#0A0A0A] border border-[#27272A] px-6 data-[state=open]:border-[#FF6B00]/50"
              data-testid={`faq-item-${i}`}
            >
              <AccordionTrigger className="text-white font-semibold hover:no-underline hover:text-[#FF6B00] text-left py-5 text-sm md:text-base transition-colors">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-zinc-400 leading-relaxed pb-5 text-sm">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </div>
  </section>
);

export default FAQ;
