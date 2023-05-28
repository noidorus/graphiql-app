import nookies from 'nookies';
import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { SyntheticEvent, useEffect, useState } from 'react';
import Router from 'next/router';
import Header from '@/components/Header';
import PageContainer from '@/components/PageContainer';
import { firebaseAdmin } from '@/firebase/firebaseAdmin';
import ROUTES from '@/constants/routes';

import styles from './style.module.scss';
import Footer from '@/components/Footer';
import Editor from '@/components/editor';
import React from 'react';
import { RingLoader } from 'react-spinners';
import dynamic from 'next/dynamic';

import { Modal } from '@/components/modal';
import { logout } from '@/firebase/firebaseClient';

const Documentation = dynamic(() => import('../../components/Documentation'), {
  loading: () => <RingLoader loading={true} color={'#a359ff'} />,
});

const AppPage = ({ exp: expTime }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  useEffect(() => {
    const handle = setInterval(async () => {
      const currTime = Math.floor(Date.now() / 1000);
      if (currTime > expTime) {
        logout();
        Router.push(ROUTES.WELCOME);
      }
    }, 60 * 1000);
    return () => clearInterval(handle);
  }, [expTime]);

  const [editorKey, setEditorKey] = useState(1);
  const [docOpen, setDocOpen] = useState(false);

  const clearEditor = (event: SyntheticEvent) => {
    setEditorKey(editorKey + 1);
  };

  const handleCloseDoc = () => {
    setDocOpen(false);
  };

  const handleOpenDoc = () => {
    setDocOpen(true);
  };

  return (
    <>
      <Header />
      <PageContainer>
        <div className={styles.app}>
          <div className={styles['app__sidebar']}>
            <button className={styles.app__sidebar_docs} onClick={handleOpenDoc}>
              <picture>
                <img className={styles['app__sidebar__img']} src="/docs.png" alt="docs" />
              </picture>
            </button>

            <button className={styles.app__sidebar_refetch} onClick={clearEditor}>
              <picture>
                <img className={styles['app__sidebar__img']} src="/refetch.svg" alt="docs" />
              </picture>
            </button>
          </div>

          {docOpen && (
            <Modal closeModal={handleCloseDoc}>
              <Documentation />
            </Modal>
          )}

          <Editor key={editorKey} />
        </div>
      </PageContainer>
      <Footer />
    </>
  );
};

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

export default AppPage;
