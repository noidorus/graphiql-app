import styles from './styles.module.scss';

const Header = () => {
  return (
    <div className={styles.header}>
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
