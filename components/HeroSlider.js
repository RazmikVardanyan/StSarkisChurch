// components/HeroSlider.js — работает и с заглушками, и с Sanity
import { useState, useEffect, useRef, useCallback } from 'react';
import Icons from './Icons';
import { getImageUrl } from '../lib/api';

export default function HeroSlider({ slides = [] }) {
  const [cur, setCur] = useState(0);
  const timer = useRef(null);
  const len = slides.length || 1;
  const start = useCallback(() => { timer.current = setInterval(() => setCur(p => (p + 1) % len), 5500); }, [len]);
  useEffect(() => { start(); return () => clearInterval(timer.current); }, [start]);
  const go = (d) => { clearInterval(timer.current); setCur(p => (p + d + len) % len); start(); };
  const dot = (i) => { clearInterval(timer.current); setCur(i); start(); };

  // Получить URL картинки — работает и со строкой, и с объектом Sanity
  const imgSrc = (image) => typeof image === 'string' ? image : getImageUrl(image, 1400, 700);

  if (!slides.length) return <div className="hero" />;

  return (
    <div className="hero">
      {slides.map((s, i) => (
        <div key={s._id} className={`hs${i === cur ? ' act' : ''}`}>
          <img className="hs-img" src={imgSrc(s.image)} alt="" />
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
