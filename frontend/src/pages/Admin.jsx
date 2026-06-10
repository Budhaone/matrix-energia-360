import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Users, TrendingUp, Calendar, RefreshCw, Mail, Phone, LogOut } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const StatCard = ({ label, value, Icon, color }) => (
  <div className="bg-[#141414] border border-[#27272A] p-6" data-testid="admin-stat-card">
    <div className="flex items-center justify-between mb-3">
      <span className="text-zinc-500 text-sm">{label}</span>
      <Icon size={18} className={color} />
    </div>
    <div className={`font-chivo text-4xl font-black ${color}`}>{value}</div>
  </div>
);

const Admin = () => {
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({ total: 0, today: 0, this_week: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [l, s] = await Promise.all([
        axios.get(`${API}/admin/leads`),
        axios.get(`${API}/admin/stats`),
      ]);
      setLeads(l.data);
      setStats(s.data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = leads.filter((l) =>
    l.name?.toLowerCase().includes(search.toLowerCase()) ||
    l.email?.toLowerCase().includes(search.toLowerCase()) ||
    l.phone?.includes(search)
  );

  const formatDate = (iso) => {
    if (!iso) return "-";
    return new Date(iso).toLocaleString("pt-BR", {
      day: "2-digit", month: "2-digit", year: "2-digit",
      hour: "2-digit", minute: "2-digit",
    });
  };

  return (
    <div className="bg-[#0A0A0A] min-h-screen" style={{ fontFamily: "'Manrope', sans-serif" }}>
      <header className="bg-black border-b border-[#27272A] px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <img
            src="https://assinaturaenergiaeletrica.com.br/wp-content/uploads/2025/12/LOGO-MATRIX360-1024x482.png"
            alt="Matrix" className="h-8 w-auto"
          />
          <span className="text-zinc-600 text-sm hidden sm:block">/ Painel Administrativo</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={load} title="Atualizar" data-testid="admin-refresh-btn"
            className="text-zinc-400 hover:text-white transition-colors p-2">
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          </button>
          <a href="/" className="flex items-center gap-1.5 text-zinc-400 hover:text-white text-sm transition-colors">
            <LogOut size={14} /> Ver Site
          </a>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="font-chivo text-2xl font-black text-white">Leads Captados</h1>
          <p className="text-zinc-500 text-sm mt-1">Todos os contatos recebidos pelo formulário da landing page</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          <StatCard label="Total de Leads" value={stats.total} Icon={Users} color="text-[#FF6B00]" />
          <StatCard label="Leads Hoje" value={stats.today} Icon={TrendingUp} color="text-green-400" />
          <StatCard label="Últimos 7 Dias" value={stats.this_week} Icon={Calendar} color="text-blue-400" />
        </div>

        <div className="mb-5">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nome, email ou telefone..."
            data-testid="admin-search"
            className="w-full md:w-80 bg-[#141414] border border-[#27272A] text-white px-4 py-2.5 text-sm placeholder-zinc-600 focus:outline-none focus:border-[#FF6B00] transition-colors"
          />
        </div>

        <div className="bg-[#141414] border border-[#27272A] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#27272A] bg-black/40">
                  {["Nome", "Email", "Telefone", "Conta (R$)", "Expectativas de Portabilidade", "Dores com Energia", "Data"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-zinc-500 text-xs uppercase tracking-widest font-medium whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={7} className="text-center py-16 text-zinc-500">Carregando leads...</td></tr>
                ) : filtered.length === 0 ? (
                  <tr><td colSpan={7} className="text-center py-16 text-zinc-500">
                    {search ? "Nenhum resultado encontrado." : "Nenhum lead cadastrado ainda."}
                  </td></tr>
                ) : filtered.map((lead) => (
                  <tr key={lead.id} className="border-b border-[#27272A]/50 hover:bg-white/5 transition-colors" data-testid="admin-lead-row">
                    <td className="px-4 py-3 text-white font-medium whitespace-nowrap">{lead.name}</td>
                    <td className="px-4 py-3">
                      <a href={`mailto:${lead.email}`}
                        className="text-[#FF6B00] hover:underline flex items-center gap-1 whitespace-nowrap">
                        <Mail size={12} /> {lead.email}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-zinc-300 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Phone size={12} className="text-zinc-500 flex-shrink-0" />
                        {lead.phone}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-zinc-300">R$ {lead.average_bill}</td>
                    <td className="px-4 py-3 text-zinc-400 max-w-[200px]">
                      <div className="truncate" title={lead.portability_expectations}>
                        {lead.portability_expectations || "-"}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-zinc-400 max-w-[200px]">
                      <div className="truncate" title={lead.energy_pains}>
                        {lead.energy_pains || "-"}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-zinc-500 whitespace-nowrap text-xs">{formatDate(lead.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length > 0 && (
            <div className="px-4 py-3 text-zinc-600 text-xs border-t border-[#27272A]">
              {filtered.length} lead{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
