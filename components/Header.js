import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Icons from './Icons';

export default function Header() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = router.pathname === '/';

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    fn();
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const links = [
    { href: '/', label: 'Главная' },
    { href: '/about', label: 'О нас' },
    { href: '/tapan', label: 'Тапан' },
  ];

  const cls = isHome && !scrolled ? 'hd hd-t' : 'hd hd-bg';

  return (
    <>
      <header className={cls}>
        <div className="hd-in">
          <Link href="/" className="logo">
            <div className="logo-ic">{Icons.cross(20)}</div>
            <div className="logo-tx">
              <span className="logo-t1">Св. Саркис</span>
              <span className="logo-t2">Армянская Церковь · Воронеж</span>
            </div>
          </Link>
          <nav className="nav">
            {links.map(l => (
              <Link key={l.href} href={l.href} className={`nl${router.pathname === l.href ? ' a' : ''}`}>
                {l.label}
              </Link>
            ))}
          </nav>
          <button className="mbtn" onClick={() => setMenuOpen(true)}>{Icons.menu()}</button>
        </div>
      </header>
      <div className={`mm${menuOpen ? ' open' : ''}`}>
        <button className="cb" onClick={() => setMenuOpen(false)}>{Icons.close()}</button>
        {links.map(l => (
          <Link key={l.href} href={l.href} className={`nl${router.pathname === l.href ? ' a' : ''}`}
            onClick={() => setMenuOpen(false)}>
            {l.label}
          </Link>
        ))}
      </div>
    </>
  );
}
