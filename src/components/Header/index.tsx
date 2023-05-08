import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import 'firebase/auth';
import { auth } from '@/services/firebase';
import { User } from 'firebase/auth';
import Button from '../Button';

import styles from './styles.module.scss';
import ROUTES from '@/constants/routes';

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
        <input className={styles['header__theme']} type="checkbox" />
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
