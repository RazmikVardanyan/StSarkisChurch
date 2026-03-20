import { useState } from 'react';
import { Reveal } from './SectionHeader';
import CustomDropdown from './CustomDropdown';
import Icons from './Icons';

export default function ApplicationForm() {
  const initial = { name: '', surname: '', phone: '', telegram: '', age: '', contact: 'telegram', comment: '', honey: '' };
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState('');
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    if (form.honey) return;
    if (!form.name.trim() || !form.surname.trim() || !form.phone.trim()) {
      setErrorMsg('Пожалуйста, заполните обязательные поля');
      setStatus('error');
      return;
    }
    setStatus('sending');
    setErrorMsg('');
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus('sent');
      } else if (res.status === 429) {
        setErrorMsg('Слишком много запросов. Подождите минуту.');
        setStatus('error');
      } else {
        setErrorMsg(data.error || 'Произошла ошибка. Попробуйте позже.');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Ошибка сети. Проверьте подключение к интернету.');
      setStatus('error');
    }
  };

  if (status === 'sent') return (
    <div className="fs">
      <div className="fsuc">
        <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
        <h3>Заявка отправлена!</h3>
        <p>Мы свяжемся с вами в ближайшее время через Telegram.</p>
        <button className="fbtn" style={{ marginTop: 24 }} onClick={() => { setStatus('idle'); setForm(initial); }}>
          Отправить ещё
        </button>
      </div>
    </div>
  );

  return (
    <Reveal>
      <div className="fs">
        <form onSubmit={submit}>
          <div className="fg">
            <div className="fgr">
              <label className="flb">Имя *</label>
              <input className="fin" required value={form.name} onChange={e => set('name', e.target.value)} placeholder="Ваше имя" />
            </div>
            <div className="fgr">
              <label className="flb">Фамилия *</label>
              <input className="fin" required value={form.surname} onChange={e => set('surname', e.target.value)} placeholder="Ваша фамилия" />
            </div>
            <div className="fgr">
              <label className="flb">Телефон *</label>
              <input className="fin" type="tel" required value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+7 (___) ___-__-__" />
            </div>
            <div className="fgr">
              <label className="flb">Telegram</label>
              <input className="fin" value={form.telegram} onChange={e => set('telegram', e.target.value)} placeholder="@username" />
            </div>
            <div className="fgr">
              <label className="flb">Возраст</label>
              <input className="fin fin-age" type="text" inputMode="numeric" pattern="[0-9]*" value={form.age}
                onChange={e => { const v = e.target.value.replace(/\D/g, ''); if (v === '' || /^\d{1,2}$/.test(v)) set('age', v); }}
                placeholder="Ваш возраст" />
            </div>
            <div className="fgr">
              <label className="flb">Предпочтительный способ связи</label>
              <CustomDropdown value={form.contact} onChange={v => set('contact', v)} options={[
                { value: 'telegram', label: 'Telegram' },
                { value: 'phone', label: 'Телефон' },
                { value: 'whatsapp', label: 'WhatsApp' },
              ]} />
            </div>
            <div className="fgr full">
              <label className="flb">Комментарий</label>
              <textarea className="fta" value={form.comment} onChange={e => set('comment', e.target.value)}
                placeholder="Расскажите немного о себе, ваших интересах или задайте вопрос..." />
            </div>
            <input className="honey" tabIndex={-1} autoComplete="off" value={form.honey} onChange={e => set('honey', e.target.value)} />
          </div>
          {status === 'error' && <div className="form-error">{errorMsg}</div>}
          <button className="fbtn" type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Отправляем...' : <>{Icons.send()} Отправить заявку</>}
          </button>
        </form>
      </div>
    </Reveal>
  );
}
