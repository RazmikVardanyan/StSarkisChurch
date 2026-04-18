// components/HeroSlider.js
import { useState, useEffect, useRef, useCallback } from 'react';
import Icons from './Icons';
import { urlFor } from '../lib/sanity';

function resolveImage(item, w, h) {
  if (item.imageUrl) return item.imageUrl;
  if (typeof item.image === 'string') return item.image;
  if (item.image?.asset) { try { return urlFor(item.image).width(w).height(h).url(); } catch {} }
  return '/placeholder.jpg';
}

export default function HeroSlider({ slides = [] }) {
  const [cur, setCur] = useState(0);
  const timer = useRef(null);
  const len = slides.length || 1;
  const start = useCallback(() => { timer.current = setInterval(() => setCur(p => (p + 1) % len), 5500); }, [len]);
  useEffect(() => { start(); return () => clearInterval(timer.current); }, [start]);
  const go = (d) => { clearInterval(timer.current); setCur(p => (p + d + len) % len); start(); };
  const dot = (i) => { clearInterval(timer.current); setCur(i); start(); };

  if (!slides.length) return <div className="hero" />;

  return (
    <div className="hero">
      {slides.map((s, i) => (
        <div key={s._id} className={`hs${i === cur ? ' act' : ''}`}>
          <img className="hs-img" src={resolveImage(s, 1400, 700)} alt="" />
          <div className="hs-ov">
            {i === cur && (
              <div className="hs-c in">
                <div className="hs-dt">{s.date}</div>
                <h1 className="hs-h">{s.title}</h1>
                <div className="hs-st">{s.subtitle}</div>
                <p className="hs-ds">{s.description}</p>
              </div>
            )}
          </div>
        </div>
      ))}
      <div className="sc">
        <button className="sb" onClick={() => go(-1)}>{Icons.chevLeft()}</button>
        <div className="sd">{slides.map((_, i) => <button key={i} className={`sdt${i === cur ? ' act' : ''}`} onClick={() => dot(i)} />)}</div>
        <button className="sb" onClick={() => go(1)}>{Icons.chevRight()}</button>
      </div>
    </div>
  );
}
