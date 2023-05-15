import { FC } from 'react';
import NextNProgress from 'nextjs-progressbar';
import type { AppProps } from 'next/app';
import { I18nextProvider } from 'react-i18next';
import { AuthProvider } from '@/components/authProvider';
import i18n from '../../i18n';

import '@/styles/globals.scss';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <NextNProgress />
        <Component {...pageProps} />
      </AuthProvider>
    </I18nextProvider>
  );
};

export default App;
