// components/GalleryGrid.js — с описанием под фотографиями
import { useState, useEffect } from 'react';
import { Reveal } from './SectionHeader';
import Icons from './Icons';
import { urlFor } from '../lib/sanity';

function resolveImage(item, width, height) {
  if (typeof item === 'string') return item;
  if (item.src && typeof item.src === 'string') return item.src;
  if (item.imageUrl && typeof item.imageUrl === 'string') return item.imageUrl;
  const imageObj = item.image || item;
  if (imageObj && imageObj.asset) {
    try {
      let b = urlFor(imageObj);
      if (width) b = b.width(width);
      if (height) b = b.height(height);
      return b.url();
    } catch {}
  }
  return '/placeholder.jpg';
}

function Lightbox({ images, index, onClose, onChange }) {
  const img = images[index];
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
      <div onClick={e => e.stopPropagation()} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '90%' }}>
        <img src={resolveImage(img, 1400, 1400)} alt={img.alt || ''} style={{ maxWidth: '100%', maxHeight: '75vh', borderRadius: 8, objectFit: 'contain', boxShadow: '0 0 60px rgba(0,0,0,0.5)' }} />
        {img.alt && (
          <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: 15, marginTop: 16, textAlign: 'center', maxWidth: 600, lineHeight: 1.5 }}>
            {img.alt}
          </div>
        )}
      </div>
      <button className="sb lb-nav r" onClick={e => { e.stopPropagation(); onChange((index + 1) % images.length); }}>
        {Icons.chevRight()}
      </button>
      <div className="lb-counter">{index + 1} / {images.length}</div>
    </div>
  );
}

export default function GalleryGrid({ images = [], showCaptions = false }) {
  const [lbIdx, setLbIdx] = useState(null);

  if (!images || images.length === 0) {
    return <p style={{ textAlign: 'center', color: 'var(--text-light)' }}>Фотографии пока не добавлены</p>;
  }

  return (
    <>
      <div className="gg">
        {images.map((img, i) => (
          <Reveal key={img._id || i} delay={i * 0.08}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="gi" onClick={() => setLbIdx(i)}>
                <img src={resolveImage(img, 600, 600)} alt={img.alt || ''} />
                <div className="gi-ov">{Icons.expand()}</div>
              </div>
              {showCaptions && img.alt && (
                <div style={{ fontSize: 13, color: 'var(--text-light)', marginTop: 8, textAlign: 'center', lineHeight: 1.4 }}>
                  {img.alt}
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </div>
      {lbIdx !== null && <Lightbox images={images} index={lbIdx} onClose={() => setLbIdx(null)} onChange={setLbIdx} />}
    </>
  );
}
