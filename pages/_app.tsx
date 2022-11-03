import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from './store';
import PopUp from '@root/pop-up/components/PopUp';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <div id="portal" />
      <PopUp />
      <Component {...pageProps} />
    </Provider>
  );
}
