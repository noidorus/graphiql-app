import { useState, useEffect } from 'react';
import styles from './styles.module.scss';

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);

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

  return (
    <div className={`${styles.header} ${isSticky ? `${styles['header_sticky']}` : ''}`}>
      <img className={styles['header__logo']} src="/logo.svg" alt="logo" />
      <div className={styles['header__btns']}>
        <button className={styles['header__btn']} onClick={() => {}}>
          Sign In
        </button>
        <button className={styles['header__btn']} onClick={() => {}}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Header;
