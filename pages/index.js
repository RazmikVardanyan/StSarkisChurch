// pages/index.js — Главная (данные из Sanity CMS)
import Layout from '../components/Layout';
import HeroSlider from '../components/HeroSlider';
import NewsCard from '../components/NewsCard';
import ScheduleBlock from '../components/ScheduleBlock';
import SectionHeader from '../components/SectionHeader';
import { getHomePageData } from '../lib/api';

export default function HomePage({ slides, news, schedule, settings }) {
  return (
    <Layout settings={settings}>
      <HeroSlider slides={slides} />
      <div className="sec">
        <SectionHeader label="Последние события" title="Новости прихода" />
        <div className="ng">
          {news.map((n, i) => <NewsCard key={n._id} item={n} delay={i * 0.1} />)}
        </div>
      </div>
      <div className="sec" style={{ paddingTop: 0 }}>
        <SectionHeader label="Богослужения" title="Расписание" />
        <ScheduleBlock items={schedule} />
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const data = await getHomePageData();
  return { props: data, revalidate: 60 };
}
