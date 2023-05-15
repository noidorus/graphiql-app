import { useRouter } from 'next/router';
import Button from '@/components/Button';
import PageContainer from '@/components/PageContainer';

import styles from './404.module.scss';

const ErrorPage = () => {
  const router = useRouter();

  return (
    <PageContainer>
      <div className={styles.error}>
        <img className={styles['error__img']} src="/error.png" alt="error" />
        <div className={styles['error__block']}>
          <h1 className={styles['error__title']}>Oops!</h1>
          <p className={styles['error__text']}>You are lost</p>
          <Button type="button" onClick={() => router.push('/')} text={'Go Home'} />
        </div>
      </div>
    </PageContainer>
  );
};

export default ErrorPage;
