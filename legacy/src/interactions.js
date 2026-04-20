// Extended interactions — tilt, ripple, marquee, kinetic heading, cursor trail
(function(){
  'use strict';

  // ---------- 3D tilt on cards with data-tilt ----------
  function bindTilt(el) {
    const max = parseFloat(el.dataset.tilt) || 8;
    function move(e) {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateY(${x * max}deg) rotateX(${-y * max}deg) translateZ(0)`;
      el.style.setProperty('--glare-x', (x*100+50) + '%');
      el.style.setProperty('--glare-y', (y*100+50) + '%');
    }
    function leave() { el.style.transform = ''; }
    el.addEventListener('mousemove', move);
    el.addEventListener('mouseleave', leave);
  }
  function rescanTilt() {
    document.querySelectorAll('[data-tilt]:not([data-tilt-bound])').forEach(el => {
      el.dataset.tiltBound = '1';
      el.style.transition = 'transform 0.18s cubic-bezier(.2,.7,.2,1)';
      el.style.transformStyle = 'preserve-3d';
      bindTilt(el);
    });
  }
  new MutationObserver(rescanTilt).observe(document.body, { childList: true, subtree: true });
  rescanTilt();

  // ---------- Ripple on tags ----------
  function rescanRipple() {
    document.querySelectorAll('.tag:not([data-ripple-bound])').forEach(el => {
      el.dataset.rippleBound = '1';
      el.style.position = 'relative';
      el.style.overflow = 'hidden';
      el.addEventListener('click', (e) => {
        const r = el.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.style.cssText = `position:absolute;left:${e.clientX - r.left}px;top:${e.clientY - r.top}px;
          width:4px;height:4px;background:var(--accent);border-radius:50%;
          transform:translate(-50%,-50%);pointer-events:none;
          animation:rippleExpand 0.6s ease-out forwards;`;
        el.appendChild(ripple);
        setTimeout(() => ripple.remove(), 650);
      });
    });
  }
  new MutationObserver(rescanRipple).observe(document.body, { childList: true, subtree: true });
  rescanRipple();

  // ---------- Cursor trail (accent dots) ----------
  const trail = [];
  const MAX_TRAIL = 12;
  document.addEventListener('mousemove', (e) => {
    const d = document.createElement('div');
    d.className = 'cursor-trail-dot';
    d.style.cssText = `position:fixed;left:${e.clientX}px;top:${e.clientY}px;
      width:4px;height:4px;border-radius:50%;background:var(--accent);
      pointer-events:none;z-index:9998;transform:translate(-50%,-50%);
      transition:opacity 0.6s, transform 0.6s;opacity:0.7;`;
    document.body.appendChild(d);
    trail.push(d);
    requestAnimationFrame(() => {
      d.style.opacity = '0';
      d.style.transform = `translate(-50%,-50%) scale(3)`;
    });
    setTimeout(() => d.remove(), 600);
    if (trail.length > MAX_TRAIL) {
      const old = trail.shift();
      if (old) old.remove();
    }
  });

  // ---------- Infinite marquee for data-marquee ----------
  function setupMarquee(el) {
    const speed = parseFloat(el.dataset.marquee) || 40; // px/sec
    // Duplicate content for seamless loop
    const inner = el.querySelector('.marquee-track') || (() => {
      const t = document.createElement('div');
      t.className = 'marquee-track';
      while (el.firstChild) t.appendChild(el.firstChild);
      el.appendChild(t);
      return t;
    })();
    const clone = inner.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    el.appendChild(clone);
    el.style.overflow = 'hidden';
    el.style.display = 'flex';
    inner.style.display = clone.style.display = 'flex';
    inner.style.flexShrink = clone.style.flexShrink = '0';

    let offset = 0, last = performance.now(), paused = false;
    el.addEventListener('mouseenter', () => paused = true);
    el.addEventListener('mouseleave', () => paused = false);
    function tick(now) {
      const dt = (now - last) / 1000; last = now;
      if (!paused) offset -= speed * dt;
      const w = inner.offsetWidth;
      if (w > 0 && -offset >= w) offset += w;
      inner.style.transform = clone.style.transform = `translateX(${offset}px)`;
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  function rescanMarquee() {
    document.querySelectorAll('[data-marquee]:not([data-mq-bound])').forEach(el => {
      el.dataset.mqBound = '1';
      setupMarquee(el);
    });
  }
  new MutationObserver(rescanMarquee).observe(document.body, { childList: true, subtree: true });
  rescanMarquee();

  // ---------- Kinetic text: letters that sway to mouse ----------
  function bindKinetic(el) {
    const txt = el.dataset.kinetic || el.textContent;
    el.textContent = '';
    const spans = [];
    for (const ch of txt) {
      const s = document.createElement('span');
      s.textContent = ch === ' ' ? '\u00A0' : ch;
      s.style.display = 'inline-block';
      s.style.transition = 'transform 0.3s cubic-bezier(.2,.7,.2,1), color 0.2s';
      el.appendChild(s);
      spans.push(s);
    }
    function move(e) {
      const r = el.getBoundingClientRect();
      spans.forEach((s) => {
        const sr = s.getBoundingClientRect();
        const cx = sr.left + sr.width / 2;
        const cy = sr.top + sr.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const d = Math.sqrt(dx*dx + dy*dy);
        if (d < 120) {
          const f = (1 - d / 120);
          s.style.transform = `translate(${-dx * f * 0.2}px, ${-dy * f * 0.2}px)`;
          s.style.color = 'var(--accent)';
        } else {
          s.style.transform = '';
          s.style.color = '';
        }
      });
    }
    function leave() { spans.forEach(s => { s.style.transform=''; s.style.color=''; }); }
    el.addEventListener('mousemove', move);
    el.addEventListener('mouseleave', leave);
  }
  function rescanKinetic() {
    document.querySelectorAll('[data-kinetic]:not([data-k-bound])').forEach(el => {
      el.dataset.kBound = '1';
      bindKinetic(el);
    });
  }
  new MutationObserver(rescanKinetic).observe(document.body, { childList: true, subtree: true });
  rescanKinetic();

  // ---------- Inject CSS ----------
  const css = `
    @keyframes rippleExpand {
      to { transform: translate(-50%,-50%) scale(40); opacity: 0; }
    }
    [data-tilt] { position: relative; }
    [data-tilt]::after {
      content: ''; position: absolute; inset: 0; pointer-events: none;
      background: radial-gradient(circle at var(--glare-x, 50%) var(--glare-y, 50%),
        color-mix(in oklab, var(--accent) 12%, transparent), transparent 50%);
      opacity: 0; transition: opacity 0.3s; border-radius: inherit;
    }
    [data-tilt]:hover::after { opacity: 1; }
    .tag { transition: border-color 0.2s, color 0.2s, background 0.2s, transform 0.15s; }
    .tag:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-1px); }
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
})();
