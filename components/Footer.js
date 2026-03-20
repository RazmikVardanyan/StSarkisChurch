import Link from 'next/link';
import Icons from './Icons';
import { ArmenianOrnament } from './SectionHeader';

export default function Footer({ settings = {} }) {
  const name = settings.churchName || 'Церковь Святого Саркиса';
  return (
    <footer className="ft">
      <div className="ft-in">
        <div className="ft-br">
          <h3>{name}</h3>
          <p>Армянская Апостольская Церковь в Воронеже. Приход основан для духовного окормления армянской общины города и всех, кто стремится познать христианские ценности.</p>
          <div style={{ marginTop: 16 }}><ArmenianOrnament light /></div>
        </div>
        <div className="ft-c">
          <h4>Навигация</h4>
          <Link href="/" className="fl">Главная</Link>
          <Link href="/about" className="fl">О нас</Link>
          <Link href="/tapan" className="fl">Тапан</Link>
        </div>
        <div className="ft-c">
          <h4>Контакты</h4>
          <span className="fl">{settings.phone || '+7 (473) 123-45-67'}</span>
          <span className="fl">{settings.email || 'st.sarkis.vrn@gmail.com'}</span>
          <span className="fl">{settings.address || 'г. Воронеж, ул. Примерная, 1'}</span>
        </div>
      </div>
      <div className="ft-bt">
        <span>© {new Date().getFullYear()} {name} · Воронеж</span>
        <div className="ft-so">
          <a href={settings.telegramChannel || '#'} target="_blank" rel="noopener noreferrer" aria-label="Telegram">{Icons.telegram()}</a>
        </div>
      </div>
    </footer>
  );
}
