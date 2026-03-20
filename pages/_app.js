// pages/_app.js
// Подключает глобальные стили ко всем страницам
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
