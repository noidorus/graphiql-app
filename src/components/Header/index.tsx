import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { auth } from '@/firebase/firebaseClient';
import ROUTES from '@/constants/routes';
import { useAuth } from '../authProvider';
import Button from '../Button';
import LanguageSwitcher from '../languageSwitcher';

import styles from './styles.module.scss';

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const router = useRouter();
  const { user } = useAuth();
  const { t } = useTranslation();

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      router.push(ROUTES.WELCOME);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={`${styles.header} ${isSticky ? `${styles['header_sticky']}` : ''}`}>
      <img className={styles['header__logo']} src="/logo.svg" alt="logo" />
      <div className={styles['header__btns']}>
        <LanguageSwitcher />
        {!user ? (
          <>
            <Button
              type="button"
              onClick={() => router.push(ROUTES.SIGN_IN)}
              text={t('btn-signin')}
            />
            <Button
              type="button"
              onClick={() => router.push(ROUTES.SIGN_UP)}
              text={t('btn-signup')}
            />
          </>
        ) : (
          <>
            <Button type="button" onClick={handleSignOut} text={t('btn-signout')} />
            <Button
              type="button"
              onClick={() => router.push(ROUTES.APP)}
              text={t('btn-go-main')}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
