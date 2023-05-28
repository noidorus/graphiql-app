import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

import { logout } from '@/firebase/firebaseClient';
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
    logout();
    router.push(ROUTES.WELCOME);
  };

  return (
    <div className={`${styles.header} ${isSticky ? `${styles['header_sticky']}` : ''}`}>
      <Link href={ROUTES.WELCOME}>
        <Image
          className={styles['header__logo']}
          src="/logo.svg"
          alt="logo"
          width={40}
          height={40}
        />
      </Link>
      <div className={styles['header__btns']}>
        <LanguageSwitcher />
        {!user ? (
          <Button
            type="button"
            onClick={() => router.push(ROUTES.SIGN_IN)}
            text={`${t('header.btn-signin')} / ${t('header.btn-signup')}`}
            iconProps={{ src: '/log-in.svg', alt: 'log-in icon', size: 32 }}
            testId="login-btn"
          />
        ) : user && user && router.pathname !== ROUTES.APP ? (
          <>
            <Button
              type="button"
              onClick={handleSignOut}
              text={t('header.btn-signout')}
              iconProps={{ src: '/log-out.svg', alt: 'log-out icon', size: 24 }}
            />
            <Button
              type="button"
              onClick={() => router.push(ROUTES.APP)}
              text={t('header.btn-app-page')}
              iconProps={{ src: '/home.svg', alt: 'home icon', size: 24 }}
            />
          </>
        ) : (
          <Button
            type="button"
            onClick={handleSignOut}
            text={t('header.btn-signout')}
            iconProps={{ src: '/log-out.svg', alt: 'log-out icon', size: 24 }}
          />
        )}
      </div>
    </div>
  );
};

export default Header;
