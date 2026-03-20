// lib/queries.js
// Все запросы к Sanity CMS (язык GROQ)
// GROQ — это язык запросов Sanity, похожий на SQL, но проще.

// ─── ГЛАВНАЯ СТРАНИЦА ──────────────────────

// Активные слайды, отсортированные по порядку
export const slidesQuery = `
  *[_type == "slide" && isActive == true] | order(order asc) {
    _id,
    title,
    subtitle,
    date,
    description,
    image
  }
`;

// Последние 8 новостей (для главной)
export const latestNewsQuery = `
  *[_type == "news"] | order(date desc) [0...8] {
    _id,
    title,
    slug,
    date,
    category,
    "categoryLabel": select(
      category == "church" => "Церковь",
      category == "tapan" => "Тапан"
    ),
    excerpt,
    image
  }
`;

// Расписание богослужений
export const scheduleQuery = `
  *[_type == "schedule"] | order(order asc) {
    _id,
    day,
    time,
    service,
    type
  }
`;

// ─── СТРАНИЦА «О НАС» ─────────────────────

// Настоятель
export const pastorQuery = `
  *[_type == "person" && category == "pastor"][0] {
    _id,
    name,
    role,
    photo,
    bio
  }
`;

// Текст страницы «О нас»
export const aboutPageQuery = `
  *[_type == "pageContent" && pageId == "about"][0] {
    title,
    body
  }
`;

// Настройки сайта (контакты и т.д.)
export const siteSettingsQuery = `
  *[_type == "siteSettings"][0] {
    churchName,
    churchNameArm,
    subtitle,
    phone,
    email,
    address,
    telegram,
    telegramChannel,
    workHoursWeekday,
    workHoursWeekend,
    mapEmbedUrl
  }
`;

// ─── СТРАНИЦА «ТАПАН» ─────────────────────

// Председатель «Тапан»
export const tapanChairQuery = `
  *[_type == "person" && category == "tapan_chair"][0] {
    _id,
    name,
    role,
    photo,
    bio
  }
`;

// Совет «Тапан»
export const tapanCouncilQuery = `
  *[_type == "person" && category == "tapan_council"] | order(order asc) {
    _id,
    name,
    role,
    photo
  }
`;

// Текст страницы «Тапан»
export const tapanPageQuery = `
  *[_type == "pageContent" && pageId == "tapan"][0] {
    title,
    body
  }
`;

// Новости «Тапан»
export const tapanNewsQuery = `
  *[_type == "news" && category == "tapan"] | order(date desc) [0...6] {
    _id,
    title,
    slug,
    date,
    category,
    "categoryLabel": "Тапан",
    excerpt,
    image
  }
`;

// Галерея «Тапан»
export const tapanGalleryQuery = `
  *[_type == "galleryItem" && category == "tapan"] | order(order asc) {
    _id,
    image,
    alt
  }
`;
