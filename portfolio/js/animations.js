/* Animações ao rolar: reveal, barra de progresso, destaque do menu */
function initAnimations() {
  document.documentElement.classList.add("js-ready");

  // Reveal (IntersectionObserver). Re-observa elementos criados dinamicamente.
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || reduce) {
    items.forEach(i => i.classList.add("in-view"));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("in-view"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    items.forEach((el, i) => {
      el.style.transitionDelay = (i % 3) * 80 + "ms";
      io.observe(el);
    });
  }

  // Destaque da seção atual no menu
  const links = [...document.querySelectorAll(".nav-link")];
  const map = new Map(links.map(l => [l.getAttribute("href").slice(1), l]));
  const sections = [...map.keys()].map(id => document.getElementById(id)).filter(Boolean);
  if ("IntersectionObserver" in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          links.forEach(l => { l.classList.remove("active"); l.removeAttribute("aria-current"); });
          const l = map.get(e.target.id);
          if (l) { l.classList.add("active"); l.setAttribute("aria-current", "true"); }
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(s => spy.observe(s));
  }

  // Header e barra de progresso
  const header = document.querySelector(".site-header");
  const bar = document.getElementById("scrollProgress");
  const toTop = document.getElementById("toTop");
  let ticking = false;
  function onScroll() {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    header.classList.toggle("scrolled", y > 10);
    if (bar) bar.style.transform = "scaleX(" + (max > 0 ? y / max : 0) + ")";
    if (toTop) {
      if (y > 600) { toTop.hidden = false; requestAnimationFrame(() => toTop.classList.add("show")); }
      else { toTop.classList.remove("show"); setTimeout(() => { if (!toTop.classList.contains("show")) toTop.hidden = true; }, 300); }
    }
    ticking = false;
  }
  window.addEventListener("scroll", () => { if (!ticking) { requestAnimationFrame(onScroll); ticking = true; } }, { passive: true });
  onScroll();
}
