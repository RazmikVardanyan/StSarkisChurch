// components/GalleryGrid.js — исправленная версия
// Корректно обрабатывает изображения из Sanity CMS
import { useState, useEffect } from 'react';
import { Reveal } from './SectionHeader';
import Icons from './Icons';
import { urlFor } from '../lib/sanity';

// Универсальная функция — получает URL из любого формата
function resolveImage(item, width, height) {
  // Вариант 1: строка-URL (заглушки / mock data)
  if (typeof item === 'string') return item;

  // Вариант 2: объект с полем src (старый формат заглушек)
  if (item.src && typeof item.src === 'string') return item.src;

  // Вариант 3: объект с готовым imageUrl (из обновлённого GROQ-запроса)
  if (item.imageUrl && typeof item.imageUrl === 'string') return item.imageUrl;

  // Вариант 4: объект Sanity image (из CMS)
  const imageObj = item.image || item;
  if (imageObj && imageObj.asset) {
    try {
      let builder = urlFor(imageObj);
      if (width) builder = builder.width(width);
      if (height) builder = builder.height(height);
      return builder.url();
    } catch (err) {
      console.error('Ошибка urlFor:', err);
    }
  }

  // Ничего не подошло
  return '/placeholder.jpg';
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
      <img src={resolveImage(images[index], 1400, 1400)} alt={images[index].alt || ''} onClick={e => e.stopPropagation()} />
      <button className="sb lb-nav r" onClick={e => { e.stopPropagation(); onChange((index + 1) % images.length); }}>
        {Icons.chevRight()}
      </button>
      <div className="lb-counter">{index + 1} / {images.length}</div>
    </div>
  );
}

export default function GalleryGrid({ images = [] }) {
  const [lbIdx, setLbIdx] = useState(null);

  if (!images || images.length === 0) {
    return <p style={{ textAlign: 'center', color: 'var(--text-light)' }}>Фотографии пока не добавлены</p>;
  }

  return (
    <>
      <div className="gg">
        {images.map((img, i) => (
          <Reveal key={img._id || i} delay={i * 0.08}>
            <div className="gi" onClick={() => setLbIdx(i)}>
              <img src={resolveImage(img, 600, 600)} alt={img.alt || ''} />
              <div className="gi-ov">{Icons.expand()}</div>
            </div>
          </Reveal>
        ))}
      </div>
      {lbIdx !== null && <Lightbox images={images} index={lbIdx} onClose={() => setLbIdx(null)} onChange={setLbIdx} />}
    </>
  );
}
