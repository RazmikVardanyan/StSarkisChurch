// lib/mockData.js
// Заглушки для разработки без CMS.
// При подключении Sanity замените на fetch из lib/api.js

export const SITE_SETTINGS = {
  churchName: "Церковь Святого Саркиса",
  subtitle: "Армянская Апостольская Церковь · Воронеж",
  phone: "+7 (473) 123-45-67",
  email: "st.sarkis.vrn@gmail.com",
  address: "г. Воронеж, ул. Примерная, 1",
  telegram: "@stsarkis_vrn",
  telegramChannel: "https://t.me/stsarkis_vrn",
  workHoursWeekday: "Пн–Пт: 09:00 – 18:00",
  workHoursWeekend: "Сб–Вс: 08:00 – 15:00",
  mapEmbedUrl: "",
};

export const SLIDES = [
  { _id: "slide-1", title: "Светлый праздник Пасхи", subtitle: "Сурб Затик", date: "20 апреля 2025", image: "https://images.unsplash.com/photo-1555992457-b8a7d482e07e?w=1400&h=700&fit=crop", description: "Приглашаем всех на праздничное богослужение в храме Святого Саркиса" },
  { _id: "slide-2", title: "День Святого Саркиса", subtitle: "Սուрб Саркис", date: "8 февраля 2025", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1400&h=700&fit=crop", description: "Покровитель молодёжи и влюблённых" },
  { _id: "slide-3", title: "Мастер-класс по рисованию", subtitle: "Организация «Тапан»", date: "31 января 2025", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1400&h=700&fit=crop", description: "Ко дню св. Саркиса покровителя влюблённых" },
];

export const NEWS = [
  { _id: "news-1", title: "Экскурсия в рамках форума", date: "8 февраля 2025", category: "church", categoryLabel: "Церковь", excerpt: "«День святого Саркиса: покровитель молодежи» — экскурсия по храму для участников молодёжного форума.", image: "https://images.unsplash.com/photo-1555992457-b8a7d482e07e?w=600&h=400&fit=crop" },
  { _id: "news-2", title: "Символы Христианства", date: "5 февраля 2025", category: "tapan", categoryLabel: "Тапан", excerpt: "Крест — главный символ христианства, несущий в себе величайшую трансформацию в истории.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop" },
  { _id: "news-3", title: "Рождественское богослужение", date: "6 января 2025", category: "church", categoryLabel: "Церковь", excerpt: "Праздничная Божественная Литургия в честь Рождества и Крещения Господня.", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=400&fit=crop" },
  { _id: "news-4", title: "Благотворительный вечер", date: "20 декабря 2024", category: "tapan", categoryLabel: "Тапан", excerpt: "Молодёжная организация «Тапан» провела благотворительный вечер для нуждающихся семей.", image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=600&h=400&fit=crop" },
];

export const SCHEDULE = [
  { day: "Воскресенье", time: "10:00", service: "Божественная Литургия (Сурб Патараг)", type: "main" },
  { day: "Воскресенье", time: "12:00", service: "Крещение (по записи)", type: "sacrament" },
  { day: "Суббота", time: "11:00", service: "Панихида (Хогехосурб)", type: "regular" },
  { day: "Ежедневно", time: "09:00", service: "Утренняя молитва", type: "regular" },
  { day: "Ежедневно", time: "18:00", service: "Вечерняя молитва", type: "regular" },
  { day: "По записи", time: "—", service: "Венчание, Крещение, Отпевание", type: "sacrament" },
];

export const PASTOR = {
  name: "Тер Ованнес Арутюнян", role: "Настоятель храма Св. Саркиса",
  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=520&fit=crop&crop=face",
  bio: "Духовный пастырь воронежской армянской общины. Рукоположен в священники Армянской Апостольской Церкви. Ведёт активную пастырскую деятельность, проводит богослужения, духовные беседы и катехизацию."
};

export const TAPAN_CHAIR = {
  name: "Арам Петросян", role: "Председатель «Тапан»",
  image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=520&fit=crop&crop=face",
  bio: "Координирует работу организации, организует мероприятия и представляет «Тапан» на городских и региональных форумах."
};

export const COUNCIL = [
  { name: "Анна Саркисян", role: "Заместитель председателя", image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face" },
  { name: "Давид Арутюнян", role: "Секретарь", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face" },
  { name: "Мариам Геворгян", role: "Ответственная за мероприятия", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face" },
  { name: "Артём Карапетян", role: "Ответственный за медиа", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face" },
];

export const GALLERY = [
  { _id: "g1", src: "https://images.unsplash.com/photo-1555992457-b8a7d482e07e?w=600&h=600&fit=crop", alt: "Храм Св. Саркиса" },
  { _id: "g2", src: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=600&fit=crop", alt: "Мастер-класс" },
  { _id: "g3", src: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=600&h=600&fit=crop", alt: "Мероприятие" },
  { _id: "g4", src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop", alt: "Богослужение" },
  { _id: "g5", src: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=600&h=600&fit=crop", alt: "Община" },
  { _id: "g6", src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=600&fit=crop", alt: "Праздник" },
];
