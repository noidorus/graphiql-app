import nookies from 'nookies';
import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';

import Header from '@/components/Header';
import PageContainer from '@/components/PageContainer';
import { firebaseAdmin } from '@/firebase/firebaseAdmin';

import styles from './style.module.scss';
import Footer from '@/components/Footer';
import Editor from '@/components/editor';

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
      <PageContainer>
        <div className={styles.app}>
          <div className={styles['app__sidebar']}>
            <button className={styles.app__sidebar_docs}>
              <img className={styles['app__sidebar__img']} src="/docs.png" alt="docs" />
            </button>
            <button className={styles.app__sidebar_refetch}>
              <img className={styles['app__sidebar__img']} src="/refetch.svg" alt="docs" />
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
