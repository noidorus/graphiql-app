import nookies from 'nookies';
import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect } from 'react';
import Router from 'next/router';
import Header from '@/components/Header';
import PageContainer from '@/components/PageContainer';
import { firebaseAdmin } from '@/firebase/firebaseAdmin';
import ROUTES from '@/constants/routes';

import styles from './style.module.scss';
import Footer from '@/components/Footer';
import Editor from '@/components/editor';
import { RingLoader } from 'react-spinners';
import dynamic from 'next/dynamic';
 
const Documentation = dynamic(() => import('../../components/Documentation'), {
  loading: () => <RingLoader loading={true} color={'#a359ff'} />,
});

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    const { uid, exp } = token;

    const locale = ctx.locale || 'en';

    return {
      props: { uid, exp, ...(await serverSideTranslations(locale, ['common'])) },
    };
  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: ROUTES.SIGN_IN,
      },
      props: {} as never,
    };
  }
};

const AppPage = ({ exp: expTime }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  useEffect(() => {
    const handle = setInterval(async () => {
      const currTime = Math.floor(Date.now() / 1000);
      if (currTime > expTime) {
        Router.push(ROUTES.WELCOME);
      }
    }, 60 * 1000);
    return () => clearInterval(handle);
  }, [expTime]);

  return (
    <>
      <Header />
      <PageContainer>
        <div className={styles.app}>
          <div className={styles['app__sidebar']}>
            <Documentation></Documentation>
            <button className={styles.app__sidebar_refetch}>
              <picture>
                <img className={styles['app__sidebar__img']} src="/refetch.svg" alt="docs" />
              </picture>
            </button>
          </div>
          <Editor />
        </div>
      </PageContainer>
      <Footer />
    </>
  );
};

export default AppPage;
