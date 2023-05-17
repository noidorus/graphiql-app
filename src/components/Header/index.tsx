import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

import { auth } from '@/firebase/firebaseClient';
import ROUTES from '@/constants/routes';
import { useAuth } from '../authProvider';

import Button from '../Button';
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
        <input className={styles['header__theme']} type="checkbox" />
        {!user ? (
          <Button
            type="button"
            onClick={() => router.push(ROUTES.SIGN_IN)}
            text={'Sign In'}
            iconProps={{ src: '/log-in.svg', alt: 'log-in icon', size: 32 }}
          />
        ) : (
          <>
            <Button
              type="button"
              onClick={handleSignOut}
              text={'Sign Out'}
              iconProps={{ src: '/log-out.svg', alt: 'log-out icon', size: 24 }}
            />
            <Button
              type="button"
              onClick={() => router.push(ROUTES.APP)}
              text={'App Page'}
              iconProps={{ src: '/home.svg', alt: 'home icon', size: 24 }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
