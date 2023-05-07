import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import firebase from 'firebase/app';
import 'firebase/auth';

import styles from './styles.module.scss';
import { auth } from '@/services/firebase';
import { User } from 'firebase/auth';

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

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

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => setUser(user));

    return unsubscribe;
  }, []);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      setUser(null);
      router.push('/welcome');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={`${styles.header} ${isSticky ? `${styles['header_sticky']}` : ''}`}>
      <img className={styles['header__logo']} src="/logo.svg" alt="logo" />
      <div className={styles['header__btns']}>
        {!user ? (
          <>
            <button className={styles['header__btn']} onClick={() => router.push('/login')}>
              Sign In
            </button>
            <button className={styles['header__btn']} onClick={() => router.push('/registration')}>
              Sign Up
            </button>
          </>
        ) : (
          <>
            <button className={styles['header__btn']} onClick={handleSignOut}>
              Sign Out
            </button>
            <button className={styles['header__btn']} onClick={() => router.push('/main')}>
              Go to Main Page
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
