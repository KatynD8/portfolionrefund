// projects.js
export function initProjects({
  rootSelector = "#projets",
  autoOpenFirst = false,
} = {}) {
  const root = document.querySelector(rootSelector);
  if (!root) return;

  const folderBtns = root.querySelectorAll(".folder-btn");
  const cards = root.querySelectorAll(".project-card");
  if (!folderBtns.length || !cards.length) return;

  function resetButtons() {
    folderBtns.forEach((btn) => {
      btn.setAttribute("aria-expanded", "false");
      btn.classList.remove("active");
      const icon = btn.querySelector("i");
      if (icon) {
        icon.classList.add("fa-folder");
        icon.classList.remove("fa-folder-open");
      }
    });
  }

  function hideAllCards() {
    cards.forEach((card) => {
      card.classList.remove("show");
      card.hidden = true;
      card.setAttribute("aria-hidden", "true");
      card.style.height = "";
      card.style.marginTop = "";
      card.style.paddingTop = "";
      card.style.paddingBottom = "";
    });
  }

  function openByKey(key) {
    const targetCard = root.querySelector(
      `.project-card[data-project="${key}"]`
    );
    const targetBtn = root.querySelector(`.folder-btn[data-project="${key}"]`);
    if (!targetCard || !targetBtn) return;

    hideAllCards();
    resetButtons();

    // Animation height: 0 -> auto
    targetCard.hidden = false;
    targetCard.setAttribute("aria-hidden", "false");
    targetCard.style.height = "auto";
    const full = targetCard.getBoundingClientRect().height;
    targetCard.style.height = "0px";
    targetCard.style.marginTop = "8px";
    targetCard.style.paddingTop = "0px";
    targetCard.style.paddingBottom = "0px";

    requestAnimationFrame(() => {
      targetCard.classList.add("show");
      targetCard.style.height = full + "px";
      targetCard.style.paddingTop = "";
      targetCard.style.paddingBottom = "";
      targetCard.addEventListener("transitionend", function onEnd(e) {
        if (e.propertyName === "height") {
          targetCard.style.height = "auto";
          targetCard.removeEventListener("transitionend", onEnd);
        }
      });
    });

    // Bouton actif (icône blanche via CSS)
    targetBtn.setAttribute("aria-expanded", "true");
    targetBtn.classList.add("active");
    const icon = targetBtn.querySelector("i");
    if (icon) {
      icon.classList.remove("fa-folder");
      icon.classList.add("fa-folder-open");
    }
  }

  // Interactions
  folderBtns.forEach((btn) => {
    btn.setAttribute("aria-expanded", "false");

    btn.addEventListener("click", () => openByKey(btn.dataset.project));

    // Navigation au clavier (flèches latérales)
    btn.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      e.preventDefault();
      const list = [...folderBtns];
      const i = list.indexOf(btn);
      const dir = e.key === "ArrowRight" ? 1 : -1;
      const next = (i + dir + list.length) % list.length;
      list[next].focus();
    });
  });

  // État initial
  hideAllCards();
  if (autoOpenFirst && folderBtns[0]) {
    openByKey(folderBtns[0].dataset.project);
  }
}
