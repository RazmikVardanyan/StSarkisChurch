// components/PersonCard.js — работает и с заглушками, и с Sanity
import { Reveal } from './SectionHeader';
import { getImageUrl } from '../lib/api';

export default function PersonCard({ person, centered = false }) {
  const rawImg = person.photo || person.image;
  const img = typeof rawImg === 'string' ? rawImg : getImageUrl(rawImg, 400, 520);
  return (
    <Reveal>
      <div className="pc" style={centered ? { justifyContent: 'center', maxWidth: 560, margin: '0 auto 40px' } : {}}>
        <img className="pc-ph" src={img} alt={person.name} />
        <div style={centered ? { textAlign: 'left' } : {}}>
          <h3 className="pc-n">{person.name}</h3>
          <div className="pc-r">{person.role}</div>
          <p className="pc-bio">{person.bio}</p>
        </div>
      </div>
    </Reveal>
  );
}
