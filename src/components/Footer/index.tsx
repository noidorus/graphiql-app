import styles from './styles.module.scss';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles['footer__developers']}>
        <a href="https://github.com/HuffPuffTuff">HuffPuffTuff</a>
        <a href="https://github.com/wozzzie">wozzzie</a>
        <a href="https://github.com/annTerry">annTerry</a>
      </div>
      <div className={styles['footer__copyright']}>
        <p>© 2023 All Rights Reserved.</p>
      </div>
      <a href="https://rs.school/react/">
        <img className={styles['footer__logo']} src="/rs-school.svg" alt="rs-school" />
      </a>
    </div>
  );
};

export default Footer;
