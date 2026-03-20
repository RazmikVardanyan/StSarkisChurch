import { useState, useEffect, useRef } from 'react';

// ─── Armenian Knotwork Ornament ────────────
export function ArmenianOrnament({ style = {}, light = false }) {
  const band = light ? '#D4BC96' : '#8B6F5E';
  const bandDark = light ? '#C9A87E' : '#6B4C3E';
  const dot = light ? '#D4B0A3' : '#B8976A';
  const op = light ? 0.75 : 0.6;
  return (
  <svg viewBox="0 0 400 44" style={{ width: 140, height: 15, opacity: op, ...style }} fill="none">
    <path d="M0 22 C12 22, 18 38, 35 38 C52 38, 52 22, 68 22 C84 22, 84 6, 100 6 C108 6, 114 12, 114 22" stroke={band} strokeWidth="4" strokeLinecap="round" />
    <path d="M0 22 C12 22, 18 6, 35 6 C52 6, 52 22, 68 22 C84 22, 84 38, 100 38 C108 38, 114 32, 114 22" stroke={bandDark} strokeWidth="4" strokeLinecap="round" />
    <path d="M48 15 C54 22, 54 22, 48 29" stroke={bandDark} strokeWidth="5" strokeLinecap="round" />
    <path d="M82 15 C88 22, 88 22, 82 29" stroke={band} strokeWidth="5" strokeLinecap="round" />
    <circle cx="128" cy="22" r="4" fill={dot} /><circle cx="128" cy="6" r="2.5" fill={dot} opacity="0.6" /><circle cx="128" cy="38" r="2.5" fill={dot} opacity="0.6" />
    <path d="M142 22 C150 22, 155 6, 170 6 C185 6, 185 38, 200 38 C215 38, 215 6, 230 6 C245 6, 250 22, 258 22" stroke={band} strokeWidth="4" strokeLinecap="round" />
    <path d="M142 22 C150 22, 155 38, 170 38 C185 38, 185 6, 200 6 C215 6, 215 38, 230 38 C245 38, 250 22, 258 22" stroke={bandDark} strokeWidth="4" strokeLinecap="round" />
    <path d="M183 15 C188 22, 188 22, 183 29" stroke={bandDark} strokeWidth="5" strokeLinecap="round" />
    <path d="M217 15 C212 22, 212 22, 217 29" stroke={band} strokeWidth="5" strokeLinecap="round" />
    <circle cx="272" cy="22" r="4" fill={dot} /><circle cx="272" cy="6" r="2.5" fill={dot} opacity="0.6" /><circle cx="272" cy="38" r="2.5" fill={dot} opacity="0.6" />
    <path d="M400 22 C388 22, 382 38, 365 38 C348 38, 348 22, 332 22 C316 22, 316 6, 300 6 C292 6, 286 12, 286 22" stroke={band} strokeWidth="4" strokeLinecap="round" />
    <path d="M400 22 C388 22, 382 6, 365 6 C348 6, 348 22, 332 22 C316 22, 316 38, 300 38 C292 38, 286 32, 286 22" stroke={bandDark} strokeWidth="4" strokeLinecap="round" />
    <path d="M352 15 C346 22, 346 22, 352 29" stroke={bandDark} strokeWidth="5" strokeLinecap="round" />
    <path d="M318 15 C312 22, 312 22, 318 29" stroke={band} strokeWidth="5" strokeLinecap="round" />
  </svg>
  );
}

// ─── Scroll Reveal Animation ───────────────
export function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? 'translateY(0)' : 'translateY(24px)',
      transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
    }}>{children}</div>
  );
}

// ─── Section Header with Ornament ──────────
export default function SectionHeader({ label, title }) {
  return (
    <Reveal>
      <div className="sh">
        <div className="sl">{label}</div>
        <h2 className="st">{title}</h2>
        <div className="sdv"><ArmenianOrnament /></div>
      </div>
    </Reveal>
  );
}
