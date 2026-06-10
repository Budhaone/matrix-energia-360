# PRD - Matrix Energia 360 Landing Page

## Problema Original
Criar uma landing page para Matrix Energia 360 baseada no site https://assinaturaenergiaeletrica.com.br/matrix-wyy/consultor-wyy/ com CTA para email contas@matrixenergia360.com.br

## Escolhas do Usuário
- Paleta de cores: Laranja (#FF6B00) / Preto (#0A0A0A) / Branco (#FFFFFF)
- CTA: Formulário de contato que envia email para contas@matrixenergia360.com.br
- Seção FAQ incluída
- Conteúdo: dores do cliente sobre energia, sustentabilidade, portabilidade sem investimento

## Arquitetura
- **Frontend**: React + TailwindCSS + Framer Motion + Shadcn UI
- **Backend**: FastAPI + MongoDB (armazena leads)
- **Email**: Resend SDK (condicional ao RESEND_API_KEY)
- **Fontes**: Chivo (headings) + Manrope (body) via Google Fonts

## Personas Alvo
- Residências que pagam contas altas de luz e querem economizar sem obras
- Empresas (CPF/CNPJ) buscando redução de custos energéticos
- Consumidores conscientes que querem energia renovável sem investimento inicial

## Implementado (2026-02) - v2

### Novas Features
- **WhatsApp CTA flutuante** - botão verde fixo com link para (61) 992318338
- **Novos campos no formulário**: "Descreva suas expectativas da portabilidade" + "Quais suas dores sobre a energia atualmente"
- **Calculadora de economia** - slider interativo R$50-R$5.000, calcula economia mensal/anual/5 anos em tempo real
- **Contador ao vivo** - "300.000+ Famílias economizando" com animação e incremento ao vivo
- **Painel Admin** em `/admin` - lista de leads, stats (total/hoje/7 dias), busca por nome/email/telefone
- **Email atualizado** - template inclui os novos campos de portabilidade e dores

### Seções da Landing Page
1. **Header** - Sticky com glassmorphism, logo Matrix 360, nav links, CTA "Simular Economia"
2. **Hero** - Fullscreen com headline "Economize até 35% na Conta de Luz Sem Instalar Nada.", stats (35%, R$ 0, 100%), dois CTAs
3. **Marquee** - Faixa laranja animada com "SEM OBRAS • ZERO INVESTIMENTO • 100% RENOVÁVEL • PORTABILIDADE TOTAL"
4. **Pain Points** - Bento grid com as 3 dores do cliente + stat "+200%"
5. **Como Funciona** - 3 passos com ícones (Assinatura Digital, Injeção na Rede, Desconto na Fatura)
6. **Benefícios** - 4 cards (Economia 35%, Zero Investimento, Energia Limpa, Casa e Empresa)
7. **FAQ** - Shadcn Accordion com 6 perguntas frequentes
8. **Formulário de Contato** - Seção laranja com form que salva no MongoDB
9. **Footer** - Logo, links, email de contato

### Backend
- `POST /api/contact` - Salva leads no MongoDB, envia email via Resend se API key configurada
- Modelo `ContactLead` com campos: name, email, phone, average_bill, message, created_at

## Backlog Priorizado

### P0 (Crítico - não implementado)
- N/A (MVP completo)

### P1 (Alta prioridade - próxima iteração)
- Configurar RESEND_API_KEY para envio de emails real
- Página de admin para visualizar leads captados
- WhatsApp CTA flutuante

### P2 (Melhorias futuras)
- Calculadora de economia interativa
- Depoimentos de clientes reais
- Animações de scroll mais elaboradas
- SEO meta tags e Open Graph
- Google Analytics / pixel tracking
- A/B testing de headlines

## Próximas Tarefas
1. Configurar Resend para envio de emails (usuário precisa criar conta em resend.com)
2. Adicionar RESEND_API_KEY ao backend/.env
3. Criar página admin para ver leads
4. Configurar domínio personalizado
