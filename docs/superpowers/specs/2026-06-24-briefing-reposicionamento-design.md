# Reposicionamento da Landing Page — Briefing da Cliente

**Data:** 2026-06-24
**Objetivo:** Reescrever copy e reorganizar seções da landing page para transmitir sofisticação clínica, profundidade e atendimento individual de alta qualidade, conforme briefing da cliente (Flavia Takayama). Substitui parcialmente o spec anterior (`2026-06-18-landing-page-flavia-design.md`).

---

## 1. Decisões validadas

| Decisão | Escolha |
|---|---|
| Paleta de cores | Manter paleta atual do working tree: `--color-primary:#667D89`, `--color-primary-dark:#4A5F6B`, `--color-primary-light:#EEF1F4`, fundo branco predominante |
| Foto do hero | Retrato pequeno e discreto ao lado do texto (reverter o background full-bleed que está hoje não commitado) |
| Ícones de listas | SVG outline monocromático na cor primária, substituindo os emojis atuais |
| Layout "Como funciona" | Stepper horizontal com linha conectora em `≥768px`; lista vertical numerada (01/02/03/04) abaixo desse breakpoint |
| Texto dos CTAs WhatsApp | Unificar todos os botões do site (nav, hero, footer-cta, sticky) para "Agendar uma conversa inicial" |
| Seção "Abordagem Técnica" | Substituída pela nova seção "Diferenciais" (trajetória RH/coaching organizacional); não convive com a antiga |
| `img/flavia03.png` | Reaproveitada na seção Diferenciais |
| CTA secundário do hero | "Conheça minha abordagem" → ancora em `#como-funciona` |

---

## 2. Ordem das seções (nova)

1. `nav` — inalterado, exceto texto do CTA
2. `hero` — copy nova + retrato pequeno
3. `especialidades` — copy nova, 5 categorias por desafio de vida
4. `diferenciais` *(novo, substitui `abordagem`)* — trajetória profissional + `flavia03.png`
5. `sobre` — bio reordenada (experiência/filosofia/abordagem clínica → formação por último)
6. `para-quem` *(novo)* — checklist "✓", 6 itens
7. `como-funciona` *(novo)* — 4 passos
8. `faq` — inalterado
9. `exclusividade` *(novo)* — faixa de destaque, frase única
10. `footer-cta` — copy substituída pela "seção final" do briefing
11. `rodape` + `sticky-wa` — inalterado, exceto texto do CTA sticky

---

## 3. Copy por seção

### 3.1 Hero
- Badge: mantido ("Psicologia Clínica Online · Alta Complexidade")
- H1: "Há momentos em que contar com suporte profissional nos ajuda a atravessar desafios com mais clareza, equilíbrio e presença."
- Subtítulo: "Atendimento psicológico online para pessoas que enfrentam ansiedade, estresse crônico, depressão, transições de vida, desafios de relacionamento ou momentos de redefinição de propósito."
- CTA primário: "Agendar uma conversa inicial" (wa-link)
- CTA secundário: "Conheça minha abordagem" → `#como-funciona` (link âncora, sem ícone WhatsApp, estilo botão outline)
- Foto: retrato pequeno (`flavia01.png`, mesmo tratamento usado antes do redesign atual — ~90×108px mobile / 200×240px desktop, `border-radius: 50%`)
- Trust bar: inalterada (25+ anos / USP / TCC / CRP)

### 3.2 Especialidades
- Título/subtítulo: inalterados
- 5 itens (substituem os atuais):
  1. **Ansiedade, depressão e sofrimento emocional** — "Quando emoções difíceis passam a interferir no bem-estar, nos relacionamentos ou na capacidade de aproveitar a própria vida."
  2. **Estresse crônico e burnout** — "Para pessoas que convivem com sobrecarga constante, pressão por desempenho, exaustão emocional ou perda de equilíbrio entre vida pessoal e profissional."
  3. **Carreira, transições e propósito** — "Mudanças profissionais, dilemas complexos, decisões difíceis, redefinição de objetivos, perda de sentido ou adaptação a novos ciclos de vida."
  4. **Relacionamentos e conflitos interpessoais** — "Questões conjugais, familiares ou profissionais que impactam a qualidade de vida, a saúde emocional e a capacidade de construir relações satisfatórias."
  5. **Liderança e desenvolvimento executivo** — "Espaço de reflexão para líderes, executivos e profissionais que desejam ampliar autoconhecimento, clareza, influência e capacidade de decisão em contextos complexos."
- Ícones: SVG outline (a definir um símbolo neutro por item — ex. coração/folha para emocional, raio/relógio para burnout, bússola para carreira, duas pessoas para relacionamentos, estrela/alvo para liderança), todos na cor `--color-primary`

### 3.3 Diferenciais (substitui Abordagem Técnica)
- Título: "Uma trajetória que integra psicologia, desenvolvimento humano e experiência organizacional"
- Parágrafo 1: "Além da atuação clínica, acumulo mais de duas décadas de experiência em desenvolvimento de lideranças, coaching executivo, recursos humanos e transformação organizacional em empresas nacionais e multinacionais."
- Parágrafo 2: "Essa trajetória amplia minha compreensão sobre os desafios emocionais, relacionais e profissionais vividos por pessoas que ocupam posições de responsabilidade, enfrentam decisões complexas ou atravessam períodos de intensa transformação pessoal."
- Layout: texto em coluna única com `img/flavia03.png` ao lado (desktop) ou acima (mobile) — não usar grid de 3 cards (não há 3 itens distintos aqui)

### 3.4 Sobre
- Foto e selos: inalterados
- Bio reordenada (responde primeiro "por que confiar nesta profissional", credenciais por último):
  - Parágrafo 1 (experiência + filosofia + abordagem clínica): texto atual do parágrafo 1, mantido como está ("Com mais de 25 anos de formação e sólida bagagem como executiva de Recursos Humanos em grandes corporações, uno a inteligência analítica à maturidade clínica para conduzir processos profundos de transformação.")
  - Parágrafo 2 (formação acadêmica, por último): texto atual do parágrafo 2 mantido ("Sou pós-graduada em Psicologia Clínica no Instituto do Coração (InCor)...")
  - 4 selos: inalterados, continuam após os parágrafos

### 3.5 Para quem (novo)
- Título: "Para quem este trabalho costuma fazer sentido"
- Lista com marcador "✓" (texto literal do briefing, 6 itens):
  1. Pessoas que buscam mais do que o alívio imediato dos sintomas.
  2. Profissionais vivendo momentos de alta pressão ou responsabilidade.
  3. Pessoas atravessando mudanças importantes de vida ou carreira.
  4. Indivíduos interessados em compreender padrões emocionais recorrentes.
  5. Quem valoriza um trabalho terapêutico ético, estruturado e baseado em evidências.
  6. Pessoas dispostas a investir em autoconhecimento, desenvolvimento emocional e qualidade de vida.

### 3.6 Como funciona (novo)
- Título: "Como funciona"
- 4 passos (texto do briefing):
  1. Conversa inicial — "Conversa inicial para compreensão da demanda e das expectativas."
  2. Avaliação — "Avaliação das necessidades e definição dos objetivos terapêuticos."
  3. Plano de trabalho — "Construção de um plano de trabalho personalizado."
  4. Acompanhamento — "Acompanhamento contínuo e revisão periódica dos avanços."
- Observação opcional em itálico abaixo: "Cada processo é único e respeita o momento, a história e os objetivos de cada pessoa."
- Layout: stepper horizontal numerado com linha conectora em `≥768px`; lista vertical numerada (01–04) abaixo desse breakpoint

### 3.7 FAQ
- Sem alterações de copy ou layout

### 3.8 Exclusividade (novo)
- Faixa de destaque sem título, fundo `--color-primary-light`, texto centralizado:
  "Atendimento individual, com número limitado de acompanhamentos simultâneos, garantindo profundidade, continuidade e qualidade ao longo do processo terapêutico."

### 3.9 Footer-cta (seção final)
- Título: "Você pode contar com suporte para atravessar momentos desafiadores."
- Texto: "Momentos difíceis fazem parte da experiência humana. Buscar ajuda representa um compromisso consigo mesmo, com sua saúde emocional e com a vida que deseja construir. Ao longo do processo, é comum perceber ganhos que se refletem também nos relacionamentos, na presença, na capacidade de decisão e na qualidade de vida."
- Botão: "Agendar uma conversa inicial"

### 3.10 Nav / Sticky WhatsApp
- Texto do CTA da nav: "Agendar uma conversa inicial" (era "WhatsApp")
- Texto do botão sticky mobile: "Agendar uma conversa inicial" (era "Agendar Consulta via WhatsApp")

---

## 4. Sistema visual

- Paleta: manter tokens atuais do working tree (`#667D89` / `#4A5F6B` / `#EEF1F4`), sem alteração de cor adicional.
- Ícones: trocar emojis por SVG outline monocromático (`stroke="currentColor"`, sem fill) na cor `--color-primary`, em `especialidades` e `como-funciona` (numeração, não ícone).
- Espaçamento: aumentar `--space-lg`/`--space-xl` nas seções novas (`para-quem`, `como-funciona`, `exclusividade`) para reduzir densidade textual, conforme briefing.
- Hero: reverter `#hero::before`/`#hero::after` (background full-bleed) e restaurar `.hero-photo-wrap`/`.hero-photo` (retrato pequeno), reaproveitando o CSS que existia antes do redesign não commitado atual.
- `--radius-photo: 50%` (já está assim no working tree) — mantido para retratos circulares.

---

## 5. Itens fora de escopo desta rodada

- Geração dos SVGs de ícone de linha (serão criados como inline SVG simples durante a implementação, sem biblioteca externa)
- Ajuste de `img/flavia03.png` (crop/tamanho) para a seção Diferenciais — usar a imagem como está, ajustando apenas `object-fit`/dimensões CSS
- Texto de `<title>`/meta description (SEO) — não alterado por este briefing
