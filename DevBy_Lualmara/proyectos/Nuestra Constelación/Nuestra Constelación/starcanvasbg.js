(function () {
  const canvas = document.getElementById("starCanvasBg");
  const ctx = canvas.getContext("2d");

  // ── Configuración ──────────────────────────────────────────────
  const CONFIG = {
    starCount: 880, // cantidad de estrellas de fondo
    shootingStarInterval: 1000, // ms entre estrellas fugaces
    twinkleSpeed: 10.4, // velocidad base del parpadeo
    nebulaOpacity: 0.13, // opacidad de las nubes nebulosas
  };

  // ── Resize ─────────────────────────────────────────────────────
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    buildNebula(); // recalcula posiciones al cambiar tamaño
  }

  // ── Estrellas de fondo ─────────────────────────────────────────
  function makeStars(count) {
    return Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.3 + 0.2,
      phase: Math.random() * Math.PI * 2,
      speed: CONFIG.twinkleSpeed + Math.random() * 0.5,
      warm: Math.random() > 0.75, // algunas con tinte cálido
    }));
  }

  let stars = [];

  // ── Nebulosas ──────────────────────────────────────────────────
  let nebulae = [];

  function buildNebula() {
    const W = canvas.width,
      H = canvas.height;
    nebulae = [
      {
        x: 0.12 * W,
        y: 0.25 * H,
        r: Math.min(W, H) * 0.22,
        rgb: [70, 30, 140],
      },
      { x: 0.8 * W, y: 0.6 * H, r: Math.min(W, H) * 0.18, rgb: [30, 10, 110] },
      { x: 0.5 * W, y: 0.85 * H, r: Math.min(W, H) * 0.15, rgb: [55, 10, 95] },
      {
        x: 0.65 * W,
        y: 0.15 * H,
        r: Math.min(W, H) * 0.12,
        rgb: [90, 40, 130],
      },
    ];
  }

  function drawNebulae() {
    nebulae.forEach(({ x, y, r, rgb }) => {
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(
        0,
        `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${CONFIG.nebulaOpacity})`,
      );
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  // ── Estrellas fugaces ──────────────────────────────────────────
  let shooters = [];

  function spawnShooter() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    shooters.push({
      x,
      y,
      len: 120 + Math.random() * 80,
      progress: 0,
      speed: 4 + Math.random() * 3,
    });
  }

  function drawShooters() {
    shooters = shooters.filter((s) => s.progress < 1);
    shooters.forEach((s) => {
      s.progress += s.speed / (s.len * 10);
      const alpha = Math.sin(s.progress * Math.PI);
      const tailX = s.x + s.progress * s.len;
      const tailY = s.y + s.progress * s.len * 0.4;

      const g = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
      g.addColorStop(0, `rgba(255,245,255,0)`);
      g.addColorStop(1, `rgba(255,245,255,${alpha * 0.9})`);

      ctx.strokeStyle = g;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(tailX, tailY);
      ctx.stroke();
    });
  }

  // ── Loop principal ─────────────────────────────────────────────
  let t = 0;

  function draw() {
    const W = canvas.width,
      H = canvas.height;

    // Fondo negro profundo
    ctx.fillStyle = "#00000a";
    ctx.fillRect(0, 0, W, H);

    // Nebulosas
    drawNebulae();

    // Estrellas de fondo
    stars.forEach((s) => {
      const tw = 0.55 + 0.45 * Math.sin(t * s.speed + s.phase);

      // Halo difuso
      const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 5);
      if (s.warm) {
        glow.addColorStop(0, `rgba(255,220,180,${0.18 * tw})`);
      } else {
        glow.addColorStop(0, `rgba(200,180,255,${0.22 * tw})`);
      }
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r * 5, 0, Math.PI * 2);
      ctx.fill();

      // Núcleo de la estrella
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r * tw, 0, Math.PI * 2);
      ctx.fillStyle = s.warm
        ? `rgba(255,235,200,${0.7 + 0.3 * tw})`
        : `rgba(240,225,255,${0.7 + 0.3 * tw})`;
      ctx.fill();
    });

    // Estrellas fugaces
    drawShooters();

    t += 0.016;
    requestAnimationFrame(draw);
  }

  // ── Init ───────────────────────────────────────────────────────
  function init() {
    resize();
    stars = makeStars(CONFIG.starCount);
    draw();
    setInterval(spawnShooter, CONFIG.shootingStarInterval);
  }

  window.addEventListener("resize", () => {
    resize();
    stars = makeStars(CONFIG.starCount);
  });

  init();
})();
