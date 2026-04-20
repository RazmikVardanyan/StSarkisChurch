// pages/about.js — О нас (с галереей церкви)
import Layout from '../components/Layout';
import SectionHeader from '../components/SectionHeader';
import PersonCard from '../components/PersonCard';
import ContactsBlock from '../components/ContactsBlock';
import GalleryGrid from '../components/GalleryGrid';
import RichText from '../components/RichText';
import { Reveal } from '../components/SectionHeader';
import { getAboutPageData } from '../lib/api';

export default function AboutPage({ pastor, pageContent, gallery, settings }) {
  return (
    <Layout settings={settings}>
      <div className="ph ph-ab">
        <div className="ph-c">
          <h1>О храме</h1>
          <p>{settings?.subtitle || 'Армянская Апостольская Церковь Святого Саркиса · Воронеж'}</p>
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
              <h3>Армянская Апостольская Церковь</h3>
              <p>Церковь Святого Саркиса в Воронеже — это духовный центр армянской общины города.</p>
            </div>
          </Reveal>
        )}

        <SectionHeader label="Духовенство" title="Настоятель храма" />
        {pastor && <PersonCard person={pastor} />}

        {/* Галерея церкви — фото из категории «Церковь» */}
        {gallery && gallery.length > 0 && (
          <>
            <SectionHeader label="Фото храма" title="Галерея" />
            <div style={{ marginBottom: 48 }}>
              <GalleryGrid images={gallery} showCaptions />
            </div>
          </>
        )}

        <SectionHeader label="Свяжитесь с нами" title="Контакты" />
        <ContactsBlock settings={settings || {}} />
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const data = await getAboutPageData();
  return { props: data, revalidate: 60 };
}
