import nookies from 'nookies';
import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';
import { useEffect } from 'react';
import Router from 'next/router';

import Header from '@/components/Header';
import PageContainer from '@/components/PageContainer';
import { firebaseAdmin } from '@/firebase/firebaseAdmin';
import ROUTES from '@/constants/routes';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    const { uid, exp } = token;

    return {
      props: { uid, exp },
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
  }, []);

  return (
    <>
      <Header />
      <PageContainer>Hello</PageContainer>
    </>
  );
};

export default AppPage;
