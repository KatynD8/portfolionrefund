/**
 * Simple header glitch toggler
 * - Ajoute une classe (par défaut "glitching") sur un élément pendant N ms
 * - Respecte prefers-reduced-motion (optionnel)
 * - Peut ne s’exécuter qu’une fois par session ou toujours
 *
 * @example
 * initHeaderGlitch({ selector: '#hero-banner', duration: 3400, once: 'session' });
 */
export function initHeaderGlitch({
  selector = "#hero-banner",
  className = "glitching",
  duration = 3400, // en ms
  delay = 0, // en ms avant de démarrer le glitch
  respectReducedMotion = true,
  once = "always", // 'session' | 'local' | 'always'
  start = "dom", // 'dom' (DOMContentLoaded) | 'immediate' | 'load'
} = {}) {
  const run = () => {
    const el = document.querySelector(selector);
    if (!el) return;

    // Reduced motion
    if (
      respectReducedMotion &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return; // ne glitch pas
    }

    // Guard "once"
    const storageKey = `glitch:${location.pathname}:${selector}:${className}`;
    const storage =
      once === "local"
        ? window.localStorage
        : once === "session"
        ? window.sessionStorage
        : null;

    if (storage && storage.getItem(storageKey)) return;

    // Lance l’animation
    const startGlitch = () => {
      el.classList.add(className);
      window.setTimeout(() => {
        el.classList.remove(className);
        if (storage) storage.setItem(storageKey, "1");
      }, duration);
    };

    delay > 0 ? window.setTimeout(startGlitch, delay) : startGlitch();
  };

  // Choix du moment de départ
  if (start === "immediate") {
    run();
  } else if (start === "load") {
    window.addEventListener("load", run, { once: true });
  } else {
    // 'dom'
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", run, { once: true });
    } else {
      run();
    }
  }
}
