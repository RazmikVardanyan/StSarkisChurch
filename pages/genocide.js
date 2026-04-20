// pages/genocide.js — Страница памяти Геноцида армян
import Layout from '../components/Layout';
import RichText from '../components/RichText';
import { Reveal } from '../components/SectionHeader';
import { getGenocidePageData } from '../lib/api';
import { urlFor } from '../lib/sanity';

function resolveImage(item, w, h) {
  if (item.imageUrl) return item.imageUrl;
  const raw = item.image || item;
  if (typeof raw === 'string') return raw;
  if (raw?.asset) { try { return urlFor(raw).width(w).height(h).url(); } catch {} }
  return '/placeholder.jpg';
}

export default function GenocidePage({ pageContent, gallery, settings }) {
  return (
    <Layout settings={settings}>
      {/* Тёмный торжественный баннер */}
      <div style={{
        marginTop: 0, minHeight: 380, display: 'flex', alignItems: 'center',
        justifyContent: 'center', textAlign: 'center', padding: '60px 24px',
        background: 'linear-gradient(180deg, #1a1210 0%, #2d1f1a 50%, #3d2b22 100%)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.06,
          background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 5v50M5 30h50\' stroke=\'white\' stroke-width=\'0.5\' fill=\'none\'/%3E%3C/svg%3E")',
        }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 700 }}>
          {/* Свеча памяти */}
          <div style={{ fontSize: 48, marginBottom: 20, opacity: 0.8 }}>🕯️</div>
          <h1 style={{
            fontFamily: 'var(--font-d)', fontSize: 52, fontWeight: 300,
            color: '#F5F0EB', lineHeight: 1.15, marginBottom: 16,
            letterSpacing: 1,
          }}>
            Геноцид армян
          </h1>
          <div style={{
            width: 60, height: 1, background: 'var(--gold)',
            margin: '0 auto 20px', opacity: 0.5,
          }} />
          <p style={{
            fontFamily: 'var(--font-d)', fontSize: 22, fontWeight: 300,
            color: 'var(--rose-light)', lineHeight: 1.5, fontStyle: 'italic',
          }}>
            111 лет со дня трагедии армянского народа
          </p>
          <p style={{
            fontSize: 14, color: 'var(--gold-light)', marginTop: 16,
            letterSpacing: 2, textTransform: 'uppercase', opacity: 0.7,
          }}>
            24 апреля 1915
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '64px 28px 80px' }}>
        {/* Вступительный текст из CMS (если есть) */}
        {pageContent && pageContent.body && (
          <Reveal>
            <div className="at" style={{ marginBottom: 56 }}>
              {pageContent.title && <h3>{pageContent.title}</h3>}
              <RichText value={pageContent.body} />
            </div>
          </Reveal>
        )}

        {/* Фотографии с описаниями — одностраничник */}
        {gallery && gallery.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>
            {gallery.map((item, i) => (
              <Reveal key={item._id || i} delay={0.1}>
                <article style={{
                  background: 'var(--white)', borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden', boxShadow: 'var(--shadow-sm)',
                }}>
                  {/* Фотография */}
                  <div style={{ position: 'relative', overflow: 'hidden' }}>
                    <img
                      src={resolveImage(item, 900, 600)}
                      alt={item.alt || ''}
                      style={{
                        width: '100%', maxHeight: 500, objectFit: 'cover',
                        display: 'block', filter: 'saturate(0.85)',
                      }}
                    />
                    {/* Порядковый номер */}
                    <div style={{
                      position: 'absolute', top: 16, left: 16,
                      width: 36, height: 36, borderRadius: '50%',
                      background: 'rgba(0,0,0,0.5)', color: 'var(--cream)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 14, fontWeight: 500,
                      fontFamily: 'var(--font-d)',
                    }}>
                      {i + 1}
                    </div>
                  </div>

                  {/* Текст */}
                  <div style={{ padding: '28px 36px 32px' }}>
                    {item.alt && (
                      <h3 style={{
                        fontFamily: 'var(--font-d)', fontSize: 22,
                        fontWeight: 500, color: 'var(--brown)',
                        marginBottom: 12, lineHeight: 1.3,
                      }}>
                        {item.alt}
                      </h3>
                    )}
                    {item.description && (
                      <p style={{
                        fontSize: 15, color: 'var(--text-light)',
                        lineHeight: 1.8, whiteSpace: 'pre-wrap',
                      }}>
                        {item.description}
                      </p>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}

        {/* Если фотографий нет */}
        {(!gallery || gallery.length === 0) && !pageContent && (
          <Reveal>
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-light)' }}>
              <p style={{ fontSize: 16 }}>Материалы будут добавлены в ближайшее время.</p>
            </div>
          </Reveal>
        )}

        {/* Нижняя памятная надпись */}
        <Reveal delay={0.2}>
          <div style={{
            textAlign: 'center', marginTop: 72, paddingTop: 40,
            borderTop: '1px solid var(--beige)',
          }}>
            <div style={{ fontSize: 32, marginBottom: 12, opacity: 0.6 }}>✝</div>
            <p style={{
              fontFamily: 'var(--font-d)', fontSize: 18,
              color: 'var(--brown-light)', fontStyle: 'italic',
              lineHeight: 1.6, maxWidth: 500, margin: '0 auto',
            }}>
              Помним. Скорбим. Требуем признания.
            </p>
            <p style={{
              fontFamily: 'var(--font-d)', fontSize: 16,
              color: 'var(--text-light)', marginTop: 8,
            }}>
              Անմոռdelays · Незабвенно
            </p>
          </div>
        </Reveal>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const data = await getGenocidePageData();
  return { props: data, revalidate: 60 };
}
