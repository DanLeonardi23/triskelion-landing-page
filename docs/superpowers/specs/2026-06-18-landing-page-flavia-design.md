# Landing Page — Flavia Takayama / Triskelion

**Data:** 2026-06-18  
**Objetivo:** Landing page de alta conversão para captação de pacientes particulares para psicoterapia online de alta complexidade e orientação profissional. CTA único: contato via WhatsApp Business.

---

## 1. Decisões de Design

| Decisão | Escolha |
|---|---|
| Direção visual | B — Acolhedor Profissional (verde-teal, formas suaves, humanizado) |
| Hero mobile | B — Texto + foto lado a lado, CTA visível sem scroll |
| Cards de especialidades | B — Lista vertical com ícone + título + descrição curta |
| Tech stack | HTML/CSS/JS puro (sem framework, sem build step) |
| Estrutura de arquivos | Multi-arquivo com CSS custom properties (tokens) |

---

## 2. Estrutura de Arquivos

```
triskelionLandingPage/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
└── img/
    ├── flavia01.jpg     ← foto profissional da psicóloga
    └── logo-triskelion  ← logo da marca (formato a definir)
```

---

## 3. Paleta de Cores (CSS Tokens)

```css
:root {
  --color-primary:       #3D7A6E;   /* teal principal — nav, bordas, badges */
  --color-primary-dark:  #2A5F55;   /* teal escuro — hover, títulos "sobre" */
  --color-primary-light: #EDF5F3;   /* teal claro — fundos de seção alt */
  --color-primary-border:#C5DDD9;   /* teal borda — separadores, foto */
  --color-text:          #2A3D3A;   /* texto principal */
  --color-text-light:    #5A7A75;   /* texto secundário, descrições */
  --color-bg:            #FFFFFF;   /* fundo branco */
  --color-bg-soft:       #F7F3EF;   /* fundo off-white suave */
  --color-cta-wa:        #25D366;   /* verde WhatsApp — botões CTA */
  --font-heading:        Georgia, 'Times New Roman', serif;
  --font-body:           'Helvetica Neue', Arial, sans-serif;
}
```

> Os valores de teal são derivados da identidade Triskelion e podem ser ajustados após revisão do site www.triskelion.com.br. Alterar apenas os tokens em `:root` propaga para toda a página.

---

## 4. Seções da Página (em ordem)

### 4.1 Nav
- Logo "TRISKELION" (letras) à esquerda + link para imagem do logo
- CRP "05/55605-3" à direita no mobile
- Desktop: links âncora internos (Especialidades / Sobre / FAQ) + botão WhatsApp
- Fundo: `--color-primary`; texto branco

### 4.2 Hero (Dobra Principal)
- **Mobile:** flex row — texto (flex: 1) + foto (90×108px, border-radius orgânico) lado a lado, sobre fundo gradiente soft (`--color-bg-soft` → `--color-primary-light`)
- **Desktop:** mesma lógica, foto 180×220px
- Badge: "Psicologia Clínica Online · Alta Complexidade"
- H1 (Georgia, bold): "Psicoterapia de Alta Complexidade Baseada em Evidências"
- Subtítulo: copy com TCC + USP + experiência
- CTA primário: botão verde WhatsApp com ícone SVG inline
- Trust bar (3 itens mobile / 4 desktop): `25+ anos` · `USP` · `TCC` · `CRP`
- Foto: `img/flavia01.jpg`, object-fit cover, border-radius orgânico (50%/60% pattern)

### 4.3 Especialidades — "Como posso ajudar você?"
- 5 itens em lista vertical
- Cada item: borda-esquerda 3px `--color-primary` + fundo `#f7fbfa` + ícone emoji + título bold + descrição 1 linha
- Desktop: grid 2 colunas (último item ocupa meia largura)

| Ícone | Título | Descrição curta |
|---|---|---|
| 😰 | Ansiedade & Depressão Grave | Regulação emocional em momentos de crise profunda |
| 🔥 | Burnout & Esgotamento | Reestruturação e manejo do estresse crônico |
| 🧩 | Transtornos de Personalidade | Acompanhamento clínico pautado em ciência e método |
| 💼 | Orientação Profissional & Carreira | Direcionamento para executivos em crise ou transição |
| 🤝 | Conflitos & Relacionamentos | Intervenções para dinâmicas interpessoais |

### 4.4 Abordagem Técnica — "Prática Clínica Pautada na Ciência"
- 3 cards com ícone + título + parágrafo curto
- Mobile: coluna única. Desktop: 3 colunas
- Itens: TCC / Psicodiagnóstico & Dados Psicométricos / Coaching Ontológico
- Fundo de seção: `--color-bg-soft`

### 4.5 Sobre a Profissional
- Mobile: foto flutuando à direita (80×80px, border-radius 50%), nome + CRP + bio
- Desktop: foto 140×170px à esquerda, texto à direita (flex row)
- Nome: "Flavia Takayama" (Georgia, bold, `--color-primary-dark`)
- Bio: texto da seção 4 do briefing
- 4 selos em grid 2×2: FMUSP / Pieron / CETCC / Instituto Opus — fundo `--color-primary-light`

### 4.6 FAQ — "Informações Práticas"
- 3 perguntas com separador horizontal
- Marcador visual: círculo `--color-primary` com "?" antes de cada pergunta
- Perguntas: Sigilo online / Nota fiscal e reembolso / Como funciona a primeira consulta
- Fundo: `--color-bg-soft`

### 4.7 Footer CTA
- Fundo: `--color-primary`; texto branco
- H3 (Georgia): "Pronto para recuperar o equilíbrio?"
- Subtítulo: "Entre em contato agora. O primeiro passo é uma conversa."
- Botão WhatsApp (mesmo estilo do hero)

### 4.8 Footer
- Fundo escuro `#1A2A26`
- Texto: © 2026 Triskelion · Flavia Takayama · CRP 05/55605-3 · CNAE 8650-0/03 · Política de Privacidade

### 4.9 Botão WhatsApp Sticky (mobile only)
- Barra fixa no bottom da viewport
- Fundo `--color-cta-wa`; texto branco bold
- `position: fixed; bottom: 0`
- Visível apenas em mobile (`@media max-width: 768px`)

---

## 5. JavaScript (js/main.js)

### 5.1 GA4 + Rastreamento de Conversão
```js
// Todos os links/botões WhatsApp disparam evento GA4
// Evento: 'whatsapp_click' (conversão primária para Google Ads)
gtag('event', 'whatsapp_click', { event_category: 'CTA', event_label: location });
```

### 5.2 WhatsApp Link
- URL: `https://wa.me/5511983868766`
- Mensagem pré-preenchida (opcional): `?text=Olá%2C%20gostaria%20de%20agendar%20uma%20consulta.`
- Todos os botões CTA apontam para este link com `target="_blank" rel="noopener"`

### 5.3 Outros
- Smooth scroll para links âncora internos
- Sem dependências externas (sem jQuery, sem libs)

---

## 6. HTML — Head e Meta Tags

```html
<meta name="description" content="Psicoterapia de alta complexidade online (TCC). Ansiedade, depressão, burnout e orientação profissional. Psicóloga com pós-graduação pela USP. Agende via WhatsApp.">
<meta property="og:title" content="Flavia Takayama — Psicoterapia de Alta Complexidade">
<meta property="og:image" content="img/flavia01.jpg">
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
```

> O `Measurement ID` do GA4 (`G-XXXXXXXXXX`) deve ser fornecido pelo usuário após criar a propriedade no Google Analytics.

---

## 7. Requisitos de Performance

- Nenhuma dependência de CDN em runtime (exceto gtag.js do Google)
- CSS inline crítico no `<head>` para hero (above the fold)
- Imagem da Flavia: formato WebP com fallback JPG; largura máxima 400px; `loading="eager"` no hero
- Demais imagens: `loading="lazy"`
- Meta `<viewport>` com `width=device-width, initial-scale=1`
- Alvo: LCP < 2.5s em conexão 4G

---

## 8. Acessibilidade e SEO

- Headings em ordem hierárquica: H1 (hero) → H2 (seções) → H3 (cards)
- `alt` descritivo em todas as imagens
- Botões WhatsApp com `aria-label`
- Contraste mínimo AA (4.5:1) em todo texto sobre fundo

---

## 9. Itens Pendentes (a fornecer antes do deploy)

- [ ] `Measurement ID` do Google Analytics 4 (`G-XXXXXXXXXX`)
- [ ] Arquivo `img/flavia01.jpg` (foto profissional da Flavia)
- [ ] Logo Triskelion em formato SVG ou PNG transparente
- [ ] Cores exatas do site www.triskelion.com.br (para calibrar tokens se necessário)
- [ ] Número do CRP já confirmado: `05/55605-3` ✅
- [ ] WhatsApp já confirmado: `5511983868766` ✅
