// Experience — index-style, numbered, hover to preview
const { useState: useStateExp, useEffect: useEffectExp, useRef: useRefExp } = React;

function Experience() {
  const D = window.DATA;
  const [hovered, setHovered] = useStateExp(0);
  const [expandedId, setExpandedId] = useStateExp(null);

  return (
    <section id="experience" className="reveal">
      <div className="section-head">
        <div className="meta">— 03 / experience</div>
        <h2><span className="caret">$</span> experience.log <span style={{color:'var(--fg-mute)', fontSize:14, fontWeight:400, letterSpacing:0}}>— 5 roles · 7+ yrs</span></h2>
      </div>

      <div className="xp-grid" style={{
        display: 'grid', gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 1fr)', gap: 40,
        alignItems: 'start',
      }}>
        <div className="xp-list" onMouseLeave={() => setHovered(null)}>
          {D.experience.map((job, i) => (
            <XPRow key={job.id} job={job} idx={i} total={D.experience.length}
              isHovered={hovered === i}
              anyHovered={hovered !== null}
              expanded={expandedId === job.id}
              onHover={() => setHovered(i)}
              onToggle={() => setExpandedId(expandedId === job.id ? null : job.id)}
            />
          ))}
        </div>

        <aside className="xp-preview" data-tilt="4" style={{
          position: 'sticky', top: 110,
          border: '1px solid var(--rule)',
          borderRadius: 4,
          padding: 22,
          minHeight: 400,
          background: 'color-mix(in oklab, var(--bg-2) 70%, transparent)',
          fontSize: 12,
        }}>
          <PreviewCard job={hovered != null ? D.experience[hovered] : D.experience[0]} />
        </aside>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .xp-grid { grid-template-columns: 1fr !important; }
          .xp-preview { display: none !important; }
        }
      `}</style>
    </section>
  );
}

function XPRow({ job, idx, total, isHovered, anyHovered, expanded, onHover, onToggle }) {
  const dim = anyHovered && !isHovered && !expanded;
  return (
    <div
      onMouseEnter={onHover}
      style={{
        borderTop: '1px solid var(--rule)',
        borderBottom: idx === total - 1 ? '1px solid var(--rule)' : 'none',
        transition: 'opacity 0.2s, background 0.2s',
        opacity: dim ? 0.35 : 1,
        background: isHovered ? 'color-mix(in oklab, var(--accent) 4%, transparent)' : 'transparent',
      }}
    >
      <button
        onClick={onToggle}
        data-hover
        style={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '44px 1fr auto',
          gap: 20, alignItems: 'center',
          padding: '22px 8px',
          textAlign: 'left',
        }}
      >
        <span style={{
          color: isHovered ? 'var(--accent)' : 'var(--fg-mute)',
          fontSize: 11, letterSpacing: '0.1em',
        }}>
          [{String(idx + 1).padStart(2, '0')}]
        </span>
        <span style={{display:'flex', flexDirection:'column', gap:4, minWidth:0}}>
          <span style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 26, letterSpacing: '-0.01em',
            color: 'var(--fg)',
            fontWeight: 500,
          }}>
            {job.company}
            <span style={{color:'var(--fg-mute)', fontWeight:400, fontSize:13, marginLeft:10, letterSpacing:0}}>
              — {job.role}
            </span>
          </span>
          <span style={{fontSize:11, color:'var(--fg-mute)', display:'flex', gap:14, flexWrap:'wrap'}}>
            <span>{job.period}</span>
            <span>·</span>
            <span>{job.mode}</span>
            <span>·</span>
            <span>{job.stack.slice(0, 4).join(' / ')}</span>
          </span>
        </span>
        <span style={{
          fontSize: 18, color: 'var(--fg-mute)',
          transition: 'transform 0.25s, color 0.2s',
          transform: expanded ? 'rotate(90deg)' : 'rotate(0)',
          color: isHovered ? 'var(--accent)' : 'var(--fg-mute)',
        }}>→</span>
      </button>

      {expanded && (
        <div style={{
          padding: '4px 8px 28px 64px',
          animation: 'xpExpand 0.4s ease',
        }}>
          <div style={{fontSize:12, color:'var(--fg-dim)', marginBottom:16, maxWidth:720}}>
            {job.summary}
          </div>
          <div style={{display:'flex', flexWrap:'wrap', gap:6, marginBottom:20}}>
            {job.stack.map(s => <span key={s} className="tag">{s}</span>)}
          </div>
          <ol style={{margin:0, padding:0, listStyle:'none'}}>
            {job.highlights.map((h, i) => (
              <li key={i} style={{
                display: 'grid',
                gridTemplateColumns: '50px 200px 1fr',
                gap: 20,
                padding: '14px 0',
                borderTop: '1px dashed var(--rule)',
                fontSize: 12,
              }}>
                <span style={{color:'var(--fg-mute)', fontSize:11}}>{String(i+1).padStart(2,'0')}.</span>
                <span style={{color:'var(--fg)', fontWeight:500}}>{h.title}</span>
                <span style={{color:'var(--fg-dim)', lineHeight:1.65, maxWidth: '64ch'}}>{h.body}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
      <style>{`@keyframes xpExpand { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: none; } }`}</style>
    </div>
  );
}

function PreviewCard({ job }) {
  return (
    <div key={job.id} style={{animation: 'fadePrev 0.3s ease'}}>
      <div style={{fontSize:10, letterSpacing:'0.12em', color:'var(--fg-mute)', textTransform:'uppercase', marginBottom:10}}>
        $ cat ./experience/{job.id}.md
      </div>
      <div style={{
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 22, letterSpacing: '-0.01em',
        color: 'var(--fg)', marginBottom: 4, fontWeight: 500,
      }}>
        {job.company}
      </div>
      <div style={{color:'var(--fg-dim)', fontSize:12, marginBottom:14}}>
        {job.role}
      </div>
      <div style={{display:'flex', gap:12, flexWrap:'wrap', fontSize:11, color:'var(--fg-mute)', marginBottom:18}}>
        <span>▸ {job.period}</span>
        <span>▸ {job.mode}</span>
      </div>
      <div style={{color:'var(--fg-dim)', fontSize:12, lineHeight:1.65, marginBottom:18, maxWidth:'48ch'}}>
        {job.summary}
      </div>
      <div style={{fontSize:10, letterSpacing:'0.12em', color:'var(--fg-mute)', textTransform:'uppercase', marginBottom:8}}>
        stack
      </div>
      <div style={{display:'flex', flexWrap:'wrap', gap:6, marginBottom:18}}>
        {job.stack.map(s => <span key={s} className="tag accent">{s}</span>)}
      </div>
      <div style={{fontSize:10, letterSpacing:'0.12em', color:'var(--fg-mute)', textTransform:'uppercase', marginBottom:8}}>
        key ships — {job.highlights.length}
      </div>
      <ul style={{margin:0, padding:0, listStyle:'none', fontSize:12, color:'var(--fg-dim)'}}>
        {job.highlights.slice(0, 4).map((h, i) => (
          <li key={i} style={{padding:'4px 0', display:'flex', gap:8}}>
            <span style={{color:'var(--accent)'}}>▸</span>
            <span>{h.title}</span>
          </li>
        ))}
      </ul>
      <style>{`@keyframes fadePrev { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }`}</style>
    </div>
  );
}

window.Experience = Experience;
