import { FC } from 'react';
import NextNProgress from 'nextjs-progressbar';
import type { AppProps } from 'next/app';
import { AuthProvider } from '@/components';
import { appWithTranslation } from 'next-i18next';

import '@/styles/globals.scss';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <NextNProgress />
      <Component {...pageProps} />
    </AuthProvider>
  );
};

export default appWithTranslation(App);
