import '../styles/globals.scss';
import type { AppProps } from 'next/app';

import Navbar from '../components/Navbar/Navbar';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
