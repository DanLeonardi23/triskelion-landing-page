# Landing Page Flavia Takayama — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir uma landing page de alta conversão em HTML/CSS/JS puro para captação de pacientes particulares da psicóloga Flavia Takayama (Triskelion), com CTA único via WhatsApp e rastreamento de conversão GA4.

**Architecture:** Página única estática (index.html) com CSS separado usando custom properties para tokens de design, e JS mínimo para links WhatsApp, smooth scroll e eventos GA4. Mobile-first com breakpoint em 768px. Zero dependências em runtime exceto gtag.js.

**Tech Stack:** HTML5 semântico, CSS3 (custom properties, flexbox, grid, media queries), JavaScript ES6 vanilla, Google Analytics 4

---

## Estrutura de Arquivos

```
triskelionLandingPage/
├── index.html          ← estrutura HTML completa da página
├── css/
│   └── style.css       ← todos os estilos + CSS custom properties
├── js/
│   └── main.js         ← WhatsApp links, smooth scroll, GA4 events
└── img/
    ├── flavia01.jpg    ← foto da psicóloga (FORNECIDA PELO USUÁRIO)
    └── logo.png        ← logo Triskelion (FORNECIDA PELO USUÁRIO)
```

**Seções do HTML (em ordem no DOM):**
- `<nav id="nav">` — barra de navegação sticky
- `<section id="hero">` — dobra principal
- `<section id="especialidades">` — 5 áreas de atendimento
- `<section id="abordagem">` — TCC, Psicodiagnóstico, Coaching
- `<section id="sobre">` — bio + selos de formação
- `<section id="faq">` — 3 perguntas práticas
- `<section id="footer-cta">` — CTA secundário
- `<footer id="rodape">` — copyright + política
- `<div id="sticky-wa">` — botão fixo mobile (position: fixed)

---

## Task 1: Scaffold + Git + CSS Tokens + Reset

**Files:**
- Create: `index.html`
- Create: `css/style.css`
- Create: `js/main.js`
- Create: `img/` (pasta vazia — usuário adiciona as imagens)

- [ ] **Step 1: Inicializar git e criar estrutura de pastas**

```powershell
cd "c:\Users\Dan\Documents\MeusProjetos\triskelionLandingPage"
git init
New-Item -ItemType Directory -Force css, js, img | Out-Null
New-Item -ItemType File -Path "img/.gitkeep" | Out-Null
```

- [ ] **Step 2: Criar index.html com shell completo (seções vazias)**

Crie `index.html` com o conteúdo abaixo:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Flavia Takayama — Psicoterapia de Alta Complexidade | Triskelion</title>
  <link rel="preconnect" href="https://www.googletagmanager.com">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

  <nav id="nav" role="navigation" aria-label="Navegação principal"></nav>

  <main>
    <section id="hero" aria-label="Apresentação"></section>
    <section id="especialidades" aria-labelledby="esp-titulo"></section>
    <section id="abordagem" aria-labelledby="abord-titulo"></section>
    <section id="sobre" aria-labelledby="sobre-titulo"></section>
    <section id="faq" aria-labelledby="faq-titulo"></section>
  </main>

  <section id="footer-cta" aria-label="Chamada para ação"></section>
  <footer id="rodape"></footer>
  <div id="sticky-wa" role="complementary" aria-label="Agendar via WhatsApp"></div>

  <script src="js/main.js"></script>

</body>
</html>
```

- [ ] **Step 3: Criar css/style.css com tokens, reset e base**

```css
/* ================================================
   CSS CUSTOM PROPERTIES — DESIGN TOKENS
   Para ajustar a identidade visual, edite apenas
   este bloco :root. As mudanças se propagam
   automaticamente por toda a página.
================================================ */
:root {
  /* Paleta principal */
  --color-primary:        #3D7A6E;
  --color-primary-dark:   #2A5F55;
  --color-primary-light:  #EDF5F3;
  --color-primary-border: #C5DDD9;

  /* Texto */
  --color-text:           #2A3D3A;
  --color-text-light:     #5A7A75;

  /* Fundos */
  --color-bg:             #FFFFFF;
  --color-bg-soft:        #F7F3EF;

  /* CTA WhatsApp */
  --color-cta-wa:         #25D366;
  --color-cta-wa-hover:   #1ebe57;

  /* Tipografia */
  --font-heading: Georgia, 'Times New Roman', serif;
  --font-body:    'Helvetica Neue', Arial, sans-serif;

  /* Espaçamentos */
  --space-xs:  4px;
  --space-sm:  8px;
  --space-md:  16px;
  --space-lg:  24px;
  --space-xl:  40px;
  --space-2xl: 64px;

  /* Misc */
  --radius-sm:    4px;
  --radius-md:    8px;
  --radius-photo: 50% 50% 50% 50% / 60% 60% 40% 40%;
  --shadow-card:  0 2px 12px rgba(0, 0, 0, 0.08);
  --transition:   0.2s ease;

  /* Layout */
  --max-width: 1100px;
}

/* RESET */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html { scroll-behavior: smooth; }

body {
  font-family: var(--font-body);
  color: var(--color-text);
  background: var(--color-bg);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

a {
  color: inherit;
  text-decoration: none;
}

/* UTILITÁRIOS */
.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--space-md);
}

.section-title {
  font-family: var(--font-heading);
  font-size: clamp(20px, 4vw, 28px);
  font-weight: 800;
  color: var(--color-text);
  margin-bottom: var(--space-xs);
}

.section-sub {
  font-size: 13px;
  color: var(--color-text-light);
  margin-bottom: var(--space-lg);
  line-height: 1.5;
}

/* BOTÃO WHATSAPP (reutilizado em hero e footer-cta) */
.btn-wa {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  background: var(--color-cta-wa);
  color: white;
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 700;
  padding: 12px 20px;
  border-radius: var(--radius-sm);
  transition: background var(--transition), transform var(--transition);
  cursor: pointer;
  border: none;
}

.btn-wa:hover,
.btn-wa:focus-visible {
  background: var(--color-cta-wa-hover);
  transform: translateY(-1px);
  outline: 3px solid rgba(37, 211, 102, 0.4);
}

.btn-wa svg { flex-shrink: 0; }
```

- [ ] **Step 4: Criar js/main.js (esqueleto)**

```javascript
// main.js — wiring executado após DOM pronto
document.addEventListener('DOMContentLoaded', function () {
  // implementado nas tasks seguintes
});
```

- [ ] **Step 5: Verificar no browser**

Abra `index.html` diretamente no browser (duplo clique ou arraste para o Chrome).
Esperado: página em branco sem erros no console (F12 → Console).

- [ ] **Step 6: Commit inicial**

```powershell
git add index.html css/style.css js/main.js img/.gitkeep
git commit -m "chore: scaffold inicial com CSS tokens e reset"
```

---

## Task 2: Nav

**Files:**
- Modify: `index.html` — preencher `<nav id="nav">`
- Modify: `css/style.css` — adicionar estilos da nav

- [ ] **Step 1: Preencher o nav no index.html**

Substitua `<nav id="nav" role="navigation" aria-label="Navegação principal"></nav>` por:

```html
<nav id="nav" role="navigation" aria-label="Navegação principal">
  <div class="container nav-inner">

    <a href="#hero" class="nav-logo" aria-label="Triskelion — voltar ao topo">
      <img src="img/logo.png"
           alt="Triskelion"
           height="32"
           class="nav-logo-img"
           loading="eager"
           onerror="this.style.display='none'">
      <span class="nav-logo-text">TRISKELION</span>
    </a>

    <div class="nav-right">
      <span class="nav-crp">CRP 05/55605-3</span>
      <a href="#"
         class="btn-wa nav-cta wa-link"
         data-label="nav"
         target="_blank"
         rel="noopener"
         aria-label="Agendar consulta via WhatsApp">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.556 4.122 1.528 5.856L0 24l6.335-1.51A11.96 11.96 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.895 0-3.673-.513-5.196-1.408l-.371-.22-3.849.917.943-3.741-.241-.385A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
        </svg>
        WhatsApp
      </a>
    </div>

  </div>
</nav>
```

- [ ] **Step 2: Adicionar CSS da nav no style.css**

Acrescente ao final de `css/style.css`:

```css
/* ===========================
   NAV
=========================== */
#nav {
  background: var(--color-primary);
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
}

.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: var(--space-sm);
  padding-bottom: var(--space-sm);
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.nav-logo-img { height: 32px; width: auto; }

.nav-logo-text {
  color: white;
  font-size: 13px;
  letter-spacing: 2px;
  font-weight: 700;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

.nav-crp {
  color: rgba(255, 255, 255, 0.75);
  font-size: 10px;
}

/* Botão WA na nav — oculto mobile, visível desktop */
.nav-cta {
  display: none;
  font-size: 11px;
  padding: 6px 14px;
}

@media (min-width: 768px) {
  .nav-cta { display: inline-flex; }
}
```

- [ ] **Step 3: Verificar no browser**

Recarregue `index.html`. Esperado:
- Barra verde-teal no topo com "TRISKELION" e CRP
- No mobile (DevTools → toggle device, 390px): sem botão WA
- No desktop (768px+): botão WhatsApp verde visível

- [ ] **Step 4: Commit**

```powershell
git add index.html css/style.css
git commit -m "feat: nav sticky com logo e CTA desktop"
```

---

## Task 3: Hero

**Files:**
- Modify: `index.html` — preencher `<section id="hero">`
- Modify: `css/style.css` — adicionar estilos do hero

- [ ] **Step 1: Preencher hero no index.html**

Substitua `<section id="hero" aria-label="Apresentação"></section>` por:

```html
<section id="hero" aria-label="Apresentação">
  <div class="container">

    <div class="hero-inner">

      <div class="hero-text">
        <span class="hero-badge">Psicologia Clínica Online · Alta Complexidade</span>

        <h1 class="hero-h1">
          Psicoterapia de Alta Complexidade
          Baseada em Evidências
        </h1>

        <p class="hero-sub">
          Atendimento clínico online (TCC) estruturado para o manejo de sofrimento
          emocional agudo e transições de carreira. Conduzido por psicóloga sênior
          com pós-graduação pela USP e sólida bagagem corporativa.
        </p>

        <a href="#"
           class="btn-wa wa-link"
           data-label="hero"
           target="_blank"
           rel="noopener"
           aria-label="Agendar consulta via WhatsApp">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.556 4.122 1.528 5.856L0 24l6.335-1.51A11.96 11.96 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.895 0-3.673-.513-5.196-1.408l-.371-.22-3.849.917.943-3.741-.241-.385A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
          </svg>
          Agendar Consulta via WhatsApp
        </a>
      </div>

      <div class="hero-photo-wrap">
        <img src="img/flavia01.jpg"
             alt="Flavia Takayama, psicóloga clínica — foto profissional"
             class="hero-photo"
             width="200"
             height="240"
             loading="eager"
             fetchpriority="high">
      </div>

    </div><!-- /.hero-inner -->

    <div class="hero-trust" aria-label="Credenciais em destaque">
      <div class="hero-trust-item">
        <span class="hero-trust-num">25+</span>
        <span class="hero-trust-label">anos de experiência</span>
      </div>
      <div class="hero-trust-item">
        <span class="hero-trust-num">USP</span>
        <span class="hero-trust-label">pós-graduação FMUSP</span>
      </div>
      <div class="hero-trust-item">
        <span class="hero-trust-num">TCC</span>
        <span class="hero-trust-label">evidência científica</span>
      </div>
      <div class="hero-trust-item hero-trust-desktop">
        <span class="hero-trust-num">CRP</span>
        <span class="hero-trust-label">05/55605-3</span>
      </div>
    </div>

  </div>
</section>
```

- [ ] **Step 2: Adicionar CSS do hero no style.css**

```css
/* ===========================
   HERO
=========================== */
#hero {
  background: linear-gradient(135deg, var(--color-bg-soft) 0%, var(--color-primary-light) 100%);
  padding: var(--space-xl) 0 var(--space-lg);
}

.hero-inner {
  display: flex;
  gap: var(--space-md);
  align-items: center;
  margin-bottom: var(--space-lg);
}

.hero-text { flex: 1; min-width: 0; }

.hero-badge {
  display: inline-block;
  background: var(--color-primary);
  color: white;
  font-size: 10px;
  letter-spacing: 0.5px;
  padding: 4px 12px;
  border-radius: 20px;
  margin-bottom: var(--space-sm);
}

.hero-h1 {
  font-family: var(--font-heading);
  font-size: clamp(18px, 5vw, 32px);
  font-weight: 800;
  color: var(--color-text);
  line-height: 1.3;
  margin-bottom: var(--space-sm);
}

.hero-sub {
  font-size: clamp(12px, 2vw, 15px);
  color: var(--color-text-light);
  line-height: 1.6;
  margin-bottom: var(--space-md);
}

/* Foto */
.hero-photo-wrap { flex-shrink: 0; }

.hero-photo {
  width: 90px;
  height: 108px;
  object-fit: cover;
  object-position: top center;
  border-radius: var(--radius-photo);
  box-shadow: var(--shadow-card);
}

/* Trust bar */
.hero-trust {
  display: flex;
  gap: var(--space-lg);
  padding-top: var(--space-md);
  border-top: 1px solid var(--color-primary-border);
  justify-content: center;
}

.hero-trust-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.hero-trust-num {
  font-size: clamp(18px, 4vw, 24px);
  font-weight: 800;
  color: var(--color-primary);
  line-height: 1;
}

.hero-trust-label {
  font-size: 9px;
  color: var(--color-text-light);
  margin-top: 3px;
  max-width: 72px;
  line-height: 1.3;
}

/* 4º item de trust — só desktop */
.hero-trust-desktop { display: none; }

/* Desktop hero */
@media (min-width: 768px) {
  #hero { padding: var(--space-2xl) 0; }

  .hero-photo {
    width: 200px;
    height: 240px;
  }

  .hero-inner { gap: var(--space-2xl); }

  .hero-trust {
    justify-content: flex-start;
    gap: var(--space-2xl);
  }

  .hero-trust-desktop { display: flex; }
}
```

- [ ] **Step 3: Verificar no browser**

Recarregue. No mobile (390px):
- Título e foto lado a lado, foto à direita em forma orgânica
- Botão verde WhatsApp abaixo do texto
- Trust bar com 3 itens centralizados

No desktop (1024px):
- Foto maior (200×240), 4 itens na trust bar alinhados à esquerda

Se `img/flavia01.jpg` não existir ainda, a tag img aparece com espaço em branco — OK por enquanto.

- [ ] **Step 4: Commit**

```powershell
git add index.html css/style.css
git commit -m "feat: hero com foto, título TCC/USP e trust bar"
```

---

## Task 4: Especialidades

**Files:**
- Modify: `index.html` — preencher `<section id="especialidades">`
- Modify: `css/style.css` — adicionar estilos das especialidades

- [ ] **Step 1: Preencher a seção especialidades**

Substitua `<section id="especialidades" aria-labelledby="esp-titulo"></section>` por:

```html
<section id="especialidades" aria-labelledby="esp-titulo">
  <div class="container">
    <h2 class="section-title" id="esp-titulo">Como posso ajudar você?</h2>
    <p class="section-sub">Atendimento estruturado para demandas de alta complexidade emocional e profissional</p>

    <ul class="esp-list" role="list">

      <li class="esp-item">
        <span class="esp-icon" aria-hidden="true">😰</span>
        <div class="esp-content">
          <h3 class="esp-title">Ansiedade &amp; Depressão Grave</h3>
          <p class="esp-desc">Suporte estruturado para regulação emocional em momentos de crise profunda, com técnicas de TCC validadas para transtornos do humor.</p>
        </div>
      </li>

      <li class="esp-item">
        <span class="esp-icon" aria-hidden="true">🔥</span>
        <div class="esp-content">
          <h3 class="esp-title">Burnout &amp; Esgotamento</h3>
          <p class="esp-desc">Tratamento focado na reestruturação e manejo do estresse crônico no ambiente de trabalho, com foco em prevenção de recaídas.</p>
        </div>
      </li>

      <li class="esp-item">
        <span class="esp-icon" aria-hidden="true">🧩</span>
        <div class="esp-content">
          <h3 class="esp-title">Transtornos de Personalidade</h3>
          <p class="esp-desc">Acompanhamento clínico maduro e contínuo para condições como Borderline e Esquizoide, pautado em ciência e método estruturado.</p>
        </div>
      </li>

      <li class="esp-item">
        <span class="esp-icon" aria-hidden="true">💼</span>
        <div class="esp-content">
          <h3 class="esp-title">Orientação Profissional &amp; Transição de Carreira</h3>
          <p class="esp-desc">Direcionamento prático para profissionais, executivos e líderes em momentos de insatisfação, crise ou mudança de trajetória.</p>
        </div>
      </li>

      <li class="esp-item">
        <span class="esp-icon" aria-hidden="true">🤝</span>
        <div class="esp-content">
          <h3 class="esp-title">Conflitos &amp; Relacionamentos</h3>
          <p class="esp-desc">Intervenções sistêmicas para melhoria de habilidades sociais, gerenciamento de conflitos e dinâmicas interpessoais complexas.</p>
        </div>
      </li>

    </ul>
  </div>
</section>
```

- [ ] **Step 2: Adicionar CSS das especialidades**

```css
/* ===========================
   ESPECIALIDADES
=========================== */
#especialidades {
  padding: var(--space-xl) 0;
}

.esp-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.esp-item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-md);
  padding: var(--space-md);
  border-left: 3px solid var(--color-primary);
  background: #f7fbfa;
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
  transition: box-shadow var(--transition);
}

.esp-item:hover {
  box-shadow: var(--shadow-card);
}

.esp-icon {
  font-size: 22px;
  flex-shrink: 0;
  margin-top: 2px;
  line-height: 1;
}

.esp-content { flex: 1; min-width: 0; }

.esp-title {
  font-size: 14px;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: var(--space-xs);
}

.esp-desc {
  font-size: 12px;
  color: var(--color-text-light);
  line-height: 1.5;
}

/* Desktop: grid 2 colunas */
@media (min-width: 768px) {
  #especialidades { padding: var(--space-2xl) 0; }

  .esp-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-md);
  }

  /* Último item (5º) ocupa meia largura centralizado */
  .esp-item:last-child {
    grid-column: 1 / 2;
  }
}
```

- [ ] **Step 3: Verificar no browser**

Mobile: lista vertical com 5 itens, borda teal à esquerda.
Desktop: grid 2 colunas, 5º item na coluna esquerda.

- [ ] **Step 4: Commit**

```powershell
git add index.html css/style.css
git commit -m "feat: seção especialidades com lista mobile-first"
```

---

## Task 5: Abordagem Técnica

**Files:**
- Modify: `index.html` — preencher `<section id="abordagem">`
- Modify: `css/style.css` — adicionar estilos

- [ ] **Step 1: Preencher a seção abordagem**

Substitua `<section id="abordagem" aria-labelledby="abord-titulo"></section>` por:

```html
<section id="abordagem" aria-labelledby="abord-titulo">
  <div class="container">
    <h2 class="section-title" id="abord-titulo">Prática Clínica Pautada na Ciência</h2>
    <p class="section-sub">Ferramentas estruturadas e dados psicométricos para metas claras de tratamento e autorregulação emocional</p>

    <div class="abord-grid">

      <article class="abord-card">
        <span class="abord-icon" aria-hidden="true">🧠</span>
        <div>
          <h3 class="abord-title">Terapia Cognitivo-Comportamental (TCC)</h3>
          <p class="abord-desc">A abordagem com maior evidência científica para ansiedade, depressão e burnout. Foco em identificar e reestruturar padrões de pensamento e comportamento disfuncionais.</p>
        </div>
      </article>

      <article class="abord-card">
        <span class="abord-icon" aria-hidden="true">📊</span>
        <div>
          <h3 class="abord-title">Psicodiagnóstico &amp; Dados Psicométricos</h3>
          <p class="abord-desc">Avaliação estruturada com instrumentos validados para definir metas claras de tratamento e acompanhar a evolução ao longo das sessões.</p>
        </div>
      </article>

      <article class="abord-card">
        <span class="abord-icon" aria-hidden="true">🎯</span>
        <div>
          <h3 class="abord-title">Coaching Ontológico</h3>
          <p class="abord-desc">Integrado ao processo clínico para profissionais em transição de carreira, reposicionamento de missão pessoal e desenvolvimento de liderança.</p>
        </div>
      </article>

    </div>
  </div>
</section>
```

- [ ] **Step 2: Adicionar CSS da abordagem**

```css
/* ===========================
   ABORDAGEM
=========================== */
#abordagem {
  background: var(--color-bg-soft);
  padding: var(--space-xl) 0;
}

.abord-grid {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.abord-card {
  background: var(--color-bg);
  border-radius: var(--radius-md);
  padding: var(--space-md);
  border: 1px solid var(--color-primary-border);
  display: flex;
  gap: var(--space-md);
  align-items: flex-start;
  box-shadow: var(--shadow-card);
}

.abord-icon {
  font-size: 28px;
  flex-shrink: 0;
  line-height: 1;
  margin-top: 2px;
}

.abord-title {
  font-size: 14px;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: var(--space-xs);
}

.abord-desc {
  font-size: 12px;
  color: var(--color-text-light);
  line-height: 1.6;
}

@media (min-width: 768px) {
  #abordagem { padding: var(--space-2xl) 0; }

  .abord-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-md);
  }
}
```

- [ ] **Step 3: Verificar no browser**

Mobile: 3 cards em coluna.
Desktop: 3 cards em linha (grid 3 colunas).

- [ ] **Step 4: Commit**

```powershell
git add index.html css/style.css
git commit -m "feat: seção abordagem técnica TCC/psicodiagnóstico/coaching"
```

---

## Task 6: Sobre a Profissional

**Files:**
- Modify: `index.html` — preencher `<section id="sobre">`
- Modify: `css/style.css` — adicionar estilos

- [ ] **Step 1: Preencher a seção sobre**

Substitua `<section id="sobre" aria-labelledby="sobre-titulo"></section>` por:

```html
<section id="sobre" aria-labelledby="sobre-titulo">
  <div class="container">
    <h2 class="section-title" id="sobre-titulo">Flavia Takayama</h2>
    <p class="section-sub">Psicóloga Clínica &amp; Organizacional · CRP 05/55605-3</p>

    <div class="sobre-inner">

      <div class="sobre-photo-wrap">
        <img src="img/flavia01.jpg"
             alt="Flavia Takayama — foto profissional"
             class="sobre-photo"
             width="160"
             height="192"
             loading="lazy">
      </div>

      <div class="sobre-text">
        <p class="sobre-bio">
          Com mais de 25 anos de formação e sólida bagagem como executiva de Recursos
          Humanos em grandes corporações, uno a inteligência analítica à maturidade clínica
          para conduzir processos profundos de transformação.
        </p>
        <p class="sobre-bio">
          Sou pós-graduada em Psicologia Clínica no Instituto do Coração (InCor), pela
          Faculdade de Medicina da USP (FMUSP), especialista em Orientação Profissional
          e Vocacional pelo Instituto Pieron e certificada em Coaching Ontológico pelo
          Instituto Opus. Minha prática é pautada em ciência, no método e na
          Terapia Cognitivo-Comportamental (TCC).
        </p>

        <ul class="seals-grid" role="list" aria-label="Formação e certificações">
          <li class="seal">
            <span class="seal-icon" aria-hidden="true">🎓</span>
            <span class="seal-text">Pós-graduada em Psicologia Clínica — FMUSP / InCor (USP)</span>
          </li>
          <li class="seal">
            <span class="seal-icon" aria-hidden="true">🏛️</span>
            <span class="seal-text">Especialista em Orientação Profissional e Vocacional — Instituto Pieron</span>
          </li>
          <li class="seal">
            <span class="seal-icon" aria-hidden="true">🧪</span>
            <span class="seal-text">Formação em Terapia Cognitivo-Comportamental — CETCC</span>
          </li>
          <li class="seal">
            <span class="seal-icon" aria-hidden="true">⚡</span>
            <span class="seal-text">Certificação em Coaching Ontológico — Instituto Opus</span>
          </li>
        </ul>
      </div>

    </div>
  </div>
</section>
```

- [ ] **Step 2: Adicionar CSS do sobre**

```css
/* ===========================
   SOBRE
=========================== */
#sobre {
  padding: var(--space-xl) 0;
}

.sobre-inner {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

/* Foto mobile: flutua à direita do texto */
.sobre-photo-wrap {
  float: right;
  margin: 0 0 var(--space-md) var(--space-md);
  flex-shrink: 0;
}

.sobre-photo {
  width: 100px;
  height: 120px;
  object-fit: cover;
  object-position: top center;
  border-radius: var(--radius-photo);
  box-shadow: var(--shadow-card);
}

.sobre-bio {
  font-size: 13px;
  color: var(--color-text);
  line-height: 1.7;
  margin-bottom: var(--space-md);
}

/* Limpa o float antes dos seals */
.sobre-text::after {
  content: '';
  display: table;
  clear: both;
}

/* Seals */
.seals-grid {
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-sm);
  margin-top: var(--space-md);
}

.seal {
  display: flex;
  align-items: flex-start;
  gap: var(--space-sm);
  background: var(--color-primary-light);
  border-radius: var(--radius-md);
  padding: var(--space-sm) var(--space-sm);
}

.seal-icon {
  font-size: 18px;
  flex-shrink: 0;
  line-height: 1;
  margin-top: 1px;
}

.seal-text {
  font-size: 11px;
  color: var(--color-text);
  line-height: 1.4;
  font-weight: 500;
}

/* Desktop: layout side-by-side */
@media (min-width: 768px) {
  #sobre { padding: var(--space-2xl) 0; }

  .sobre-inner {
    flex-direction: row;
    align-items: flex-start;
    gap: var(--space-2xl);
  }

  .sobre-photo-wrap {
    float: none;
    margin: 0;
  }

  .sobre-photo {
    width: 160px;
    height: 192px;
  }

  .sobre-text::after { display: none; }

  .sobre-bio { font-size: 14px; }
}
```

- [ ] **Step 3: Verificar no browser**

Mobile: foto flutua à direita do texto, seals em grid 2×2 abaixo.
Desktop: foto à esquerda em coluna separada do texto.

- [ ] **Step 4: Commit**

```powershell
git add index.html css/style.css
git commit -m "feat: seção sobre com bio e selos de formação"
```

---

## Task 7: FAQ

**Files:**
- Modify: `index.html` — preencher `<section id="faq">`
- Modify: `css/style.css` — adicionar estilos

- [ ] **Step 1: Preencher a seção FAQ**

Substitua `<section id="faq" aria-labelledby="faq-titulo"></section>` por:

```html
<section id="faq" aria-labelledby="faq-titulo">
  <div class="container">
    <h2 class="section-title" id="faq-titulo">Informações Práticas</h2>
    <p class="section-sub">Tudo que você precisa saber antes de agendar</p>

    <dl class="faq-list">

      <div class="faq-item">
        <dt class="faq-q">
          <span class="faq-marker" aria-hidden="true">?</span>
          Sigilo e segurança da sessão online
        </dt>
        <dd class="faq-a">
          Atendimento 100% online realizado por plataformas com criptografia de ponta a ponta.
          Sigilo profissional absoluto garantido pelo Código de Ética do Conselho Federal de
          Psicologia (CFP).
        </dd>
      </div>

      <div class="faq-item">
        <dt class="faq-q">
          <span class="faq-marker" aria-hidden="true">?</span>
          Nota fiscal e reembolso pelo plano de saúde
        </dt>
        <dd class="faq-a">
          Emitimos Nota Fiscal de serviços de Psicologia (CNAE 8650-0/03) para que você possa
          solicitar o reembolso integral ou parcial junto ao seu plano de saúde
          (Omint, SulAmérica, Bradesco etc.) ou utilizar na dedução do seu Imposto de Renda.
        </dd>
      </div>

      <div class="faq-item">
        <dt class="faq-q">
          <span class="faq-marker" aria-hidden="true">?</span>
          Como funciona a primeira consulta?
        </dt>
        <dd class="faq-a">
          A primeira sessão é uma entrevista clínica estruturada para mapeamento aprofundado
          da sua demanda e alinhamento de expectativas. Realizamos também a aplicação de
          instrumentos de psicodiagnóstico quando indicado. Agendamento direto via WhatsApp.
        </dd>
      </div>

    </dl>
  </div>
</section>
```

- [ ] **Step 2: Adicionar CSS do FAQ**

```css
/* ===========================
   FAQ
=========================== */
#faq {
  background: var(--color-bg-soft);
  padding: var(--space-xl) 0;
}

.faq-list {
  display: flex;
  flex-direction: column;
}

.faq-item {
  border-bottom: 1px solid var(--color-primary-border);
  padding: var(--space-md) 0;
}

.faq-item:last-child { border-bottom: none; }

.faq-q {
  display: flex;
  align-items: flex-start;
  gap: var(--space-sm);
  font-size: 14px;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: var(--space-sm);
}

.faq-marker {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  background: var(--color-primary);
  color: white;
  font-size: 12px;
  font-weight: 800;
  border-radius: 50%;
  margin-top: 1px;
}

.faq-a {
  font-size: 13px;
  color: var(--color-text-light);
  line-height: 1.6;
  padding-left: 28px;
}

@media (min-width: 768px) {
  #faq { padding: var(--space-2xl) 0; }
  .faq-q { font-size: 15px; }
  .faq-a { font-size: 14px; }
}
```

- [ ] **Step 3: Verificar no browser**

3 perguntas com separadores, marcador circular verde-teal com "?".

- [ ] **Step 4: Commit**

```powershell
git add index.html css/style.css
git commit -m "feat: seção FAQ com sigilo, NF e primeira consulta"
```

---

## Task 8: Footer CTA + Footer + Sticky WhatsApp

**Files:**
- Modify: `index.html` — preencher `<section id="footer-cta">`, `<footer>`, `<div id="sticky-wa">`
- Modify: `css/style.css` — adicionar estilos

- [ ] **Step 1: Preencher footer-cta, footer e sticky no index.html**

Substitua os três elementos:

```html
  <section id="footer-cta" aria-label="Chamada para ação">
    <div class="container fca-inner">
      <h2 class="fca-title">Pronto para recuperar o equilíbrio?</h2>
      <p class="fca-sub">Entre em contato agora. O primeiro passo é uma conversa.</p>
      <a href="#"
         class="btn-wa wa-link"
         data-label="footer-cta"
         target="_blank"
         rel="noopener"
         aria-label="Agendar consulta via WhatsApp">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.556 4.122 1.528 5.856L0 24l6.335-1.51A11.96 11.96 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.895 0-3.673-.513-5.196-1.408l-.371-.22-3.849.917.943-3.741-.241-.385A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
        </svg>
        Agendar Consulta via WhatsApp
      </a>
    </div>
  </section>

  <footer id="rodape">
    <div class="container rodape-inner">
      <p>© 2026 Triskelion Desenvolvimento Humano · Flavia Takayama · CRP 05/55605-3</p>
      <p>CNAE 8650-0/03 · Psicologia Clínica · <a href="politica-privacidade.html">Política de Privacidade</a></p>
    </div>
  </footer>

  <div id="sticky-wa" role="complementary" aria-label="Agendar via WhatsApp">
    <a href="#"
       class="sticky-wa-link wa-link"
       data-label="sticky"
       target="_blank"
       rel="noopener"
       aria-label="Agendar consulta via WhatsApp — botão fixo">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.556 4.122 1.528 5.856L0 24l6.335-1.51A11.96 11.96 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.895 0-3.673-.513-5.196-1.408l-.371-.22-3.849.917.943-3.741-.241-.385A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
      </svg>
      Agendar Consulta via WhatsApp
    </a>
  </div>
```

- [ ] **Step 2: Adicionar CSS do footer e sticky**

```css
/* ===========================
   FOOTER CTA
=========================== */
#footer-cta {
  background: var(--color-primary);
  padding: var(--space-xl) 0;
  text-align: center;
}

.fca-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-md);
}

.fca-title {
  font-family: var(--font-heading);
  font-size: clamp(20px, 4vw, 28px);
  font-weight: 800;
  color: white;
}

.fca-sub {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.85);
  max-width: 400px;
}

/* ===========================
   FOOTER
=========================== */
#rodape {
  background: #1A2A26;
  padding: var(--space-md) 0;
  text-align: center;
}

.rodape-inner {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

#rodape p,
#rodape a {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.45);
  line-height: 1.6;
}

#rodape a:hover { color: rgba(255, 255, 255, 0.7); }

/* ===========================
   STICKY WHATSAPP — mobile only
=========================== */
#sticky-wa {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 200;
  display: block;
}

.sticky-wa-link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  background: var(--color-cta-wa);
  color: white;
  font-size: 14px;
  font-weight: 700;
  padding: 14px var(--space-md);
  width: 100%;
  transition: background var(--transition);
}

.sticky-wa-link:hover { background: var(--color-cta-wa-hover); }

/* Ocultar sticky no desktop (>= 768px) */
@media (min-width: 768px) {
  #sticky-wa { display: none; }
}

/* Margem no rodapé para não sobrepor conteúdo no mobile */
@media (max-width: 767px) {
  #rodape { padding-bottom: calc(var(--space-md) + 52px); }
}
```

- [ ] **Step 3: Verificar no browser**

- Seção verde escura "Pronto para recuperar o equilíbrio?" com botão WA
- Rodapé escuro com copyright
- Mobile: barra verde fixa no bottom
- Desktop: barra fixa sumiu

- [ ] **Step 4: Commit**

```powershell
git add index.html css/style.css
git commit -m "feat: footer CTA, rodapé e sticky WhatsApp mobile"
```

---

## Task 9: JavaScript — WhatsApp links + GA4 events

**Files:**
- Modify: `js/main.js` — implementação completa

- [ ] **Step 1: Implementar main.js completo**

Substitua o conteúdo de `js/main.js`:

```javascript
(function () {
  'use strict';

  var WA_NUMBER = '5511983868766';
  var WA_MESSAGE = 'Olá, gostaria de agendar uma consulta.';
  var WA_URL = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(WA_MESSAGE);

  // Dispara evento GA4 se gtag estiver carregado
  function trackEvent(eventName, params) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
    }
  }

  // Configura todos os elementos .wa-link com URL e tracking
  function setupWALinks() {
    var links = document.querySelectorAll('.wa-link');
    links.forEach(function (el) {
      el.setAttribute('href', WA_URL);
      el.addEventListener('click', function () {
        var label = el.getAttribute('data-label') || 'desconhecido';
        trackEvent('whatsapp_click', {
          event_category: 'CTA',
          event_label: label,
        });
      });
    });
  }

  // Smooth scroll para links âncora internos (nav desktop)
  function setupSmoothScroll() {
    var anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    setupWALinks();
    setupSmoothScroll();
  });

})();
```

- [ ] **Step 2: Verificar no browser**

Abra DevTools (F12) → Console. Clique em qualquer botão WhatsApp:
- Deve abrir `https://wa.me/5511983868766?text=...` em nova aba
- Console não deve ter erros

- [ ] **Step 3: Commit**

```powershell
git add js/main.js
git commit -m "feat: JS para links WhatsApp, tracking GA4 e smooth scroll"
```

---

## Task 10: Meta Tags, OG, GA4 + QA Final

**Files:**
- Modify: `index.html` — adicionar meta tags completas e script GA4 no `<head>`

- [ ] **Step 1: Atualizar o `<head>` do index.html**

Substitua o bloco `<head>` atual por:

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- SEO -->
  <title>Flavia Takayama — Psicoterapia de Alta Complexidade | Triskelion</title>
  <meta name="description" content="Psicoterapia de alta complexidade online (TCC). Atendimento para ansiedade, depressão grave, burnout e orientação profissional. Psicóloga com pós-graduação pela USP. Agende via WhatsApp.">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://www.triskelion.com.br/">

  <!-- Open Graph (WhatsApp, LinkedIn, Facebook) -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="Flavia Takayama — Psicoterapia de Alta Complexidade">
  <meta property="og:description" content="Atendimento clínico online (TCC) para ansiedade, depressão, burnout e transições de carreira. Psicóloga sênior com pós-graduação pela USP.">
  <meta property="og:image" content="img/flavia01.jpg">
  <meta property="og:url" content="https://www.triskelion.com.br/">
  <meta property="og:locale" content="pt_BR">

  <!-- Performance hints -->
  <link rel="preconnect" href="https://www.googletagmanager.com">
  <link rel="dns-prefetch" href="https://www.googletagmanager.com">

  <!-- Google Analytics 4 -->
  <!-- AÇÃO NECESSÁRIA: substitua G-XXXXXXXXXX pelo Measurement ID da sua propriedade GA4 -->
  <!-- Crie em: analytics.google.com → Admin → Criar propriedade → Fluxo de dados web -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  </script>

  <link rel="stylesheet" href="css/style.css">
</head>
```

- [ ] **Step 2: Checklist de QA — verificar no browser**

Abra `index.html` com DevTools → aba Network, aba Console, Device Mode.

**Mobile (390px):**
- [ ] Nav: logo + CRP visíveis, sem botão WA
- [ ] Hero: título + foto lado a lado, botão WA verde abaixo
- [ ] Trust bar: 3 itens (25+ / USP / TCC)
- [ ] Especialidades: 5 itens em lista vertical com borda teal
- [ ] Abordagem: 3 cards em coluna
- [ ] Sobre: foto flutua à direita, 4 seals em grid
- [ ] FAQ: 3 perguntas com separadores
- [ ] Footer CTA: fundo teal, botão WA
- [ ] Sticky WA: barra verde fixa no bottom visível
- [ ] Nenhum erro no Console

**Desktop (1280px):**
- [ ] Nav: botão WA visível à direita
- [ ] Hero: foto 200×240 à direita, 4 itens na trust bar
- [ ] Especialidades: grid 2 colunas
- [ ] Abordagem: 3 colunas
- [ ] Sobre: foto à esquerda, texto à direita
- [ ] Sticky WA: **não visível**
- [ ] Nenhum erro no Console

**Funcional:**
- [ ] Todos os botões WA abrem `wa.me/5511983868766` em nova aba
- [ ] Console mostra chamada a `gtag('event', 'whatsapp_click', ...)` no clique (se GA4 não estiver configurado, erro de rede é esperado — não de JS)

- [ ] **Step 3: Substituir o ID do GA4 (quando disponível)**

Quando você tiver o Measurement ID do GA4 (formato `G-XXXXXXXXXX`):

```powershell
# Substitua G-XXXXXXXXXX pelo ID real nos dois lugares do index.html
(Get-Content index.html) -replace 'G-XXXXXXXXXX', 'G-SEU_ID_REAL' | Set-Content index.html
```

- [ ] **Step 4: Commit final**

```powershell
git add index.html
git commit -m "feat: meta tags SEO, OG e integração GA4"
```

- [ ] **Step 5: Commit de fechamento**

```powershell
git tag v1.0.0
git log --oneline
```

Esperado: log com 10 commits da task 1 até aqui.

---

## Itens de Deploy (não bloqueantes para desenvolvimento)

| Item | Status | Ação |
|---|---|---|
| `img/flavia01.jpg` | Pendente usuário | Adicionar na pasta `img/` |
| `img/logo.png` | Pendente usuário | Adicionar logo Triskelion em PNG |
| GA4 Measurement ID | Pendente usuário | Criar propriedade em analytics.google.com |
| Domínio / hospedagem | A definir | Netlify Drop, GitHub Pages ou servidor próprio |
| `canonical` URL | A definir | Atualizar `<link rel="canonical">` no `<head>` |
