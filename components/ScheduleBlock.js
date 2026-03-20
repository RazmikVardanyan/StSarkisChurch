import { Reveal } from './SectionHeader';
import Icons from './Icons';

export default function ScheduleBlock({ items = [] }) {
  return (
    <Reveal>
      <div className="sched">
        {items.map((s, i) => (
          <div className="si" key={i}>
            <span className="si-day">{s.day}</span>
            <span className="si-tm">{Icons.clock()}{s.time}</span>
            <span className="si-sv">{s.service}</span>
            <span className={`si-tp ${s.type}`}>
              {s.type === 'main' ? 'Литургия' : s.type === 'sacrament' ? 'Таинство' : 'Молитва'}
            </span>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
