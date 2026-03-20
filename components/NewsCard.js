// components/NewsCard.js — работает и с заглушками, и с Sanity
import { Reveal } from './SectionHeader';
import { getImageUrl } from '../lib/api';

export default function NewsCard({ item, delay = 0 }) {
  const img = typeof item.image === 'string' ? item.image : getImageUrl(item.image, 600, 400);
  return (
    <Reveal delay={delay}>
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
    </Reveal>
  );
}
