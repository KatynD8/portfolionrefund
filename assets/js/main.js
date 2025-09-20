import { initTabs } from "./modules/tabs.js";
import { initProjects } from "./modules/projects.js";
import { initParticles } from "./modules/particles.js";
import { initHeaderGlitch } from "./modules/glitch.js"; // <-- NEW

document.addEventListener("DOMContentLoaded", () => {
  // 1) Navbar onglets + pilule animée
  initTabs({
    navbarSelector: ".navbar",
    panelSelector: '.tab-content[role="tabpanel"]',
  });

  // 2) Section projets : dossiers -> carte ciblée
  initProjects({
    rootSelector: "#projets",
    autoOpenFirst: false,
  });

  // 3) Glitch header (~3.4s), une fois par session
  initHeaderGlitch({
    selector: "#hero-banner",
    duration: 3400,
    once: "session", // 'always' si tu veux à chaque visite
    start: "dom", // ou 'load' si tu veux attendre les images
    delay: 0, // ajoute 200–300ms si tu veux décaler
  });
});

// 4) Particules après chargement complet
window.addEventListener("load", () => {
  initParticles({
    selector: ".background",
    color: ["#1d2029", "#2e2e38", "#3c3e4a"],
    connectParticles: true,
    maxParticles: 120,
    responsive: [
      { breakpoint: 900, options: { maxParticles: 80 } },
      { breakpoint: 600, options: { maxParticles: 50 } },
    ],
  });
});
