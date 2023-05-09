import { FC } from 'react';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';

// import { wrapper } from '@/redux/setupStore';
import '@/styles/globals.scss';
import { AuthProvider } from '@/components/authProvider/AuthProvider';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  // const App: FC<AppProps> = ({ Component, ...rest }) => {
  // const { store, props } = wrapper.useWrappedStore(rest);

  return (
    // <Provider store={store}>
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
    // </Provider>
  );
};

export default App;
