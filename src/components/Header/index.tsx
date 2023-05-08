import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import 'firebase/auth';
import { auth } from '@/services/firebase';
import { User } from 'firebase/auth';
import Button from '../Button';

import styles from './styles.module.scss';

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
            <Button onClick={() => router.push('/login')} text={'Sign In'} />
            <Button onClick={() => router.push('/signUp')} text={'Sign Up'} />
          </>
        ) : (
          <>
            <Button onClick={handleSignOut} text={'Sign Out'} />
            <Button onClick={() => router.push('/main')} text={'Go to Main Page'} />
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
