// lib/api.js
// Функции для получения данных из Sanity
// Используются в getStaticProps / getServerSideProps страниц Next.js

import { sanityClient, urlFor } from './sanity';
import * as queries from './queries';

// ─── ОБЩИЕ ДАННЫЕ (для всех страниц) ──────

export async function getSiteSettings() {
  const data = await sanityClient.fetch(queries.siteSettingsQuery);
  return data || {};
}

// ─── ГЛАВНАЯ СТРАНИЦА ──────────────────────

export async function getHomePageData() {
  const [slides, news, schedule, settings] = await Promise.all([
    sanityClient.fetch(queries.slidesQuery),
    sanityClient.fetch(queries.latestNewsQuery),
    sanityClient.fetch(queries.scheduleQuery),
    getSiteSettings(),
  ]);

  return { slides, news, schedule, settings };
}

// ─── СТРАНИЦА «О НАС» ─────────────────────

export async function getAboutPageData() {
  const [pastor, pageContent, settings] = await Promise.all([
    sanityClient.fetch(queries.pastorQuery),
    sanityClient.fetch(queries.aboutPageQuery),
    getSiteSettings(),
  ]);

  return { pastor, pageContent, settings };
}

// ─── СТРАНИЦА «ТАПАН» ─────────────────────

export async function getTapanPageData() {
  const [chair, council, pageContent, news, gallery, settings] = await Promise.all([
    sanityClient.fetch(queries.tapanChairQuery),
    sanityClient.fetch(queries.tapanCouncilQuery),
    sanityClient.fetch(queries.tapanPageQuery),
    sanityClient.fetch(queries.tapanNewsQuery),
    sanityClient.fetch(queries.tapanGalleryQuery),
    getSiteSettings(),
  ]);

  return { chair, council, pageContent, news, gallery, settings };
}

// ─── ПОМОЩНИК: URL КАРТИНКИ ────────────────
// Используйте в компонентах так:
//   <img src={getImageUrl(item.image, 600, 400)} />

export function getImageUrl(image, width, height) {
  if (!image) return '/placeholder.jpg';
  let builder = urlFor(image);
  if (width) builder = builder.width(width);
  if (height) builder = builder.height(height);
  return builder.url();
}
