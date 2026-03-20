// lib/sanity.js
// Подключение к Sanity CMS из Next.js

import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Клиент Sanity — читает данные из CMS
export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // из .env.local
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true, // true = быстрее, но данные обновляются с задержкой ~60 сек
});

// Помощник для получения URL картинок из Sanity
const builder = imageUrlBuilder(sanityClient);

export function urlFor(source) {
  return builder.image(source);
}
