/* ==========================================================
   CERTIFICADOS — para adicionar outro, copie um item do array.
   ========================================================== */
const CERTIFICATES = [
  {
    title: "Fundamentos de Suporte de TI",
    issuer: "SENAC DF · Cisco Networking Academy",
    date: "10 Jul 2026",
    hours: "",
    image: "assets/images/certificates/fundamentos-de-suporte-de-ti.jpg",
    pdf: "",
    description: "Introdução às bases do suporte técnico em TI: componentes de computadores, sistemas operacionais, redes e atendimento a usuários. Esse conhecimento complementa a programação ao ajudar a entender o ambiente de execução dos sistemas e a diagnosticar problemas de forma estruturada."
  },
  {
    title: "CSS Essentials",
    issuer: "SENAC DF – CEPs · Cisco Networking Academy",
    date: "18 Mai 2026",
    hours: "",
    image: "assets/images/certificates/css-essentials.jpg",
    pdf: "",
    description: "Fundamentos de CSS para estilização de páginas web: seletores, propriedades visuais, tipografia, espaçamento e organização de layouts. Esse conhecimento é aplicado na construção de interfaces responsivas, organizadas e visualmente consistentes."
  },
  {
    title: "HTML Essentials",
    issuer: "SENAC DF – CEPs · Cisco Networking Academy",
    date: "18 Mai 2026",
    hours: "",
    image: "assets/images/certificates/html-essentials.jpg",
    pdf: "",
    description: "Base da estrutura de páginas web com HTML: elementos semânticos, hierarquia de conteúdo, links, imagens e formulários. É um conhecimento essencial para desenvolver páginas acessíveis, organizadas e bem estruturadas."
  },
  {
    title: "JavaScript Essentials 1",
    issuer: "SENAC DF – CEPs · Cisco Networking Academy",
    date: "18 Mai 2026",
    hours: "",
    image: "assets/images/certificates/javascript-essentials-1.jpg",
    pdf: "",
    description: "Primeiros conceitos de JavaScript: variáveis, tipos de dados, operadores, estruturas condicionais e de repetição e funções. Reforça a lógica de programação e oferece a base para adicionar interatividade às aplicações web."
  },
  {
    title: "Linux Unhatched",
    issuer: "SENAC DF · Cisco Networking Academy",
    date: "30 Mar 2026",
    hours: "",
    image: "assets/images/certificates/linux-unhatched.jpg",
    pdf: "",
    description: "Introdução ao sistema operacional Linux e ao uso do terminal. Esse aprendizado contribui para o desenvolvimento em ambientes de servidor e para o uso de ferramentas de linha de comando no processo de programação."
  },
  {
    title: "Operating Systems Basics",
    issuer: "SENAC DF · Cisco Networking Academy",
    date: "15 Mai 2025",
    hours: "",
    image: "assets/images/certificates/operating-systems-basics.jpg",
    pdf: "",
    description: "Conceitos fundamentais de sistemas operacionais, incluindo gerenciamento de recursos, arquivos e processos e interação entre usuário e computador. Amplia a compreensão sobre como os programas são executados e administrados."
  }
];

/* ---------- Certificados ---------- */
function buildCertCard(c, index) {
  const card = el("article", "card cert-card reveal");

  const thumb = el("button", "cert-thumb");
  thumb.type = "button";
  thumb.setAttribute("aria-label", "Ampliar certificado: " + c.title);
  thumb.dataset.index = index;
  const img = el("img");
  img.src = c.image;
  img.alt = "Certificado de conclusão do curso " + c.title;
  img.loading = "lazy";
  img.width = 930; img.height = 630;
  thumb.appendChild(img);
  const zoom = el("span", "zoom");
  zoom.setAttribute("aria-hidden", "true");
  zoom.appendChild(iconUse("i-expand"));
  thumb.appendChild(zoom);
  card.appendChild(thumb);

  const body = el("div", "cert-body");
  body.appendChild(el("h3", "", c.title));
  const meta = el("div", "cert-meta mono");
  meta.appendChild(el("span", "", c.issuer));
  if (c.date) meta.appendChild(el("span", "", "Concluído em " + c.date));
  if (c.hours) meta.appendChild(el("span", "", c.hours));
  body.appendChild(meta);
  body.appendChild(el("p", "", c.description));

  const btn = el("button", "btn btn-ghost");
  btn.type = "button";
  btn.dataset.index = index;
  btn.appendChild(iconUse("i-expand"));
  btn.appendChild(document.createTextNode(" Visualizar certificado"));
  body.appendChild(btn);

  card.appendChild(body);
  return card;
}

function renderCertificates() {
  const grid = document.getElementById("certGrid");
  grid.replaceChildren(...CERTIFICATES.map(buildCertCard));
  grid.addEventListener("click", (e) => {
    const t = e.target.closest("[data-index]");
    if (t) openModal(Number(t.dataset.index), t);
  });
}

/* ---------- Modal ---------- */
let lastFocus = null;
function openModal(index, trigger) {
  const c = CERTIFICATES[index];
  const modal = document.getElementById("certModal");
  lastFocus = trigger || document.activeElement;
  document.getElementById("modalTitle").textContent = c.title + " — " + c.issuer;
  const img = document.getElementById("modalImg");
  img.src = c.image;
  img.alt = "Certificado de conclusão do curso " + c.title + ", concluído em " + c.date;
  const pdfAction = document.getElementById("modalPdf");
  if (c.pdf) {
    pdfAction.href = c.pdf;
    pdfAction.hidden = false;
  } else {
    pdfAction.hidden = true;
  }
  modal.hidden = false;
  document.body.classList.add("modal-open");
  modal.querySelector(".modal-close").focus();
}
function closeModal() {
  const modal = document.getElementById("certModal");
  if (modal.hidden) return;
  modal.hidden = true;
  document.body.classList.remove("modal-open");
  if (lastFocus) lastFocus.focus();
}
function initModal() {
  const modal = document.getElementById("certModal");
  modal.addEventListener("click", (e) => { if (e.target.closest("[data-close]")) closeModal(); });
  document.addEventListener("keydown", (e) => {
    if (modal.hidden) return;
    if (e.key === "Escape") closeModal();
    if (e.key === "Tab") { // mantém o foco dentro do modal
      const f = [...modal.querySelectorAll("button, a[href]")].filter(n => n.offsetParent !== null);
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
}

/* ---------- Menu mobile ---------- */
function initMenu() {
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("navMenu");
  const set = (open) => {
    menu.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  };
  toggle.addEventListener("click", () => set(!menu.classList.contains("open")));
  menu.addEventListener("click", (e) => { if (e.target.closest("a")) set(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") set(false); });
  document.addEventListener("click", (e) => {
    if (menu.classList.contains("open") && !e.target.closest(".nav")) set(false);
  });
  window.addEventListener("resize", () => { if (window.innerWidth > 860) set(false); });
}

/* ---------- Contatos pendentes (placeholders) ---------- */
function initContactPlaceholders() {
  const toast = document.getElementById("toast");
  let timer;
  document.querySelectorAll("[data-placeholder]").forEach(a => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      toast.textContent = "> " + a.dataset.label + " ainda não configurado. Edite o link em index.html (seção Contato).";
      clearTimeout(timer);
      timer = setTimeout(() => { toast.textContent = ""; }, 5000);
    });
  });
}

/* ---------- Voltar ao topo ---------- */
function initToTop() {
  document.getElementById("toTop").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ---------- Init ---------- */
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();
  renderCertificates();
  renderProjects();
  initMenu();
  initModal();
  initToTop();
  initContactPlaceholders();
  initAnimations(); // por último: observa os cards já criados
});
