// tabs.js
export function initTabs({
  navbarSelector = ".navbar",
  panelSelector = '.tab-content[role="tabpanel"]',
} = {}) {
  const navbar = document.querySelector(navbarSelector);
  if (!navbar) return;

  const tabs = navbar.querySelectorAll('.tab[role="tab"]');
  const panels = document.querySelectorAll(panelSelector);
  if (!tabs.length) return;

  function updatePill(selectedIndex) {
    navbar.classList.toggle("second-active", selectedIndex === 1);
  }

  function activate(targetId, { fromHash = false } = {}) {
    let selectedIndex = -1;

    tabs.forEach((tab, i) => {
      const isActive = tab.dataset.target === targetId;
      tab.setAttribute("aria-selected", isActive ? "true" : "false");
      tab.tabIndex = isActive ? 0 : -1;
      if (isActive) selectedIndex = i;
    });

    if (selectedIndex === -1) {
      const fallbackId = tabs[0].dataset.target;
      return activate(fallbackId, { fromHash });
    }

    updatePill(selectedIndex);

    panels.forEach((panel) => {
      const show = panel.id === targetId;
      panel.hidden = !show;
      panel.setAttribute("aria-hidden", show ? "false" : "true");
    });

    if (!fromHash) history.replaceState(null, "", "#" + targetId);
  }

  // Souris
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      activate(tab.dataset.target);
      tab.focus();
    });
  });

  // Clavier
  navbar.addEventListener("keydown", (e) => {
    const currentIndex = [...tabs].findIndex(
      (t) => t.getAttribute("aria-selected") === "true"
    );
    if (currentIndex === -1) return;

    let next = null;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next = (currentIndex + 1) % tabs.length;
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      next = (currentIndex - 1 + tabs.length) % tabs.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      next = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      next = tabs.length - 1;
    }

    if (next !== null) {
      const nextTab = tabs[next];
      nextTab.focus();
      activate(nextTab.dataset.target);
    }
  });

  // Initialisation (sans animation)
  navbar.classList.add("no-anim");
  const initialHash = location.hash?.slice(1);
  const initial = initialHash || tabs[0].dataset.target;
  activate(initial);
  requestAnimationFrame(() => navbar.classList.remove("no-anim"));

  // Back/forward
  window.addEventListener("hashchange", () => {
    const id = location.hash?.slice(1);
    if (id) activate(id, { fromHash: true });
  });
}
