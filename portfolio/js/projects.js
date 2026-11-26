/* ==========================================================
   PROJETOS REAIS
   ========================================================== */
const PROJECTS = [
  {
    placeholder: false,
    name: "Sistema de Gerenciamento de Senhas Clínicas",
    image: "assets/images/projects/sistema-senhas.svg",
    description: "Aplicação em linguagem C para organizar o atendimento de pacientes por ordem de prioridade em uma clínica.",
    goal: "Gerenciar pacientes e classificar automaticamente o atendimento nas categorias urgente, preferencial e normal.",
    features: ["Cadastro de pacientes", "Geração de senhas U, P e N", "Classificação por idade e condições", "Consulta da próxima senha", "Chamada e finalização de atendimentos", "Painel de chamadas"],
    tech: ["C", "Estruturas", "Funções", "Make"],
    repo: "https://github.com/joao2740/-SISTEMA-DE-GERENCIAMENTO-DE-SENHAS-DE-ATENDIMENTO-CL-NICO",
    demo: ""
  },
  {
    placeholder: false,
    name: "Trilha Clara",
    image: "assets/images/projects/trilha-clara.svg",
    description: "Aplicação para orientar visitantes do Parque Ecológico de Águas Claras em acessibilidade, fauna, descarte de resíduos e segurança.",
    goal: "Oferecer um guia acessível e funcional, com recursos de privacidade e funcionamento offline.",
    features: ["Mapa esquemático em SVG", "Guia de descarte por cores", "Catálogo de fauna", "Ajustes de acessibilidade", "Fluxo de denúncias", "Funcionamento como PWA"],
    tech: ["TypeScript", "React", "CSS", "Vite", "PWA"],
    repo: "https://github.com/joao2740/APP_TRILHA_CLARA",
    demo: ""
  },
  {
    placeholder: false,
    name: "Acadêmico UDF",
    image: "assets/images/projects/academico-udf.svg",
    description: "Repositório com atividades acadêmicas de algoritmos, pensamento computacional e linguagem C desenvolvidas no UDF.",
    goal: "Registrar exercícios práticos e consolidar os fundamentos de lógica e resolução de problemas.",
    features: ["Atividades em linguagem C", "Calculadora em C", "Exercícios em pseudocódigo", "Organização por disciplinas acadêmicas"],
    tech: ["C", "HTML", "Flowgorithm"],
    repo: "https://github.com/joao2740/Acad-mico_UDF",
    demo: ""
  },
  {
    placeholder: false,
    name: "Carolina Pós-Operatório",
    image: "assets/images/projects/carolina-posoperatorio.svg",
    description: "Site institucional para divulgação de atendimento especializado em pós-operatório, drenagem linfática e tratamento de fibroses em Brasília.",
    goal: "Apresentar os serviços, diferencial profissional, resultados e facilitar o agendamento pelo WhatsApp.",
    features: ["Apresentação institucional", "Catálogo de tratamentos", "Depoimentos e resultados", "Informações de localização", "Formulário de contato", "Redirecionamento para WhatsApp"],
    tech: ["HTML", "CSS", "JavaScript"],
    repo: "",
    demo: "https://carolinaposoperatorio.com.br"
  }
];

/* ---------- Renderização ---------- */
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function iconUse(id) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "icon");
  svg.setAttribute("aria-hidden", "true");
  const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
  use.setAttribute("href", "#" + id);
  svg.appendChild(use);
  return svg;
}

function linkButton(href, label, variant, iconId) {
  const a = el("a", "btn " + variant);
  a.href = href;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  a.appendChild(iconUse(iconId));
  a.appendChild(document.createTextNode(" " + label));
  return a;
}

function buildProjectCard(p) {
  const card = el("article", "card project-card reveal" + (p.placeholder ? " is-placeholder" : ""));

  const preview = el("div", "project-preview" + (p.image ? "" : " placeholder"));
  if (p.image) {
    const img = el("img");
    img.src = p.image;
    img.alt = "Prévia do projeto " + p.name;
    img.loading = "lazy";
    preview.appendChild(img);
  } else {
    const ph = el("div", "ph-label mono");
    ph.appendChild(iconUse("i-monitor"));
    ph.appendChild(el("span", "", "assets/images/projects/"));
    preview.appendChild(ph);
  }
  card.appendChild(preview);

  const body = el("div", "project-body");
  if (p.placeholder) body.appendChild(el("span", "tag mono", "Em breve · placeholder"));
  body.appendChild(el("h3", "", p.name));
  body.appendChild(el("p", "", p.description));

  body.appendChild(el("h4", "", "Objetivo"));
  body.appendChild(el("p", "", p.goal));

  body.appendChild(el("h4", "", "Funcionalidades"));
  const feats = el("ul", "check-list");
  p.features.forEach(f => feats.appendChild(el("li", "", f)));
  body.appendChild(feats);

  const tech = el("ul", "tags");
  p.tech.forEach(t => tech.appendChild(el("li", "", t)));
  body.appendChild(tech);

  const links = el("div", "project-links");
  if (p.repo) links.appendChild(linkButton(p.repo, "Repositório", "btn-ghost", "i-github"));
  if (p.demo) links.appendChild(linkButton(p.demo, "Visitar site", "btn-primary", "i-ext"));
  body.appendChild(links);

  card.appendChild(body);
  return card;
}

function renderProjects() {
  const grid = document.getElementById("projectGrid");
  if (!grid) return;
  grid.replaceChildren(...PROJECTS.map(buildProjectCard));
}
