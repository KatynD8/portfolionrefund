// particles.js
export function initParticles(options = {}) {
  if (!window.Particles || typeof window.Particles.init !== "function") return;
  const defaults = {
    selector: ".background",
    color: ["#1d2029", "#2e2e38", "#3c3e4a"],
    connectParticles: true,
    maxParticles: 120,
    responsive: [
      { breakpoint: 900, options: { maxParticles: 80 } },
      { breakpoint: 600, options: { maxParticles: 50 } },
    ],
  };
  const config = { ...defaults, ...options };
  window.Particles.init(config);
}
