(function () {
  const tabs = document.querySelectorAll('.tab[role="tab"]');
  const panels = document.querySelectorAll('.tab-content[role="tabpanel"]');

  function activate(targetId) {
    tabs.forEach((tab) => {
      const active = tab.dataset.target === targetId;
      tab.setAttribute("aria-selected", active ? "true" : "false");
      tab.tabIndex = active ? 0 : -1;
    });
    panels.forEach((panel) => {
      const show = panel.id === targetId;
      panel.hidden = !show;
      panel.setAttribute("aria-hidden", show ? "false" : "true");
    });
    // MàJ de l’URL (sans scroll)
    history.replaceState(null, "", "#" + targetId);
  }

  // Clic souris
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => activate(tab.dataset.target));
  });

  // Navigation clavier (flèches gauche/droite)
  document.querySelector(".navbar").addEventListener("keydown", (e) => {
    const currentIndex = [...tabs].findIndex(
      (t) => t.getAttribute("aria-selected") === "true"
    );
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const dir = e.key === "ArrowRight" ? 1 : -1;
      const next = (currentIndex + dir + tabs.length) % tabs.length;
      tabs[next].focus();
      activate(tabs[next].dataset.target);
    }
  });

  // Init : hash ou "projets" par défaut
  const initial = location.hash?.slice(1) || "projets";
  activate(initial);
})();

window.onload = function () {
  Particles.init({
    selector: ".background",
    color: ["#1d2029", "#2e2e38", "#3c3e4a"],
    connectParticles: true,
    maxParticles: 120,
    responsive: [
      {
        breakpoint: 900,
        options: {
          maxParticles: 80,
        },
      },
      {
        breakpoint: 600,
        options: {
          maxParticles: 50,
        },
      },
    ],
  });
};
