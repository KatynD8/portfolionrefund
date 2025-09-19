import { initTabs } from "./modules/tabs.js";
import { initProjects } from "./modules/projects.js";
import { initParticles } from "./modules/particles.js";

document.addEventListener("DOMContentLoaded", () => {
  // 1) Navbar onglets + pilule animée
  initTabs({
    navbarSelector: ".navbar",
    panelSelector: '.tab-content[role="tabpanel"]',
  });

  // 2) Section projets : dossiers -> carte ciblée
  initProjects({
    rootSelector: "#projets",
    autoOpenFirst: false, // passe à true si tu veux ouvrir la 1re carte au chargement
  });
});

// 3) Particules après le chargement complet (images, fonts…)
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
