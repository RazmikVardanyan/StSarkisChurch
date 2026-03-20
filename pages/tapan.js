// pages/tapan.js — Тапан (данные из Sanity CMS)
import Layout from '../components/Layout';
import SectionHeader from '../components/SectionHeader';
import PersonCard from '../components/PersonCard';
import NewsCard from '../components/NewsCard';
import GalleryGrid from '../components/GalleryGrid';
import ApplicationForm from '../components/ApplicationForm';
import RichText from '../components/RichText';
import { Reveal } from '../components/SectionHeader';
import { getTapanPageData } from '../lib/api';

export default function TapanPage({ chair, council, pageContent, news, gallery, settings }) {
  return (
    <Layout settings={settings}>
      <div className="ph ph-tp">
        <div className="ph-c">
          <h1>Тапан</h1>
          <p>Молодёжная организация при Церкви Святого Саркиса</p>
        </div>
      </div>
      <div className="sec">
        {pageContent ? (
          <Reveal>
            <div className="at">
              {pageContent.title && <h3>{pageContent.title}</h3>}
              <RichText value={pageContent.body} />
            </div>
          </Reveal>
        ) : (
          <Reveal>
            <div className="at">
              <h3>О молодёжной организации «Тапан»</h3>
              <p>«Тапан» — молодёжная организация при Армянской Апостольской Церкви Святого Саркиса в Воронеже.</p>
            </div>
          </Reveal>
        )}

        {chair && (
          <>
            <SectionHeader label="Руководство" title="Председатель" />
            <PersonCard person={chair} centered />
          </>
        )}

        {council && council.length > 0 && (
          <>
            <SectionHeader label="Команда" title="Совет управления" />
            <div className="ccg" style={{ marginBottom: 64 }}>
              {council.map((c, i) => (
                <Reveal key={c._id || i} delay={i * 0.1}>
                  <div className="cc">
                    <img className="cc-ph" src={c.photo || c.image} alt={c.name} />
                    <div className="cc-nm">{c.name}</div>
                    <div className="cc-rl">{c.role}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </>
        )}

        {gallery && gallery.length > 0 && (
          <>
            <SectionHeader label="Фото и видео" title="Галерея" />
            <div style={{ marginBottom: 64 }}>
              <GalleryGrid images={gallery} />
            </div>
          </>
        )}

        {news && news.length > 0 && (
          <>
            <SectionHeader label="Новости организации" title="Новости «Тапан»" />
            <div className="ng" style={{ marginBottom: 64 }}>
              {news.map((n, i) => <NewsCard key={n._id} item={n} delay={i * 0.1} />)}
            </div>
          </>
        )}

        <SectionHeader label="Присоединяйтесь" title="Подать заявку" />
        <ApplicationForm />
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const data = await getTapanPageData();
  return { props: data, revalidate: 60 };
}
