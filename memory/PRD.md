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
- **Email**: Resend SDK
- **Fontes**: Chivo (headings) + Manrope (body) via Google Fonts

## Personas Alvo
- Residências que pagam contas altas de luz e querem economizar sem obras
- Empresas (CPF/CNPJ) buscando redução de custos energéticos
- Consumidores conscientes que querem energia renovável sem investimento inicial

## Implementado (2026-02)

### Features
- Landing page completa (Hero, Marquee, Pain Points, How It Works, Benefits, FAQ, Contact Form, Footer)
- WhatsApp CTA flutuante — (61) 992318338
- Calculadora de economia interativa (slider R$50-R$5.000)
- Contador ao vivo "300.000+ Famílias economizando"
- Painel Admin em `/admin` com JWT, lista de leads, stats, busca, exportação CSV
- Email via Resend com template HTML completo
- Campos extras: cidade/estado, profissão, expectativas, dores
- Favicon SVG personalizado (laranja/preto)
- Título da aba: "Matrix Energia 360 | Economize até 35% na Conta de Luz"
- Badge "Made with Emergent" removido

### Deploy — matrixenergia360 (PRODUÇÃO)
- **Frontend**: https://matrix-energia-360.vercel.app → contas.matrixenergia360.com.br
- **Backend**: https://matrix-energia-360.onrender.com
- **GitHub**: Budhaone/matrix-energia-360
- **DB**: MongoDB Atlas — DB_NAME: matrix_energia_360

### Deploy — matrix360brasil (PRODUÇÃO)
- **Frontend**: https://matrix360brasil.vercel.app → contas.matrix360brasil.com.br
- **Backend**: https://matrix360brasil.onrender.com
- **GitHub**: Budhaone/matrix360brasil
- **DB**: MongoDB Atlas — DB_NAME: matrix360brasil
- **WhatsApp**: (11) 984732980
- **Email leads**: contas@matrix360brasil.com.br

## Variáveis de Ambiente

### Render (backend) — matrixenergia360
- MONGO_URL: string do MongoDB Atlas
- DB_NAME: matrix_energia_360
- CORS_ORIGINS: *
- RESEND_API_KEY: re_PrVrtF7c_B7iJ3D2TWz3pfFfq5wFt18ks
- SENDER_EMAIL: onboarding@resend.dev
- ADMIN_JWT_SECRET: 1151b6d660862b15aaa0da287e16f434b227822739c88368fee77ff2dfe4f2c8
- ADMIN_PASSWORD: matrix360@2026

### Render (backend) — matrix360brasil
- MONGO_URL: string do MongoDB Atlas (mesma)
- DB_NAME: matrix360brasil
- CORS_ORIGINS: *
- RESEND_API_KEY: re_PrVrtF7c_B7iJ3D2TWz3pfFfq5wFt18ks
- SENDER_EMAIL: onboarding@resend.dev
- ADMIN_JWT_SECRET: 1151b6d660862b15aaa0da287e16f434b227822739c88368fee77ff2dfe4f2c8
- ADMIN_PASSWORD: matrix360@2026

### Vercel (frontend)
- matrixenergia360: REACT_APP_BACKEND_URL=https://matrix-energia-360.onrender.com
- matrix360brasil: REACT_APP_BACKEND_URL=https://matrix360brasil.onrender.com

## Backlog / Futuras Melhorias
- Depoimentos de clientes reais
- SEO meta tags e Open Graph
- Google Analytics / pixel tracking
- Configurar domínio verificado no Resend para envio profissional de emails
