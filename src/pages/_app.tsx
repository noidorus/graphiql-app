import { FC } from 'react';
import type { AppProps } from 'next/app';

import '@/styles/globals.scss';
import { AuthProvider } from '@/components/authProvider/AuthProvider';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
};

export default App;
