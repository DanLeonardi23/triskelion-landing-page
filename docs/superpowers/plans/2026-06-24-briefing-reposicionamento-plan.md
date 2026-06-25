# Reposicionamento da Landing Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reescrever o copy e reorganizar as seções de `index.html`/`css/style.css` conforme o spec `docs/superpowers/specs/2026-06-24-briefing-reposicionamento-design.md`, sem framework, sem build step.

**Architecture:** Site estático de página única (`index.html` + `css/style.css` + `js/main.js`, sem alterações de JS necessárias). Cada tarefa edita um bloco contíguo de HTML e/ou CSS. Não há suíte de testes automatizados neste projeto (HTML/CSS puro) — cada tarefa substitui "rodar teste" por "grep de sanity check" (confirma que o texto novo está presente e o antigo não) e a tarefa final exige verificação visual no navegador.

**Tech Stack:** HTML5, CSS puro (custom properties), JS vanilla (inalterado).

---

## Estado atual relevante (antes de qualquer edição)

- `index.html` tem 356 linhas; seções por id: `nav`, `hero`, `especialidades`, `abordagem`, `sobre`, `faq`, `footer-cta`, `rodape`, `sticky-wa`.
- `css/style.css` tem 672 linhas; blocos por comentário: `:root`, RESET, UTILITÁRIOS, `.btn-wa`, `NAV`, `HERO`, `ESPECIALIDADES`, `ABORDAGEM`, `SOBRE`, `FAQ`, `FOOTER CTA`, `FOOTER / RODAPÉ`, `STICKY WHATSAPP`.
- O working tree tem mudanças não commitadas (palette, hero com foto de fundo full-bleed via `#hero::before`/`#hero::after`, `img/flavia03.png` untracked) — este plano assume esse estado como ponto de partida e o substitui pelas tarefas abaixo.

---

### Task 1: Unificar texto dos CTAs WhatsApp em "Agendar uma conversa inicial"

**Files:**
- Modify: `index.html` (4 ocorrências de texto de botão)

- [ ] **Step 1: Editar o texto do CTA da nav**

Em `index.html`, dentro de `<a class="btn-wa nav-cta wa-link" ...>` (linha ~62), troque o texto `WhatsApp` por `Agendar uma conversa inicial`.

- [ ] **Step 2: Editar o texto do CTA do hero**

No botão primário do hero (linha ~100), troque `Agendar Consulta via WhatsApp` por `Agendar uma conversa inicial`.

- [ ] **Step 3: Editar o texto do CTA do footer-cta**

No botão de `#footer-cta` (linha ~324), troque `Agendar Consulta via WhatsApp` por `Agendar uma conversa inicial`.

- [ ] **Step 4: Editar o texto do botão sticky**

No botão de `#sticky-wa` (linha ~348), troque `Agendar Consulta via WhatsApp` por `Agendar uma conversa inicial`.

- [ ] **Step 5: Sanity check**

Run: `grep -c "Agendar uma conversa inicial" index.html`
Expected: `4`

Run: `grep -c "Agendar Consulta via WhatsApp" index.html`
Expected: `0`

- [ ] **Step 6: Commit**

```bash
git add index.html
git commit -m "feat: unifica texto dos CTAs WhatsApp para 'Agendar uma conversa inicial'"
```

---

### Task 2: Reescrever copy do Hero e reverter foto para retrato pequeno

**Files:**
- Modify: `index.html:70-126` (seção `#hero`)
- Modify: `css/style.css:99-129` (`.btn-wa`, adicionar `.btn-outline`)
- Modify: `css/style.css:185-309` (bloco `HERO`)

- [ ] **Step 1: Reescrever o H1 e o subtítulo no HTML**

Em `index.html`, dentro de `.hero-text`, substitua:

```html
            <h1 class="hero-h1">
              Psicoterapia de Alta Complexidade<br>
              Baseada em Evidências
            </h1>

            <p class="hero-sub">
              Atendimento clínico online (TCC) estruturado para o manejo de sofrimento
              emocional agudo e transições de carreira.<br>
              Conduzido por psicóloga sênior
              com pós-graduação pela USP e sólida bagagem corporativa.
            </p>
```

por:

```html
            <h1 class="hero-h1">
              Há momentos em que contar com suporte profissional nos ajuda a
              atravessar desafios com mais clareza, equilíbrio e presença.
            </h1>

            <p class="hero-sub">
              Atendimento psicológico online para pessoas que enfrentam ansiedade,
              estresse crônico, depressão, transições de vida, desafios de
              relacionamento ou momentos de redefinição de propósito.
            </p>
```

- [ ] **Step 2: Envolver os dois CTAs do hero em `.hero-ctas` e adicionar o botão secundário**

Substitua o bloco do botão primário do hero (já com texto atualizado pela Task 1):

```html
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
              Agendar uma conversa inicial
            </a>
          </div>

        </div><!-- /.hero-inner -->
```

por:

```html
            <div class="hero-ctas">
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
                Agendar uma conversa inicial
              </a>
              <a href="#como-funciona" class="btn-outline">Conheça minha abordagem</a>
            </div>
          </div>

          <div class="hero-photo-wrap">
            <img src="img/flavia01.png"
                 alt="Flavia Takayama, psicóloga clínica — foto profissional"
                 class="hero-photo"
                 width="200"
                 height="240"
                 loading="eager"
                 fetchpriority="high">
          </div>

        </div><!-- /.hero-inner -->
```

- [ ] **Step 3: Adicionar `.btn-outline` ao CSS**

Em `css/style.css`, logo após o bloco `.btn-wa svg { flex-shrink: 0; }` (linha 128), adicione:

```css
.btn-outline {
  display: inline-flex;
  align-items: center;
  background: transparent;
  color: var(--color-primary-dark);
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 700;
  padding: 12px 20px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-primary-border);
  transition: background var(--transition);
}

.btn-outline:hover { background: var(--color-primary-light); }

.hero-ctas {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
}
```

- [ ] **Step 4: Reverter o bloco HERO no CSS para retrato pequeno (remover background full-bleed)**

Em `css/style.css`, substitua todo o bloco `HERO` (das linhas 185 a 309) por:

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
  font-weight: 700;
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

.hero-photo-wrap { flex-shrink: 0; }

.hero-photo {
  width: 90px;
  height: 108px;
  object-fit: cover;
  object-position: top center;
  border-radius: var(--radius-photo);
  box-shadow: var(--shadow-card);
}

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
  font-weight: 700;
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

.hero-trust-desktop { display: none; }

@media (min-width: 768px) {
  #hero { padding: var(--space-2xl) 0; }

  .hero-inner { gap: var(--space-2xl); }

  .hero-photo {
    width: 200px;
    height: 240px;
  }

  .hero-trust {
    justify-content: flex-start;
    gap: var(--space-2xl);
  }

  .hero-trust-desktop { display: flex; }
}
```

- [ ] **Step 5: Sanity check**

Run: `grep -c "hero-photo-wrap" index.html`
Expected: `1`

Run: `grep -c "hero::before" css/style.css`
Expected: `0`

Run: `grep -c "Conheça minha abordagem" index.html`
Expected: `1`

- [ ] **Step 6: Commit**

```bash
git add index.html css/style.css
git commit -m "feat: reescreve hero com novo copy e reverte foto para retrato pequeno"
```

---

### Task 3: Reescrever Especialidades com novas 5 categorias e ícones SVG de linha

**Files:**
- Modify: `index.html:127-176` (seção `#especialidades`)
- Modify: `css/style.css:311-374` (bloco `ESPECIALIDADES`)

- [ ] **Step 1: Substituir a `<ul class="esp-list">` inteira**

Em `index.html`, substitua todo o conteúdo de `<ul class="esp-list" role="list">...</ul>` (linhas 132-174) por:

```html
        <ul class="esp-list" role="list">

          <li class="esp-item">
            <span class="esp-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 21s-7-4.35-9.5-8.5C.5 8 3 4 7 4c2 0 3.5 1.2 4 2.5C11.5 5.2 13 4 15 4c4 0 6.5 4 4.5 8.5C19 16.65 12 21 12 21z"/></svg>
            </span>
            <div class="esp-content">
              <h3 class="esp-title">Ansiedade, depressão e sofrimento emocional</h3>
              <p class="esp-desc">Quando emoções difíceis passam a interferir no bem-estar, nos relacionamentos ou na capacidade de aproveitar a própria vida.</p>
            </div>
          </li>

          <li class="esp-item">
            <span class="esp-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l4 2"/></svg>
            </span>
            <div class="esp-content">
              <h3 class="esp-title">Estresse crônico e burnout</h3>
              <p class="esp-desc">Para pessoas que convivem com sobrecarga constante, pressão por desempenho, exaustão emocional ou perda de equilíbrio entre vida pessoal e profissional.</p>
            </div>
          </li>

          <li class="esp-item">
            <span class="esp-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="9"/><path d="M15 9l-2 6-6 2 2-6z"/></svg>
            </span>
            <div class="esp-content">
              <h3 class="esp-title">Carreira, transições e propósito</h3>
              <p class="esp-desc">Mudanças profissionais, dilemas complexos, decisões difíceis, redefinição de objetivos, perda de sentido ou adaptação a novos ciclos de vida.</p>
            </div>
          </li>

          <li class="esp-item">
            <span class="esp-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="8" r="3"/><path d="M2 20c0-3 2.5-5 6-5s6 2 6 5"/><circle cx="17" cy="9" r="2.5"/><path d="M14.5 20c.3-2.3 2-4 4.5-4s4.2 1.7 4.5 4"/></svg>
            </span>
            <div class="esp-content">
              <h3 class="esp-title">Relacionamentos e conflitos interpessoais</h3>
              <p class="esp-desc">Questões conjugais, familiares ou profissionais que impactam a qualidade de vida, a saúde emocional e a capacidade de construir relações satisfatórias.</p>
            </div>
          </li>

          <li class="esp-item">
            <span class="esp-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></svg>
            </span>
            <div class="esp-content">
              <h3 class="esp-title">Liderança e desenvolvimento executivo</h3>
              <p class="esp-desc">Espaço de reflexão para líderes, executivos e profissionais que desejam ampliar autoconhecimento, clareza, influência e capacidade de decisão em contextos complexos.</p>
            </div>
          </li>

        </ul>
```

- [ ] **Step 2: Atualizar `.esp-icon` no CSS para tamanho de SVG em vez de emoji**

Em `css/style.css`, substitua:

```css
.esp-icon {
  font-size: 22px;
  flex-shrink: 0;
  margin-top: 2px;
  line-height: 1;
}
```

por:

```css
.esp-icon {
  flex-shrink: 0;
  margin-top: 2px;
  color: var(--color-primary);
}

.esp-icon svg {
  width: 24px;
  height: 24px;
  display: block;
}
```

- [ ] **Step 3: Sanity check**

Run: `grep -c "Liderança e desenvolvimento executivo" index.html`
Expected: `1`

Run: `grep -c "Transtornos de Personalidade" index.html`
Expected: `0`

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "feat: reescreve especialidades por desafios de vida com ícones de linha SVG"
```

---

### Task 4: Substituir Abordagem Técnica por Diferenciais

**Files:**
- Modify: `index.html:177-210` (seção `#abordagem` → `#diferenciais`)
- Modify: `css/style.css:376-429` (bloco `ABORDAGEM` → `DIFERENCIAIS`)

- [ ] **Step 1: Substituir a seção inteira no HTML**

Em `index.html`, substitua a seção `<section id="abordagem" ...>...</section>` (linhas 177-210) por:

```html
    <section id="diferenciais" aria-labelledby="dif-titulo">
      <div class="container dif-inner">
        <div class="dif-text">
          <h2 class="section-title" id="dif-titulo">Uma trajetória que integra psicologia, desenvolvimento humano e experiência organizacional</h2>
          <p class="dif-desc">Além da atuação clínica, acumulo mais de duas décadas de experiência em desenvolvimento de lideranças, coaching executivo, recursos humanos e transformação organizacional em empresas nacionais e multinacionais.</p>
          <p class="dif-desc">Essa trajetória amplia minha compreensão sobre os desafios emocionais, relacionais e profissionais vividos por pessoas que ocupam posições de responsabilidade, enfrentam decisões complexas ou atravessam períodos de intensa transformação pessoal.</p>
        </div>
        <div class="dif-photo-wrap">
          <img src="img/flavia03.png"
               alt="Flavia Takayama em momento de reflexão"
               class="dif-photo"
               width="320"
               height="380"
               loading="lazy">
        </div>
      </div>
    </section>
```

- [ ] **Step 2: Substituir o bloco CSS `ABORDAGEM` por `DIFERENCIAIS`**

Em `css/style.css`, substitua o bloco completo (linhas 376-429) por:

```css
/* ===========================
   DIFERENCIAIS
=========================== */
#diferenciais {
  background: var(--color-bg-soft);
  padding: var(--space-xl) 0;
}

.dif-inner {
  display: flex;
  flex-direction: column-reverse;
  gap: var(--space-lg);
}

.dif-photo-wrap { flex-shrink: 0; }

.dif-photo {
  width: 100%;
  max-width: 280px;
  height: auto;
  object-fit: cover;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-card);
  margin: 0 auto;
}

.dif-text { flex: 1; min-width: 0; }

.dif-desc {
  font-size: 13px;
  color: var(--color-text-light);
  line-height: 1.7;
  margin-top: var(--space-sm);
}

@media (min-width: 768px) {
  #diferenciais { padding: var(--space-2xl) 0; }

  .dif-inner {
    flex-direction: row;
    align-items: center;
    gap: var(--space-2xl);
  }

  .dif-photo-wrap { width: 280px; }

  .dif-desc { font-size: 14px; }
}
```

- [ ] **Step 3: Sanity check**

Run: `grep -c "id=\"diferenciais\"" index.html`
Expected: `1`

Run: `grep -c "id=\"abordagem\"" index.html`
Expected: `0`

Run: `grep -c "flavia03.png" index.html`
Expected: `1`

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "feat: substitui seção Abordagem Técnica por Diferenciais com flavia03.png"
```

---

### Task 5: Confirmar que a ordem da bio em Sobre já atende ao briefing

**Files:**
- Nenhuma edição — apenas verificação.

- [ ] **Step 1: Ler `index.html:227-239` e confirmar a ordem dos parágrafos**

O parágrafo 1 atual já fala de experiência profissional + maturidade clínica (responde "por que confiar nesta profissional"), e o parágrafo 2 já traz a formação acadêmica por último. Isso já está de acordo com o spec — nenhuma edição é necessária nesta tarefa.

- [ ] **Step 2: Sanity check**

Run: `grep -n "Com mais de 25 anos de formação" index.html`
Expected: linha do parágrafo 1, antes da linha que contém `grep -n "Sou pós-graduada"`.

(Sem commit — nenhuma mudança de arquivo.)

---

### Task 6: Adicionar seção "Para quem" (novo, entre Sobre e Como funciona)

**Files:**
- Modify: `index.html` (inserir nova `<section>` logo depois de `</section>` que fecha `#sobre`, linha ~263)
- Modify: `css/style.css` (novo bloco `PARA QUEM`, inserir após o bloco `SOBRE`)

- [ ] **Step 1: Inserir a seção no HTML**

Em `index.html`, imediatamente depois da linha `    </section>` que fecha `#sobre` (linha 263) e antes de `    <section id="faq" ...>`, insira:

```html
    <section id="para-quem" aria-labelledby="para-quem-titulo">
      <div class="container">
        <h2 class="section-title" id="para-quem-titulo">Para quem este trabalho costuma fazer sentido</h2>

        <ul class="check-list" role="list">
          <li class="check-item"><span class="check-icon" aria-hidden="true">✓</span><span>Pessoas que buscam mais do que o alívio imediato dos sintomas.</span></li>
          <li class="check-item"><span class="check-icon" aria-hidden="true">✓</span><span>Profissionais vivendo momentos de alta pressão ou responsabilidade.</span></li>
          <li class="check-item"><span class="check-icon" aria-hidden="true">✓</span><span>Pessoas atravessando mudanças importantes de vida ou carreira.</span></li>
          <li class="check-item"><span class="check-icon" aria-hidden="true">✓</span><span>Indivíduos interessados em compreender padrões emocionais recorrentes.</span></li>
          <li class="check-item"><span class="check-icon" aria-hidden="true">✓</span><span>Quem valoriza um trabalho terapêutico ético, estruturado e baseado em evidências.</span></li>
          <li class="check-item"><span class="check-icon" aria-hidden="true">✓</span><span>Pessoas dispostas a investir em autoconhecimento, desenvolvimento emocional e qualidade de vida.</span></li>
        </ul>
      </div>
    </section>
```

- [ ] **Step 2: Adicionar o bloco CSS `PARA QUEM`**

Em `css/style.css`, ao final do bloco `SOBRE` (depois da regra `.sobre-bio { font-size: 14px; }` dentro do `@media (min-width: 768px)`, antes do comentário `FAQ`), insira:

```css
/* ===========================
   PARA QUEM
=========================== */
#para-quem {
  padding: var(--space-xl) 0;
}

.check-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.check-item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-sm);
  font-size: 13px;
  color: var(--color-text);
  line-height: 1.5;
}

.check-icon {
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--color-primary-light);
  color: var(--color-primary-dark);
  font-weight: 700;
  font-size: 12px;
}

@media (min-width: 768px) {
  #para-quem { padding: var(--space-2xl) 0; }

  .check-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-lg) var(--space-2xl);
  }

  .check-item { font-size: 14px; }
}
```

- [ ] **Step 3: Sanity check**

Run: `grep -c "id=\"para-quem\"" index.html`
Expected: `1`

Run: `grep -c "check-item" index.html`
Expected: `6`

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "feat: adiciona seção 'Para quem este trabalho costuma fazer sentido'"
```

---

### Task 7: Adicionar seção "Como funciona" (novo, entre Para quem e FAQ)

**Files:**
- Modify: `index.html` (inserir após a nova seção `#para-quem`)
- Modify: `css/style.css` (novo bloco `COMO FUNCIONA`, inserir após o bloco `PARA QUEM`)

- [ ] **Step 1: Inserir a seção no HTML**

Em `index.html`, imediatamente depois de `</section>` que fecha `#para-quem` (criada na Task 6) e antes de `<section id="faq" ...>`, insira:

```html
    <section id="como-funciona" aria-labelledby="cf-titulo">
      <div class="container">
        <h2 class="section-title" id="cf-titulo">Como funciona</h2>

        <ol class="cf-steps" role="list">
          <li class="cf-step">
            <span class="cf-num">01</span>
            <div>
              <h3 class="cf-step-title">Conversa inicial</h3>
              <p class="cf-step-desc">Conversa inicial para compreensão da demanda e das expectativas.</p>
            </div>
          </li>
          <li class="cf-step">
            <span class="cf-num">02</span>
            <div>
              <h3 class="cf-step-title">Avaliação</h3>
              <p class="cf-step-desc">Avaliação das necessidades e definição dos objetivos terapêuticos.</p>
            </div>
          </li>
          <li class="cf-step">
            <span class="cf-num">03</span>
            <div>
              <h3 class="cf-step-title">Plano de trabalho</h3>
              <p class="cf-step-desc">Construção de um plano de trabalho personalizado.</p>
            </div>
          </li>
          <li class="cf-step">
            <span class="cf-num">04</span>
            <div>
              <h3 class="cf-step-title">Acompanhamento</h3>
              <p class="cf-step-desc">Acompanhamento contínuo e revisão periódica dos avanços.</p>
            </div>
          </li>
        </ol>

        <p class="cf-note">Cada processo é único e respeita o momento, a história e os objetivos de cada pessoa.</p>
      </div>
    </section>
```

- [ ] **Step 2: Adicionar o bloco CSS `COMO FUNCIONA`**

Em `css/style.css`, imediatamente após o bloco `PARA QUEM` (criado na Task 6) e antes do comentário `FAQ`, insira:

```css
/* ===========================
   COMO FUNCIONA
=========================== */
#como-funciona {
  background: var(--color-bg-soft);
  padding: var(--space-xl) 0;
}

.cf-steps {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.cf-step {
  display: flex;
  gap: var(--space-md);
  align-items: flex-start;
}

.cf-num {
  font-family: var(--font-heading);
  font-size: 22px;
  font-weight: 700;
  color: var(--color-primary-border);
  flex-shrink: 0;
  line-height: 1;
  min-width: 32px;
}

.cf-step-title {
  font-size: 14px;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: var(--space-xs);
}

.cf-step-desc {
  font-size: 12px;
  color: var(--color-text-light);
  line-height: 1.5;
}

.cf-note {
  margin-top: var(--space-lg);
  font-size: 12px;
  font-style: italic;
  color: var(--color-text-light);
  text-align: center;
}

@media (min-width: 768px) {
  #como-funciona { padding: var(--space-2xl) 0; }

  .cf-steps {
    position: relative;
    flex-direction: row;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-md);
  }

  .cf-steps::before {
    content: "";
    position: absolute;
    top: 16px;
    left: 12.5%;
    right: 12.5%;
    height: 1px;
    background: var(--color-primary-border);
    z-index: 0;
  }

  .cf-step {
    flex-direction: column;
    align-items: center;
    text-align: center;
    position: relative;
    z-index: 1;
  }

  .cf-num {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: var(--color-primary);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    margin: 0 0 var(--space-sm) 0;
  }
}
```

- [ ] **Step 3: Sanity check**

Run: `grep -c "id=\"como-funciona\"" index.html`
Expected: `1`

Run: `grep -c "cf-step\"" index.html`
Expected: `4`

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "feat: adiciona seção 'Como funciona' com 4 passos"
```

---

### Task 8: Adicionar seção "Exclusividade" (novo, entre FAQ e footer-cta)

**Files:**
- Modify: `index.html` (inserir entre `</section>` de `#faq` e `<section id="footer-cta" ...>`)
- Modify: `css/style.css` (novo bloco `EXCLUSIVIDADE`, inserir após o bloco `FAQ`)

- [ ] **Step 1: Inserir a seção no HTML**

Em `index.html`, imediatamente depois de `</section>` que fecha `#faq` (linha ~309) e antes de `<section id="footer-cta" ...>`, insira:

```html
    <section id="exclusividade" aria-label="Exclusividade do atendimento">
      <div class="container">
        <p class="excl-text">Atendimento individual, com número limitado de acompanhamentos simultâneos, garantindo profundidade, continuidade e qualidade ao longo do processo terapêutico.</p>
      </div>
    </section>
```

- [ ] **Step 2: Adicionar o bloco CSS `EXCLUSIVIDADE`**

Em `css/style.css`, imediatamente após o bloco `FAQ` e antes do comentário `FOOTER CTA`, insira:

```css
/* ===========================
   EXCLUSIVIDADE
=========================== */
#exclusividade {
  background: var(--color-primary-light);
  padding: var(--space-lg) 0;
}

.excl-text {
  font-family: var(--font-heading);
  font-size: clamp(14px, 2.5vw, 18px);
  color: var(--color-primary-dark);
  text-align: center;
  max-width: 640px;
  margin: 0 auto;
  line-height: 1.6;
}
```

- [ ] **Step 3: Sanity check**

Run: `grep -c "id=\"exclusividade\"" index.html`
Expected: `1`

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "feat: adiciona seção 'Exclusividade' antes do CTA final"
```

---

### Task 9: Atualizar copy da seção final (footer-cta)

**Files:**
- Modify: `index.html:310-327` (seção `#footer-cta`)
- Modify: `css/style.css:608-612` (`.fca-sub`)

- [ ] **Step 1: Substituir título e subtítulo no HTML**

Em `index.html`, substitua:

```html
        <h2 class="fca-title">Pronto para recuperar o equilíbrio?</h2>
        <p class="fca-sub">Entre em contato agora. O primeiro passo é uma conversa.</p>
```

por:

```html
        <h2 class="fca-title">Você pode contar com suporte para atravessar momentos desafiadores.</h2>
        <p class="fca-sub">Momentos difíceis fazem parte da experiência humana. Buscar ajuda representa um compromisso consigo mesmo, com sua saúde emocional e com a vida que deseja construir. Ao longo do processo, é comum perceber ganhos que se refletem também nos relacionamentos, na presença, na capacidade de decisão e na qualidade de vida.</p>
```

- [ ] **Step 2: Aumentar `max-width` de `.fca-sub` para acomodar o texto mais longo**

Em `css/style.css`, substitua:

```css
.fca-sub {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.85);
  max-width: 400px;
}
```

por:

```css
.fca-sub {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.85);
  max-width: 560px;
  line-height: 1.6;
}
```

- [ ] **Step 3: Sanity check**

Run: `grep -c "Você pode contar com suporte" index.html`
Expected: `1`

Run: `grep -c "Pronto para recuperar o equilíbrio" index.html`
Expected: `0`

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "feat: atualiza copy da seção final de CTA"
```

---

### Task 10: Verificação visual final no navegador

**Files:** Nenhuma edição.

- [ ] **Step 1: Servir o site localmente**

```bash
cd "c:\Users\Dan\Documents\MeusProjetos\triskelionLandingPage"
python -m http.server 8000
```

- [ ] **Step 2: Abrir `http://localhost:8000` no navegador e verificar visualmente**

Checklist:
- Hero mostra o novo H1/subtítulo, retrato pequeno ao lado do texto (não há mais imagem de fundo cobrindo o hero), e os dois CTAs ("Agendar uma conversa inicial" + "Conheça minha abordagem").
- Clicar em "Conheça minha abordagem" rola suavemente até "Como funciona".
- Especialidades mostra os 5 novos itens com ícones de linha (não emoji).
- Diferenciais aparece no lugar de Abordagem Técnica, com a foto `flavia03.png`.
- Sobre está inalterada.
- "Para quem este trabalho costuma fazer sentido" aparece com 6 itens marcados com ✓.
- "Como funciona" aparece como stepper horizontal com linha conectora em desktop (redimensione a janela para >768px) e como lista vertical numerada em mobile (<768px).
- FAQ está inalterada.
- Faixa "Exclusividade" aparece entre FAQ e a seção final.
- Seção final (footer-cta) mostra o novo título/texto e botão "Agendar uma conversa inicial".
- Todos os CTAs (nav, hero, footer-cta, sticky mobile) mostram "Agendar uma conversa inicial".

- [ ] **Step 3: Encerrar o servidor**

```bash
# Ctrl+C no terminal onde o http.server está rodando
```

Se algo na checklist falhar, volte à tarefa correspondente, ajuste e re-commit (não use `--amend`; crie um novo commit de correção).

---

## Self-Review

**Cobertura do spec:** todas as 10 subseções do spec (§3.1–3.10) têm tarefa correspondente (Tasks 1–9); §4 (sistema visual) está distribuído entre as tarefas de cada seção; §5 (fora de escopo) não gera tarefas, como esperado.

**Placeholders:** nenhum "TBD"/"TODO" — todo HTML/CSS está escrito por extenso em cada step.

**Consistência de nomes:** classes novas (`btn-outline`, `hero-ctas`, `dif-*`, `check-*`, `cf-*`, `excl-text`) são usadas de forma consistente entre o HTML (Tasks 2,4,6,7,8) e o CSS correspondente — confirmado por leitura cruzada das tarefas.
