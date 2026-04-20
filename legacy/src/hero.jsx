// Hero — terminal that types itself
const { useEffect, useState, useRef } = React;

function Prompt({ user = "guest", host = "portfolio", path = "~" }) {
  return (
    <span>
      <span style={{color:'var(--accent)'}}>{user}@{host}</span>
      <span style={{color:'var(--fg-mute)'}}>:</span>
      <span style={{color:'var(--fg-dim)'}}>{path}</span>
      <span style={{color:'var(--fg-mute)'}}>$ </span>
    </span>
  );
}

function TypedLine({ text, speed = 18, onDone, as = "span" }) {
  const [out, setOut] = useState("");
  useEffect(() => {
    let i = 0;
    let cancelled = false;
    function tick() {
      if (cancelled) return;
      if (i <= text.length) {
        setOut(text.slice(0, i));
        i++;
        // human-feel jitter
        const jitter = speed + Math.random() * 20 - 4;
        setTimeout(tick, jitter);
      } else {
        onDone && onDone();
      }
    }
    tick();
    return () => { cancelled = true; };
  }, [text]);
  const Tag = as;
  return <Tag>{out}</Tag>;
}

function AsciiSig() {
  // small mono monogram
  const lines = [
    "  ███▄    █   ▄████▄  ",
    "  ██ ▀█   █  ▒██▀ ▀█  ",
    " ▓██  ▀█ ██▒ ▒▓█    ▄ ",
    " ▓██▒  ▐▌██▒ ▒▓▓▄ ▄██▒",
    " ▒██░   ▓██░ ▒ ▓███▀ ░",
    " ░ ▒░   ▒ ▒  ░ ░▒ ▒  ░",
  ];
  return (
    <pre style={{
      margin: 0, fontSize: '10px', lineHeight: 1.1,
      color: 'color-mix(in oklab, var(--accent) 75%, var(--fg-mute))',
      opacity: 0.75,
    }}>
{lines.join("\n")}
    </pre>
  );
}

function Hero() {
  const D = window.DATA;
  const [step, setStep] = useState(0);
  // Sequence of commands + output
  const seq = [
    { kind: 'cmd', text: "whoami" },
    { kind: 'out', lines: [D.name.toUpperCase(), D.role] },
    { kind: 'cmd', text: "cat ./about.md | head -3" },
    { kind: 'out', lines: [
      `# ${D.years}+ years shipping production software`,
      `# web3 · fintech · enterprise · remote-first`,
      `# belgrade, rs — available for senior / staff roles`,
    ]},
    { kind: 'cmd', text: "ls ./focus" },
    { kind: 'out', chips: ["cosmos-sdk-modules", "go-indexers", "block-explorers", "dao-frameworks", "design-systems", "frontend-architecture"] },
    { kind: 'cmd', text: "./scroll_to_continue.sh" },
    { kind: 'blink' },
  ];
  function advance() { setStep(s => s + 1); }

  return (
    <section id="hero" style={{paddingTop: '80px', position:'relative'}}>
      <div aria-hidden="true" data-parallax="1.2" style={{
        position:'absolute', right:'-4%', top:'20%', width:220, height:220,
        borderRadius:'50%', background:'radial-gradient(circle, color-mix(in oklab, var(--accent) 35%, transparent), transparent 70%)',
        filter:'blur(30px)', pointerEvents:'none', zIndex:0,
      }} />
      <div aria-hidden="true" data-parallax="0.6" style={{
        position:'absolute', left:'-6%', top:'60%', width:180, height:180,
        borderRadius:'50%', background:'radial-gradient(circle, color-mix(in oklab, var(--accent) 20%, transparent), transparent 70%)',
        filter:'blur(40px)', pointerEvents:'none', zIndex:0,
      }} />
      <div className="hero-wrap" style={{maxWidth: 860, margin: '0 auto', position:'relative', zIndex:1}}>
        <div>
          <div className="terminal" data-tilt="3" style={{
            border: '1px solid var(--rule)',
            borderRadius: 4,
            background: 'color-mix(in oklab, var(--bg-2) 90%, transparent)',
            padding: '18px 22px 28px',
            fontSize: 14,
            minHeight: 500,
          }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              borderBottom: '1px solid var(--rule)', paddingBottom: 8, marginBottom: 14,
              fontSize: 11, color: 'var(--fg-mute)',
            }}>
              <div style={{display:'flex', gap:6}}>
                <span style={{width:10, height:10, borderRadius:'50%', background:'var(--fg-mute)', opacity:.4, display:'inline-block'}}></span>
                <span style={{width:10, height:10, borderRadius:'50%', background:'var(--fg-mute)', opacity:.4, display:'inline-block'}}></span>
                <span style={{width:10, height:10, borderRadius:'50%', background:'var(--accent)', display:'inline-block'}}></span>
              </div>
              <span>— zsh — /home/nikola — 80×24</span>
              <span>v1.0.0</span>
            </div>

            <HeroStream seq={seq} step={step} advance={advance} />
          </div>

          <div style={{
            marginTop: 32,
            display: 'flex', gap: 28, flexWrap: 'wrap',
            fontSize: 12, color: 'var(--fg-dim)',
            alignItems: 'center',
          }}>
            <div style={{display:'inline-flex', alignItems:'center', gap:8, color:'var(--accent)', fontSize:11}}>
              <span style={{width:6, height:6, borderRadius:'50%', background:'var(--accent)', display:'inline-block', boxShadow:'0 0 10px var(--accent)'}}></span>
              available · senior / staff
            </div>
            <span style={{color:'var(--fg-mute)'}}>·</span>
            <a href="#experience" data-hover data-magnetic="0.35" style={{borderBottom:'1px solid var(--fg-dim)', paddingBottom:2}}>→ view experience</a>
            <a href="#contact" data-hover data-magnetic="0.35" style={{borderBottom:'1px solid var(--fg-dim)', paddingBottom:2}}>→ get in touch</a>
            <a href="assets/Nikola-Cehic-CV.pdf" target="_blank" data-hover data-magnetic="0.35" style={{borderBottom:'1px solid var(--fg-dim)', paddingBottom:2}}>→ download cv.pdf</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroStream({ seq, step, advance }) {
  // Render items up to current step. When an item finishes, advance.
  return (
    <div>
      {seq.slice(0, step + 1).map((it, idx) => {
        const isLast = idx === step;
        if (it.kind === 'cmd') {
          return (
            <div key={idx} style={{marginTop: idx ? 8 : 0}}>
              <Prompt />
              {isLast
                ? <TypedLine text={it.text} speed={22} onDone={advance} />
                : <span>{it.text}</span>}
            </div>
          );
        }
        if (it.kind === 'out') {
          if (it.chips) {
            return <OutputChips key={idx} chips={it.chips} isLast={isLast} onDone={advance} />;
          }
          return <OutputLines key={idx} lines={it.lines} isLast={isLast} onDone={advance} />;
        }
        if (it.kind === 'blink') {
          return (
            <div key={idx} style={{marginTop:10}}>
              <Prompt />
              <span className="blink" style={{
                display:'inline-block', width:'8px', height:'15px',
                background:'var(--accent)', verticalAlign:'middle',
              }}></span>
              <style>{`.blink { animation: blink 1s steps(2) infinite; } @keyframes blink { 50% { opacity: 0; } }`}</style>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

function OutputLines({ lines, isLast, onDone }) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (shown < lines.length) {
      const t = setTimeout(() => setShown(shown + 1), 80);
      return () => clearTimeout(t);
    } else if (isLast) {
      const t = setTimeout(onDone, 200);
      return () => clearTimeout(t);
    }
  }, [shown, isLast]);
  return (
    <div style={{padding:'4px 0 2px 0'}}>
      {lines.slice(0, shown).map((l, i) => {
        // First "out" block: emphasize name
        const big = i === 0 && l === l.toUpperCase() && l.length < 30;
        return (
          <div key={i} style={{
            fontSize: big ? 42 : 13,
            fontFamily: big ? "'IBM Plex Mono', monospace" : "inherit",
            fontWeight: big ? 500 : 400,
            letterSpacing: big ? '-0.02em' : 0,
            color: big ? 'var(--fg)' : 'var(--fg-dim)',
            lineHeight: big ? 1.05 : 1.55,
            margin: big ? '6px 0 4px' : 0,
          }}>
            {big ? <span><span style={{color:'var(--accent)'}}>▸ </span><span data-kinetic={l}>{l}</span></span> : l}
          </div>
        );
      })}
    </div>
  );
}

function OutputChips({ chips, isLast, onDone }) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (shown < chips.length) {
      const t = setTimeout(() => setShown(shown + 1), 70);
      return () => clearTimeout(t);
    } else if (isLast) {
      const t = setTimeout(onDone, 250);
      return () => clearTimeout(t);
    }
  }, [shown, isLast]);
  return (
    <div style={{display:'flex', flexWrap:'wrap', gap:8, padding:'8px 0 2px'}}>
      {chips.slice(0, shown).map((c, i) => (
        <span key={i} className="tag accent" style={{fontSize:11}}>{c}</span>
      ))}
    </div>
  );
}

window.Hero = Hero;
