// components/GalleryGrid.js — работает и с заглушками, и с Sanity
import { useState, useEffect } from 'react';
import { Reveal } from './SectionHeader';
import Icons from './Icons';
import { getImageUrl } from '../lib/api';

// Получить URL — строка или объект Sanity
function imgSrc(img, w, h) {
  const raw = img.src || img.image;
  return typeof raw === 'string' ? raw : getImageUrl(raw, w, h);
}

function Lightbox({ images, index, onClose, onChange }) {
  useEffect(() => {
    const fn = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onChange((index + 1) % images.length);
      if (e.key === 'ArrowLeft') onChange((index - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [index, images.length, onClose, onChange]);

  return (
    <div className="lb" onClick={onClose}>
      <button className="lb-cl" onClick={onClose}>{Icons.close()}</button>
      <button className="sb lb-nav l" onClick={e => { e.stopPropagation(); onChange((index - 1 + images.length) % images.length); }}>
        {Icons.chevLeft()}
      </button>
      <img src={imgSrc(images[index], 1200, 1200)} alt={images[index].alt || ''} onClick={e => e.stopPropagation()} />
      <button className="sb lb-nav r" onClick={e => { e.stopPropagation(); onChange((index + 1) % images.length); }}>
        {Icons.chevRight()}
      </button>
      <div className="lb-counter">{index + 1} / {images.length}</div>
    </div>
  );
}

export default function GalleryGrid({ images = [] }) {
  const [lbIdx, setLbIdx] = useState(null);
  return (
    <>
      <div className="gg">
        {images.map((img, i) => (
          <Reveal key={img._id || i} delay={i * 0.08}>
            <div className="gi" onClick={() => setLbIdx(i)}>
              <img src={imgSrc(img, 600, 600)} alt={img.alt || ''} />
              <div className="gi-ov">{Icons.expand()}</div>
            </div>
          </Reveal>
        ))}
      </div>
      {lbIdx !== null && <Lightbox images={images} index={lbIdx} onClose={() => setLbIdx(null)} onChange={setLbIdx} />}
    </>
  );
}
