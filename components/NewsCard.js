// components/NewsCard.js
import Link from 'next/link';
import { Reveal } from './SectionHeader';
import { urlFor } from '../lib/sanity';

function resolveImage(item, w, h) {
  if (item.imageUrl) return item.imageUrl;
  if (typeof item.image === 'string') return item.image;
  if (item.image?.asset) { try { return urlFor(item.image).width(w).height(h).url(); } catch {} }
  return '/placeholder.jpg';
}

export default function NewsCard({ item, delay = 0 }) {
  const img = resolveImage(item, 600, 400);
  const href = item.slug?.current ? `/news/${item.slug.current}` : '#';

  return (
    <Reveal delay={delay}>
      <Link href={href} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="nc">
          <div className="nc-iw"><img className="nc-img" src={img} alt={item.title} /></div>
          <div className="nc-b">
            <div className="nc-m">
              <span className="nc-d">{item.date}</span>
              <span className="nc-tg">{item.categoryLabel}</span>
            </div>
            <h3 className="nc-t">{item.title}</h3>
            <p className="nc-e">{item.excerpt}</p>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}
