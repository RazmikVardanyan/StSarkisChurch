// ============================================================
//  pages/api/submit.js (обновлённый — Этап 5)
// ============================================================
//
//  Два режима отправки заявок:
//
//  РЕЖИМ 1 — Напрямую в Telegram (простой)
//    Используется если задан TG_CHAT_ID
//    Отправляет в один чат (группу)
//
//  РЕЖИМ 2 — Через бот-сервер (для нескольких админов)
//    Используется если задан BOT_NOTIFY_URL
//    Отправляет на HTTP-сервер бота, который рассылает всем админам
//
//  Переменные окружения:
//    TG_BOT_TOKEN     — токен бота
//    TG_CHAT_ID       — ID чата (режим 1)
//    BOT_NOTIFY_URL   — URL бота, напр. http://localhost:3001/notify (режим 2)
//
// ============================================================

const rateLimit = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_REQUESTS = 3;

function checkRateLimit(ip) {
  const now = Date.now();
  const record = rateLimit.get(ip);
  if (!record) { rateLimit.set(ip, { count: 1, start: now }); return true; }
  if (now - record.start > RATE_LIMIT_WINDOW) { rateLimit.set(ip, { count: 1, start: now }); return true; }
  if (record.count >= MAX_REQUESTS) return false;
  record.count++;
  return true;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Метод не поддерживается' });
  }

  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  if (!checkRateLimit(ip)) {
    return res.status(429).json({ error: 'Слишком много запросов. Подождите минуту.' });
  }

  const { name, surname, phone, telegram, age, contact, comment, honey } = req.body;

  if (honey) {
    return res.status(200).json({ success: true });
  }

  if (!name || !surname || !phone) {
    return res.status(400).json({ error: 'Заполните обязательные поля' });
  }

  // ─── Формируем сообщение ───
  const contactLabels = { telegram: 'Telegram', phone: 'Телефон', whatsapp: 'WhatsApp' };

  const message = [
    '🚢 *Новая заявка в «Тапан»*',
    '',
    `👤 *Имя:* ${name} ${surname}`,
    `📞 *Телефон:* ${phone}`,
    telegram ? `💬 *Telegram:* ${telegram}` : '',
    age ? `🎂 *Возраст:* ${age}` : '',
    `📱 *Связь:* ${contactLabels[contact] || contact}`,
    comment ? `\n💬 *Комментарий:*\n${comment}` : '',
    '',
    `📅 ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}`,
  ].filter(Boolean).join('\n');

  // ─── РЕЖИМ 2: Через бот-сервер (несколько админов) ───
  const BOT_NOTIFY_URL = process.env.BOT_NOTIFY_URL;

  if (BOT_NOTIFY_URL) {
    try {
      const botResponse = await fetch(BOT_NOTIFY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, surname, phone, telegram, age, contact, comment }),
      });
      const botData = await botResponse.json();

      if (botData.success) {
        return res.status(200).json({ success: true });
      }
      // Если бот недоступен — пробуем режим 1
      console.warn('Бот-сервер вернул ошибку, пробуем прямую отправку');
    } catch (err) {
      console.warn('Бот-сервер недоступен, пробуем прямую отправку:', err.message);
    }
  }

  // ─── РЕЖИМ 1: Напрямую в Telegram (один чат) ───
  const TG_BOT_TOKEN = process.env.TG_BOT_TOKEN;
  const TG_CHAT_ID = process.env.TG_CHAT_ID;

  if (!TG_BOT_TOKEN || !TG_CHAT_ID) {
    console.error('Ни BOT_NOTIFY_URL, ни TG_BOT_TOKEN+TG_CHAT_ID не заданы');
    return res.status(500).json({ error: 'Ошибка конфигурации сервера' });
  }

  try {
    const tgResponse = await fetch(
      `https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TG_CHAT_ID,
          text: message,
          parse_mode: 'Markdown',
        }),
      }
    );

    const tgData = await tgResponse.json();

    if (!tgData.ok) {
      console.error('Ошибка Telegram API:', tgData);
      return res.status(500).json({ error: 'Не удалось отправить' });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Ошибка отправки:', error);
    return res.status(500).json({ error: 'Ошибка сервера' });
  }
}
