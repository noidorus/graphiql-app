import styles from './styles.module.scss';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles['footer__developers']}>
        <a href="https://github.com/HuffPuffTuff" target="_blank">
          HuffPuffTuff
        </a>
        <a href="https://github.com/wozzzie" target="_blank">
          wozzzie
        </a>
        <a href="https://github.com/annTerry" target="_blank">
          annTerry
        </a>
      </div>
      <div className={styles['footer__copyright']}>
        <p>© 2023 All Rights Reserved.</p>
      </div>
      <a href="https://rs.school/react/" target="_blank">
        <picture>
          <img className={styles['footer__logo']} src="/rs-school.svg" alt="rs-school" />
        </picture>
      </a>
    </div>
  );
};

export default Footer;
