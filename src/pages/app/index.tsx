import nookies from 'nookies';
import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Header from '@/components/Header';
import PageContainer from '@/components/PageContainer';
import { firebaseAdmin } from '@/firebase/firebaseAdmin';
import ROUTES from '@/constants/routes';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    const { uid } = token;

    const locale = ctx.locale || 'en';

    return {
      props: { uid, ...(await serverSideTranslations(locale, ['common'])) },
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

const AppPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Header />
      <PageContainer>Hello</PageContainer>
    </>
  );
};

export default AppPage;
