// components/RichText.js
// Компонент для отображения форматированного текста из Sanity
//
// Sanity хранит текст в формате "Portable Text" — это массив блоков.
// Этот компонент превращает их в обычный HTML.
//
// Установите: npm install @portabletext/react

import { PortableText } from '@portabletext/react';
import { urlFor } from '../lib/sanity';

// Настройка отображения разных элементов текста
const components = {
  types: {
    image: ({ value }) => (
      <figure style={{ margin: '24px 0' }}>
        <img
          src={urlFor(value).width(800).url()}
          alt={value.caption || ''}
          style={{
            width: '100%',
            borderRadius: '12px',
            objectFit: 'cover',
          }}
        />
        {value.caption && (
          <figcaption style={{
            textAlign: 'center',
            fontSize: '13px',
            color: '#7A6B62',
            marginTop: '8px',
          }}>
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value.href}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: '#5C3A2E', textDecoration: 'underline' }}
      >
        {children}
      </a>
    ),
  },
};

export default function RichText({ value }) {
  if (!value) return null;
  return <PortableText value={value} components={components} />;
}
