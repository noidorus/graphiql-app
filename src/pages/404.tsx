import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Button from '@/components/Button';
import PageContainer from '@/components/PageContainer';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import styles from './404.module.scss';

const ErrorPage = () => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <PageContainer>
      <div className={styles.error}>
        <picture>
          <img className={styles['error__img']} src="/error.png" alt="error" />
        </picture>

        <div className={styles['error__block']}>
          <h1 className={styles['error__title']}>{t('404.oops')}</h1>
          <p className={styles['error__text']}>{t('404.error')}</p>
          <Button type="button" onClick={() => router.push('/')} text={'Go Home'} />
        </div>
      </div>
    </PageContainer>
  );
};

export default ErrorPage;

// @ts-ignore
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
