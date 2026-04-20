// About / Skills / Contact sections
const { useState: useStateSec, useEffect: useEffectSec } = React;

function About() {
  const D = window.DATA;
  return (
    <section id="about" className="reveal">
      <div className="section-head">
        <div className="meta">— 01 / about</div>
        <h2><span className="caret">$</span> cat about.md</h2>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 280px', gap: 48,
        alignItems: 'start',
      }} className="about-grid">
        <div>
          {D.summary.map((p, i) => (
            <p key={i} style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 20, lineHeight: 1.5, fontWeight: 400,
              color: i === 0 ? 'var(--fg)' : 'var(--fg-dim)',
              margin: '0 0 20px 0', maxWidth: '62ch',
              letterSpacing: '-0.005em',
            }}>
              <span style={{color:'var(--accent)'}}>❯ </span>{p}
            </p>
          ))}

          <div style={{marginTop: 36, display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:20}} className="about-stats">
            <Stat n="7" suffix="+" label="years" />
            <Stat n="5" label="companies" />
            <Stat n="12" suffix="+" label="0→1 products" />
            <Stat n="∞" static={true} label="incidents triaged" />
          </div>
        </div>

        <div style={{
          border: '1px solid var(--rule)',
          padding: '16px 18px',
          fontSize: 11, color: 'var(--fg-dim)',
          borderRadius: 4,
          lineHeight: 1.7,
        }}>
          <div style={{color:'var(--fg-mute)', textTransform:'uppercase', letterSpacing:'.1em', fontSize:10, marginBottom:10}}>
            signature
          </div>
          <div>frontend architect · go indexer builder · design-system shipper</div>
          <hr style={{border:0, borderTop:'1px dashed var(--rule)', margin:'14px 0'}}/>
          <div style={{color:'var(--fg-mute)', textTransform:'uppercase', letterSpacing:'.1em', fontSize:10, marginBottom:10}}>
            known for
          </div>
          <ul style={{margin:0, padding:0, listStyle:'none', display:'flex', flexDirection:'column', gap:4}}>
            <li>▸ owning products 0→1</li>
            <li>▸ shipping across the stack</li>
            <li>▸ first-responder instincts</li>
            <li>▸ async, remote-first</li>
          </ul>
        </div>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .about-grid { grid-template-columns: 1fr !important; }
          .about-stats { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}

function Stat({ n, label, suffix, static: isStatic }) {
  return (
    <div style={{borderTop:'1px solid var(--rule)', paddingTop:12}}>
      <div style={{
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 38, color: 'var(--fg)', lineHeight: 1, letterSpacing: '-0.02em',
        fontWeight: 500,
      }}>
        {isStatic
          ? n
          : <span data-count={n} data-suffix={suffix || ''}>0{suffix || ''}</span>}
      </div>
      <div style={{fontSize:11, color:'var(--fg-mute)', textTransform:'uppercase', letterSpacing:'.1em', marginTop:6}}>{label}</div>
    </div>
  );
}

// ---- Skills ----
function Skills() {
  const D = window.DATA;
  const entries = Object.entries(D.skills);
  const [hover, setHover] = useStateSec(null);

  return (
    <section id="skills" className="reveal">
      <div className="section-head">
        <div className="meta">— 02 / stack</div>
        <h2><span className="caret">$</span> tree ./stack</h2>
      </div>

      <div className="skills-grid" style={{
        display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 0,
        border: '1px solid var(--rule)', borderRadius: 4,
      }}>
        {entries.map(([cat, items], i) => {
          const last = i === entries.length - 1;
          const leftCol = i % 2 === 0;
          return (
            <div key={cat}
              onMouseEnter={() => setHover(cat)}
              onMouseLeave={() => setHover(null)}
              style={{
                padding: '24px 28px',
                borderBottom: i < entries.length - 2 ? '1px solid var(--rule)' : 'none',
                borderRight: leftCol ? '1px solid var(--rule)' : 'none',
                transition: 'background 0.2s',
                background: hover === cat ? 'color-mix(in oklab, var(--accent) 5%, transparent)' : 'transparent',
                minHeight: 130,
              }}
              className="skill-cell"
            >
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:14}}>
                <div style={{
                  fontSize: 11, color: 'var(--fg-mute)',
                  textTransform:'uppercase', letterSpacing:'.12em',
                }}>
                  <span style={{color: hover === cat ? 'var(--accent)' : 'var(--fg-mute)'}}>├──</span> {cat}
                </div>
                <div style={{fontSize:10, color:'var(--fg-mute)'}}>{items.length}</div>
              </div>
              <div style={{display:'flex', flexWrap:'wrap', gap:6}}>
                {items.map(s => <span key={s} className="tag">{s}</span>)}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{marginTop: 20, fontSize:11, color:'var(--fg-mute)'}}>
        <span style={{color:'var(--accent)'}}>└──</span> also comfortable with: CI/CD pipelines, observability, schema design, wallet / signer integrations, live-incident triage.
      </div>

      <style>{`
        @media (max-width: 760px) {
          .skills-grid { grid-template-columns: 1fr !important; }
          .skill-cell { border-right: 0 !important; border-bottom: 1px solid var(--rule) !important; }
          .skill-cell:last-child { border-bottom: 0 !important; }
        }
      `}</style>
    </section>
  );
}

// ---- Contact ----
function Contact() {
  const D = window.DATA;
  const [copied, setCopied] = useStateSec(false);
  function copy() {
    navigator.clipboard?.writeText(D.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }
  return (
    <section id="contact" className="reveal" style={{paddingBottom: 60}}>
      <div className="section-head">
        <div className="meta">— 04 / contact</div>
        <h2><span className="caret">$</span> ./get_in_touch.sh</h2>
      </div>

      <div className="contact-grid" style={{
        display:'grid', gridTemplateColumns:'1fr 1fr', gap:40, alignItems:'start',
      }}>
        <div>
          <p style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 32, lineHeight: 1.2, margin: '0 0 24px 0',
            letterSpacing: '-0.02em', maxWidth: '22ch',
          }}>
            open to senior / staff roles <span style={{color:'var(--accent)'}}>—</span> especially web3 infra, design systems, and 0→1 frontend.
          </p>
          <p style={{color:'var(--fg-dim)', fontSize:13, maxWidth:'52ch'}}>
            Best way to reach me is email. I reply within 24h on weekdays. I work async across EU / US hours and ship fast.
          </p>
        </div>

        <div style={{
          border:'1px solid var(--rule)', borderRadius:4,
          background: 'color-mix(in oklab, var(--bg-2) 60%, transparent)',
          padding: '4px 0',
        }}>
          <ContactRow label="email" value={D.email} href={`mailto:${D.email}`} copyable onCopy={copy} copied={copied} />
          <ContactRow label="phone" value={D.phone} href={`tel:${D.phone.replace(/\s/g,'')}`} />
          <ContactRow label="linkedin" value={D.linkedin} href={D.linkedinUrl} external />
          <ContactRow label="location" value={D.location + "  ·  UTC+1"} />
          <ContactRow label="resume" value="Nikola-Cehic-CV.pdf" href="assets/Nikola-Cehic-CV.pdf" download external />
        </div>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function ContactRow({ label, value, href, copyable, onCopy, copied, external, download }) {
  return (
    <div style={{
      display:'grid', gridTemplateColumns: '110px 1fr auto',
      alignItems: 'center', gap: 16,
      padding: '14px 20px',
      borderBottom: '1px solid var(--rule)',
      fontSize: 13,
    }}
    onMouseEnter={e => e.currentTarget.style.background = 'color-mix(in oklab, var(--accent) 5%, transparent)'}
    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
    >
      <span style={{color:'var(--fg-mute)', fontSize:11, textTransform:'uppercase', letterSpacing:'.1em'}}>{label}</span>
      {href ? (
        <a href={href} data-hover target={external ? '_blank' : undefined}
           download={download ? '' : undefined}
           style={{color:'var(--fg)'}}>{value}</a>
      ) : <span style={{color:'var(--fg-dim)'}}>{value}</span>}
      <span style={{display:'flex', gap:8}}>
        {copyable && (
          <button data-hover onClick={onCopy}
            style={{
              fontSize:10, color: copied ? 'var(--accent)' : 'var(--fg-mute)',
              border:'1px solid var(--rule)', padding:'3px 8px', borderRadius:2,
              textTransform:'uppercase', letterSpacing:'.1em',
            }}
          >{copied ? 'copied' : 'copy'}</button>
        )}
        {external && (
          <span style={{color:'var(--fg-mute)', fontSize:12}}>↗</span>
        )}
      </span>
    </div>
  );
}

window.About = About;
window.Skills = Skills;
window.Contact = Contact;
