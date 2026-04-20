// components/ContactsBlock.js — литургия в 11:00
import { Reveal } from './SectionHeader';
import Icons from './Icons';

export default function ContactsBlock({ settings = {} }) {
  return (
    <>
      <Reveal>
        <div className="cg">
          <div className="cb">
            <h4>Адрес и связь</h4>
            <div className="ci">{Icons.pin()} {settings.address || 'г. Воронеж, ул. Примерная, 1'}</div>
            <div className="ci">{Icons.phone()} {settings.phone || '+7 (473) 123-45-67'}</div>
            <div className="ci">{Icons.mail()} {settings.email || 'st.sarkis.vrn@gmail.com'}</div>
            <div className="ci">{Icons.telegram()} {settings.telegram || '@stsarkis_vrn'}</div>
          </div>
          <div className="cb">
            <h4>Часы работы</h4>
            <div className="ci">{Icons.clock()} {settings.workHoursWeekday || 'Пн–Пт: 09:00 – 18:00'}</div>
            <div className="ci">{Icons.clock()} {settings.workHoursWeekend || 'Сб–Вс: 08:00 – 15:00'}</div>
            <div className="ci">{Icons.church()} Литургия: Вс в 11:00</div>
            <div className="ci" style={{ marginTop: 8, color: 'var(--text-light)', fontSize: 13 }}>
              Запись на таинства по телефону
            </div>
          </div>
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="map">
          {settings.mapEmbedUrl ? (
            <iframe src={settings.mapEmbedUrl} width="100%" height="100%" style={{ border: 0, borderRadius: 'var(--radius-lg)' }} allowFullScreen loading="lazy" />
          ) : (
            <div className="map-inner">
              {Icons.pin(32)}
              <div style={{ marginTop: 8 }}>Яндекс.Карты / Google Maps</div>
              <div style={{ fontSize: 12, marginTop: 4, opacity: 0.7 }}>Карта будет подключена при развёртывании</div>
            </div>
          )}
        </div>
      </Reveal>
    </>
  );
}
