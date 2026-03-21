// pages/news/[slug].js — Страница отдельной новости
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../components/Layout';
import RichText from '../../components/RichText';
import { Reveal } from '../../components/SectionHeader';
import { sanityClient, urlFor } from '../../lib/sanity';
import { getSiteSettings } from '../../lib/api';

// Запрос одной новости по slug
const newsQuery = `
  *[_type == "news" && slug.current == $slug][0] {
    _id,
    title,
    date,
    category,
    "categoryLabel": select(
      category == "church" => "Церковь",
      category == "tapan" => "Тапан"
    ),
    image,
    body
  }
`;

// Все slug-и для предварительной генерации страниц
const allSlugsQuery = `*[_type == "news" && defined(slug.current)].slug.current`;

function getImg(image, w, h) {
  if (!image) return null;
  if (typeof image === 'string') return image;
  try { return urlFor(image).width(w).height(h).url(); } catch { return null; }
}

export default function NewsPage({ news, settings }) {
  const router = useRouter();

  // Пока страница генерируется (fallback)
  if (router.isFallback) {
    return (
      <Layout settings={settings}>
        <div className="ph ph-ab">
          <div className="ph-c"><h1>Загрузка...</h1></div>
        </div>
      </Layout>
    );
  }

  // Новость не найдена
  if (!news) {
    return (
      <Layout settings={settings}>
        <div className="ph ph-ab">
          <div className="ph-c">
            <h1>Новость не найдена</h1>
            <p style={{ marginTop: 16 }}>
              <Link href="/" style={{ color: 'var(--gold-light)', textDecoration: 'underline' }}>
                Вернуться на главную
              </Link>
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  const heroImg = getImg(news.image, 1400, 600);

  return (
    <Layout settings={settings}>
      {/* Баннер с фото */}
      {heroImg ? (
        <div style={{
          position: 'relative', height: 400, marginTop: 0, overflow: 'hidden',
          background: 'var(--brown)',
        }}>
          <img src={heroImg} alt={news.title} style={{
            width: '100%', height: '100%', objectFit: 'cover',
            filter: 'brightness(0.45) saturate(0.7)',
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(61,43,34,0.1) 0%, rgba(61,43,34,0.7) 100%)',
            display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
            padding: '60px 24px',
          }}>
            <div style={{ textAlign: 'center', maxWidth: 700 }}>
              <div style={{
                fontSize: 11, letterSpacing: 3, textTransform: 'uppercase',
                color: 'var(--gold-light)', marginBottom: 12,
              }}>
                {news.categoryLabel} · {news.date}
              </div>
              <h1 style={{
                fontFamily: 'var(--font-d)', fontSize: 40, fontWeight: 300,
                color: 'var(--white)', lineHeight: 1.2,
              }}>
                {news.title}
              </h1>
            </div>
          </div>
        </div>
      ) : (
        <div className="ph ph-ab">
          <div className="ph-c">
            <div style={{
              fontSize: 11, letterSpacing: 3, textTransform: 'uppercase',
              color: 'var(--gold-light)', marginBottom: 12,
            }}>
              {news.categoryLabel} · {news.date}
            </div>
            <h1>{news.title}</h1>
          </div>
        </div>
      )}

      {/* Тело новости */}
      <div className="sec" style={{ maxWidth: 800 }}>
        <Reveal>
          <div className="at">
            {news.body ? (
              <RichText value={news.body} />
            ) : (
              <p style={{ color: 'var(--text-light)', fontStyle: 'italic' }}>
                Полный текст новости пока не добавлен.
              </p>
            )}
          </div>
        </Reveal>

        {/* Кнопка назад */}
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <Link href={news.category === 'tapan' ? '/tapan' : '/'}
            style={{
              fontFamily: 'var(--font-d)', fontSize: 15, fontWeight: 500,
              letterSpacing: 1, textTransform: 'uppercase',
              color: 'var(--brown-light)', textDecoration: 'none',
              padding: '10px 24px', border: '1px solid var(--beige)',
              borderRadius: 8, display: 'inline-block',
              transition: 'var(--tr)',
            }}>
            ← Назад к новостям
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const slugs = await sanityClient.fetch(allSlugsQuery);
  return {
    paths: (slugs || []).map((slug) => ({ params: { slug } })),
    fallback: true, // новые новости генерируются при первом запросе
  };
}

export async function getStaticProps({ params }) {
  const [news, settings] = await Promise.all([
    sanityClient.fetch(newsQuery, { slug: params.slug }),
    getSiteSettings(),
  ]);

  if (!news) {
    return { notFound: true };
  }

  return {
    props: { news, settings },
    revalidate: 60,
  };
}
