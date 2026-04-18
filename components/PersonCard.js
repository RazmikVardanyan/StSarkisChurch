// components/PersonCard.js
import { Reveal } from './SectionHeader';
import { urlFor } from '../lib/sanity';

function resolveImage(person, w, h) {
  if (person.imageUrl) return person.imageUrl;
  const raw = person.photo || person.image;
  if (typeof raw === 'string') return raw;
  if (raw?.asset) { try { return urlFor(raw).width(w).height(h).url(); } catch {} }
  return '/placeholder.jpg';
}

export default function PersonCard({ person, centered = false }) {
  const img = resolveImage(person, 400, 520);
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
