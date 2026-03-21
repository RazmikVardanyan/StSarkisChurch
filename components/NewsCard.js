// components/NewsCard.js — карточка со ссылкой на полную новость
import Link from 'next/link';
import { Reveal } from './SectionHeader';
import { getImageUrl } from '../lib/api';

export default function NewsCard({ item, delay = 0 }) {
  const img = typeof item.image === 'string' ? item.image : getImageUrl(item.image, 600, 400);
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
