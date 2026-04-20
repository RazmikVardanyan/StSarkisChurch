// lib/queries.js — все GROQ-запросы к Sanity CMS

// ─── ГЛАВНАЯ СТРАНИЦА ──────────────────────

export const slidesQuery = `
  *[_type == "slide" && isActive == true] | order(order asc) {
    _id, title, subtitle, date, description,
    image, "imageUrl": image.asset->url
  }
`;

export const latestNewsQuery = `
  *[_type == "news"] | order(date desc) [0...8] {
    _id, title, slug, date, category,
    "categoryLabel": select(category == "church" => "Церковь", category == "tapan" => "Тапан"),
    excerpt, image, "imageUrl": image.asset->url
  }
`;

export const scheduleQuery = `
  *[_type == "schedule"] | order(order asc) {
    _id, day, time, service, type
  }
`;

// ─── СТРАНИЦА «О НАС» ─────────────────────

export const pastorQuery = `
  *[_type == "person" && category == "pastor"][0] {
    _id, name, role, photo, "imageUrl": photo.asset->url, bio
  }
`;

export const aboutPageQuery = `
  *[_type == "pageContent" && pageId == "about"][0] {
    title, body
  }
`;

export const siteSettingsQuery = `
  *[_type == "siteSettings"][0] {
    churchName, churchNameArm, subtitle,
    phone, email, address, telegram, telegramChannel,
    workHoursWeekday, workHoursWeekend, mapEmbedUrl
  }
`;

// Галерея церкви (для страницы «О нас»)
export const churchGalleryQuery = `
  *[_type == "galleryItem" && category == "church"] | order(order asc) {
    _id, image, "imageUrl": image.asset->url, alt
  }
`;

// ─── СТРАНИЦА «ТАПАН» ─────────────────────

export const tapanChairQuery = `
  *[_type == "person" && category == "tapan_chair"][0] {
    _id, name, role, photo, "imageUrl": photo.asset->url, bio
  }
`;

export const tapanCouncilQuery = `
  *[_type == "person" && category == "tapan_council"] | order(order asc) {
    _id, name, role, photo, "imageUrl": photo.asset->url
  }
`;

export const tapanPageQuery = `
  *[_type == "pageContent" && pageId == "tapan"][0] {
    title, body
  }
`;

export const tapanNewsQuery = `
  *[_type == "news" && category == "tapan"] | order(date desc) [0...6] {
    _id, title, slug, date, category,
    "categoryLabel": "Тапан",
    excerpt, image, "imageUrl": image.asset->url
  }
`;

// Галерея «Тапан»
export const tapanGalleryQuery = `
  *[_type == "galleryItem" && category == "tapan"] | order(order asc) {
    _id, image, "imageUrl": image.asset->url, alt
  }
`;

// ─── СТРАНИЦА «ГЕНОЦИД» ───────────────────

// Фотографии из категории "genocide"
export const genocideGalleryQuery = `
  *[_type == "galleryItem" && category == "genocide"] | order(order asc) {
    _id, image, "imageUrl": image.asset->url, alt, description
  }
`;

// Текст страницы «Геноцид»
export const genocidePageQuery = `
  *[_type == "pageContent" && pageId == "genocide"][0] {
    title, body
  }
`;
