import { useTranslation } from 'react-i18next';

import styles from './styles.module.scss';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleChangeLanguage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLanguage = event.target.checked ? 'ru' : 'en';
    i18n.changeLanguage(newLanguage);
  };

  return (
    <>
      <input
        className={styles['language-switcher']}
        type="checkbox"
        checked={i18n.language === 'ru'}
        onChange={handleChangeLanguage}
      />
    </>
  );
}

export default LanguageSwitcher;
