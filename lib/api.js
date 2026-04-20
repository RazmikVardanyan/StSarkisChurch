// lib/api.js — функции получения данных из Sanity
import { sanityClient, urlFor } from './sanity';
import * as queries from './queries';

export async function getSiteSettings() {
  const data = await sanityClient.fetch(queries.siteSettingsQuery);
  return data || {};
}

export async function getHomePageData() {
  const [slides, news, schedule, settings] = await Promise.all([
    sanityClient.fetch(queries.slidesQuery),
    sanityClient.fetch(queries.latestNewsQuery),
    sanityClient.fetch(queries.scheduleQuery),
    getSiteSettings(),
  ]);
  return { slides: slides || [], news: news || [], schedule: schedule || [], settings };
}

export async function getAboutPageData() {
  const [pastor, pageContent, gallery, settings] = await Promise.all([
    sanityClient.fetch(queries.pastorQuery),
    sanityClient.fetch(queries.aboutPageQuery),
    sanityClient.fetch(queries.churchGalleryQuery),
    getSiteSettings(),
  ]);
  return { pastor, pageContent, gallery: gallery || [], settings };
}

export async function getTapanPageData() {
  const [chair, council, pageContent, news, gallery, settings] = await Promise.all([
    sanityClient.fetch(queries.tapanChairQuery),
    sanityClient.fetch(queries.tapanCouncilQuery),
    sanityClient.fetch(queries.tapanPageQuery),
    sanityClient.fetch(queries.tapanNewsQuery),
    sanityClient.fetch(queries.tapanGalleryQuery),
    getSiteSettings(),
  ]);
  return { chair, council, pageContent, news: news || [], gallery: gallery || [], settings };
}

export async function getGenocidePageData() {
  const [pageContent, gallery, settings] = await Promise.all([
    sanityClient.fetch(queries.genocidePageQuery),
    sanityClient.fetch(queries.genocideGalleryQuery),
    getSiteSettings(),
  ]);
  return { pageContent, gallery: gallery || [], settings };
}

export function getImageUrl(image, width, height) {
  if (!image) return '/placeholder.jpg';
  try {
    let b = urlFor(image);
    if (width) b = b.width(width);
    if (height) b = b.height(height);
    return b.url();
  } catch {
    return '/placeholder.jpg';
  }
}
