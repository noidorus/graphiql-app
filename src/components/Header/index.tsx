import { useEffect, useState } from 'react';
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
            <Button type="button" onClick={() => router.push(ROUTES.SIGN_IN)} text={'Sign In'} />
            <Button type="button" onClick={() => router.push(ROUTES.SIGN_UP)} text={'Sign Up'} />
          </>
        ) : (
          <>
            <Button type="button" onClick={handleSignOut} text={'Sign Out'} />
            <Button
              type="button"
              onClick={() => router.push(ROUTES.APP)}
              text={'Go to Main Page'}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
