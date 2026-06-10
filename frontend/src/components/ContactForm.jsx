import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { CheckCircle, ArrowRight, Loader2 } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const FIELDS = [
  { name: "name", label: "Nome Completo", type: "text", placeholder: "João Silva" },
  { name: "email", label: "Email", type: "email", placeholder: "joao@email.com" },
  { name: "phone", label: "Telefone / WhatsApp", type: "tel", placeholder: "(11) 99999-9999" },
  { name: "average_bill", label: "Valor Médio da Conta de Luz (R$)", type: "text", placeholder: "Ex: 350" },
];

const PERKS = [
  "Simulação 100% gratuita e sem compromisso",
  "Resposta em até 24 horas úteis",
  "Consultores especializados no mercado de energia",
];

const ContactForm = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", average_bill: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [errMsg, setErrMsg] = useState("");

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await axios.post(`${API}/contact`, form);
      setStatus("success");
    } catch {
      setStatus("error");
      setErrMsg("Algo deu errado. Tente novamente ou nos contate diretamente.");
    }
  };

  return (
    <section id="contato" className="py-24 md:py-32 bg-[#FF6B00]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* Left copy */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-chivo text-3xl md:text-5xl font-black text-black tracking-tight leading-tight mb-6">
              Pronto para parar de perder dinheiro?
            </h2>
            <p className="text-black/70 text-base md:text-lg leading-relaxed mb-8">
              Preencha o formulário e nossa equipe entrará em contato para fazer
              uma simulação gratuita da sua economia.
            </p>
            <div className="space-y-4">
              {PERKS.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle size={18} className="text-black flex-shrink-0" />
                  <span className="text-black font-medium text-sm">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#0A0A0A] p-8"
          >
            {status === "success" ? (
              <div className="text-center py-10" data-testid="form-success-state">
                <CheckCircle size={52} className="text-[#FF6B00] mx-auto mb-4" />
                <h3 className="font-chivo text-2xl font-black text-white mb-2">
                  Solicitação Recebida!
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Nossa equipe entrará em contato em breve para sua simulação gratuita.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} data-testid="contact-form" className="space-y-4">
                {FIELDS.map((field) => (
                  <div key={field.name}>
                    <label className="text-zinc-400 text-xs uppercase tracking-widest block mb-1.5">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={form[field.name]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      required
                      data-testid={`contact-field-${field.name}`}
                      className="w-full bg-[#141414] border border-[#27272A] text-white px-4 py-3 text-sm placeholder-zinc-600 focus:outline-none focus:border-[#FF6B00] transition-colors"
                    />
                  </div>
                ))}

                <div>
                  <label className="text-zinc-400 text-xs uppercase tracking-widest block mb-1.5">
                    Mensagem (opcional)
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Informações adicionais, tipo de imóvel, etc."
                    rows={3}
                    data-testid="contact-field-message"
                    className="w-full bg-[#141414] border border-[#27272A] text-white px-4 py-3 text-sm placeholder-zinc-600 focus:outline-none focus:border-[#FF6B00] transition-colors resize-none"
                  />
                </div>

                {status === "error" && (
                  <p className="text-red-400 text-sm" data-testid="form-error">
                    {errMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  data-testid="contact-form-submit"
                  className="w-full bg-[#FF6B00] text-black font-black py-4 text-base flex items-center justify-center gap-2 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(255,107,0,0.4)] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed font-chivo"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Receber Simulação Gratuita
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
