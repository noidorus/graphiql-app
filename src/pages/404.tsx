import { useRouter } from 'next/router';
import Button from '@/components/Button';
import PageContainer from '@/components/PageContainer';

import styles from './error.module.scss';

const ErrorPage = () => {
  const router = useRouter();

  return (
    <PageContainer>
      <div className={styles.error}>
        <h1 className={styles['error__title']}>Oops!</h1>
        <p className={styles['error__text']}>You are lost</p>
        <img src="/error.png" alt="error" />
        <Button onClick={() => router.push('/')} text={'Go Home'} />
      </div>
    </PageContainer>
  );
};

export default ErrorPage;