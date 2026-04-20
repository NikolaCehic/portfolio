// Animation engine — canvas bg, scroll progress, parallax, magnetic, scramble, counters
(function(){
  'use strict';

  // ---------- 1. Animated background canvas ----------
  // Drifting grid of mono glyphs + connecting lines, reacts to scroll + mouse.
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let W = 0, H = 0, DPR = Math.min(window.devicePixelRatio || 1, 2);
  const GLYPHS = "01▸▹◆◇▪▫⌘⎔│─├└┬┴";
  let nodes = [];
  const NODE_COUNT = window.innerWidth < 760 ? 30 : 70;
  let mouse = { x: -9999, y: -9999 };
  let scrollY = 0;

  function resize() {
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = W * DPR; canvas.height = H * DPR;
    canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }
  function seed() {
    nodes = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        g: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
        size: 10 + Math.random() * 4,
        alpha: 0.25 + Math.random() * 0.4,
        phase: Math.random() * Math.PI * 2,
      });
    }
  }
  function getAccent() {
    return getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#9aff6b';
  }
  function getFgDim() {
    return getComputedStyle(document.documentElement).getPropertyValue('--fg-dim').trim() || '#aaa';
  }

  function draw(t) {
    ctx.clearRect(0, 0, W, H);
    const accent = getAccent();
    const fgDim = getFgDim();
    const parallax = scrollY * 0.04;

    // connecting lines
    ctx.lineWidth = 1;
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dx = a.x - b.x, dy = (a.y - parallax) - (b.y - parallax);
        const d2 = dx*dx + dy*dy;
        if (d2 < 140*140) {
          const alpha = (1 - Math.sqrt(d2)/140) * 0.09;
          ctx.strokeStyle = `color-mix(in oklab, ${fgDim} ${alpha*100}%, transparent)`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y - parallax);
          ctx.lineTo(b.x, b.y - parallax);
          ctx.stroke();
        }
      }
    }

    // nodes
    ctx.font = "11px 'JetBrains Mono', monospace";
    for (const n of nodes) {
      n.x += n.vx; n.y += n.vy; n.phase += 0.008;
      if (n.x < -20) n.x = W + 20; if (n.x > W + 20) n.x = -20;
      if (n.y < -20) n.y = H + 20; if (n.y > H + 20) n.y = -20;

      const ny = n.y - parallax;
      // mouse repulsion
      const mdx = n.x - mouse.x, mdy = ny - mouse.y;
      const md2 = mdx*mdx + mdy*mdy;
      let px = n.x, py = ny;
      if (md2 < 140*140 && md2 > 0) {
        const f = (1 - Math.sqrt(md2)/140);
        px += mdx / Math.sqrt(md2) * f * 18;
        py += mdy / Math.sqrt(md2) * f * 18;
      }

      const near = md2 < 180*180;
      const alpha = near ? 0.9 : n.alpha * (0.7 + 0.3 * Math.sin(n.phase));
      const color = near ? accent : fgDim;
      ctx.fillStyle = `color-mix(in oklab, ${color} ${alpha*100}%, transparent)`;
      ctx.fillText(n.g, px, py);
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); seed(); });
  window.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
  window.addEventListener('mouseleave', () => { mouse.x = mouse.y = -9999; });
  window.addEventListener('scroll', () => { scrollY = window.scrollY; }, { passive: true });
  resize(); seed(); requestAnimationFrame(draw);

  // ---------- 2. Scroll progress bar ----------
  const progress = document.getElementById('scroll-progress');
  function updateProgress() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? (window.scrollY / max) * 100 : 0;
    progress.style.width = p + '%';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  // ---------- 3. Scroll-driven parallax / fade ----------
  // Elements with data-parallax="0.2" translate by scroll * amount
  function applyParallax() {
    const els = document.querySelectorAll('[data-parallax]');
    const sy = window.scrollY;
    els.forEach(el => {
      const amt = parseFloat(el.dataset.parallax);
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const delta = center - window.innerHeight / 2;
      el.style.transform = `translateY(${delta * amt * -0.15}px)`;
    });
  }
  let raf = null;
  window.addEventListener('scroll', () => {
    if (raf) return;
    raf = requestAnimationFrame(() => { applyParallax(); raf = null; });
  }, { passive: true });
  applyParallax();

  // ---------- 4. Counter that ticks as you scroll into view ----------
  function animateCounter(el) {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const duration = 1400;
    const start = performance.now();
    function tick(t) {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const v = target * eased;
      el.textContent = (target % 1 === 0 ? Math.floor(v) : v.toFixed(1)) + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(tick);
  }
  const counterIO = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting && !en.target.dataset.counted) {
        en.target.dataset.counted = '1';
        animateCounter(en.target);
        counterIO.unobserve(en.target);
      }
    });
  }, { threshold: 0.4 });
  function rescanCounters() {
    document.querySelectorAll('[data-count]:not([data-counted])').forEach(el => counterIO.observe(el));
  }
  new MutationObserver(rescanCounters).observe(document.body, { childList: true, subtree: true });
  rescanCounters();

  // ---------- 5. Magnetic hover ----------
  function bindMagnetic(el) {
    const strength = parseFloat(el.dataset.magnetic) || 0.3;
    function onMove(e) {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    }
    function onLeave() { el.style.transform = ''; }
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
  }
  function rescanMagnetic() {
    document.querySelectorAll('[data-magnetic]:not([data-mag-bound])').forEach(el => {
      el.dataset.magBound = '1';
      el.classList.add('magnetic');
      bindMagnetic(el);
    });
  }
  new MutationObserver(rescanMagnetic).observe(document.body, { childList: true, subtree: true });
  rescanMagnetic();

  // ---------- 6. Text scramble on view ----------
  const SCRAMBLE_CHARS = "!<>-_\\/[]{}—=+*^?#________";
  function scramble(el, finalText, duration = 900) {
    const start = performance.now();
    function frame(t) {
      const p = Math.min(1, (t - start) / duration);
      let out = '';
      for (let i = 0; i < finalText.length; i++) {
        const reveal = p > i / finalText.length;
        if (reveal) out += finalText[i];
        else out += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      }
      el.textContent = out;
      if (p < 1) requestAnimationFrame(frame);
      else el.textContent = finalText;
    }
    requestAnimationFrame(frame);
  }
  const scrambleIO = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting && !en.target.dataset.scrambled) {
        en.target.dataset.scrambled = '1';
        const final = en.target.dataset.scramble || en.target.textContent;
        scramble(en.target, final);
        scrambleIO.unobserve(en.target);
      }
    });
  }, { threshold: 0.6 });
  function rescanScramble() {
    document.querySelectorAll('[data-scramble]:not([data-scrambled])').forEach(el => scrambleIO.observe(el));
  }
  new MutationObserver(rescanScramble).observe(document.body, { childList: true, subtree: true });
  rescanScramble();

  // ---------- 7. Section heading h2 → glitch on hover (auto-tag) ----------
  function rescanGlitch() {
    document.querySelectorAll('.section-head h2:not([data-glitch-bound])').forEach(h => {
      h.dataset.glitchBound = '1';
      const txt = h.textContent;
      h.classList.add('glitch');
      h.setAttribute('data-text', txt);
    });
  }
  new MutationObserver(rescanGlitch).observe(document.body, { childList: true, subtree: true });
  rescanGlitch();
})();
