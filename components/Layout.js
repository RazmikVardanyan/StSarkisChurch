import Header from './Header';
import Footer from './Footer';

export default function Layout({ children, settings }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer settings={settings} />
    </>
  );
}
