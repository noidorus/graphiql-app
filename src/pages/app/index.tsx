import nookies from 'nookies';
import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';

import Header from '@/components/Header';
import PageContainer from '@/components/PageContainer';
import { firebaseAdmin } from '@/services/firebaseAdmin';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    const { uid } = token;

    return {
      props: { uid },
    };
  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: '/auth/sign-in',
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
