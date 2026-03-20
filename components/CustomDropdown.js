import { useState, useEffect, useRef } from 'react';

export default function CustomDropdown({ value, onChange, options, placeholder = 'Выберите...' }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const selected = options.find(o => o.value === value);

  useEffect(() => {
    const fn = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  return (
    <div className="cdd" ref={ref}>
      <button type="button" className={`cdd-btn${open ? ' open' : ''}`} onClick={() => setOpen(!open)}>
        <span>{selected ? selected.label : placeholder}</span>
        <svg className="cdd-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M6 9l6 6 6-6" /></svg>
      </button>
      {open && (
        <div className="cdd-list">
          {options.map(o => (
            <div key={o.value} className={`cdd-opt${o.value === value ? ' sel' : ''}`}
              onClick={() => { onChange(o.value); setOpen(false); }}>
              <span className="cdd-dot" />
              {o.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
