import { useTranslation } from 'react-i18next';
import PageContainer from '@/components/PageContainer';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

import styles from './style.module.scss';

export default function WelcomePage() {
  const { t } = useTranslation();

  return (
    <>
      <Header />
      <PageContainer>
        <div className={styles.welcome}>
          <div className={styles['welcome__wrapper']}>
            <div className={styles['welcome__title-block']}>
              <h1 className={styles['welcome__title']}>{t('title')}</h1>
              <p className={styles['welcome__subtitle']}>{t('subtitle')}</p>
            </div>
            <div className={styles['welcome__description-block']}>
              <div className={styles['welcome__description__text']}>
                <div className={styles['welcome__text-block']}>
                  <p className={styles['welcome__text']}>{t('graphiQL')}</p>
                  <p className={styles['welcome__text']}>{t('rsschool')}</p>
                  <p className={styles['welcome__text']}>{t('course')}</p>
                </div>
                <p className={styles['welcome__developers__title']}>{t('team')}</p>
                <div className={styles['welcome__developers-block']}>
                  <div className={styles['welcome__developers']}>
                    <div>
                      <img
                        className={styles['welcome__developers__img']}
                        src="https://i.postimg.cc/9XppkcnP/image.jpg"
                        alt="photo"
                      />
                      <p className={styles['welcome__developers__name']}>{t('Rodion')}</p>
                    </div>

                    <p className={styles['welcome__developers__description']}>
                      {t('Rodion-description')}
                    </p>
                  </div>
                  <div className={styles['welcome__developers']}>
                    <div>
                      <img
                        className={styles['welcome__developers__img']}
                        src="https://i.postimg.cc/T14WXNmx/image.jpg"
                        alt="photo"
                      />
                      <p className={styles['welcome__developers__name']}>{t('Maria')}</p>
                    </div>
                    <p className={styles['welcome__developers__description']}>
                      {t('Maria-description')}
                    </p>
                  </div>
                  <div className={styles['welcome__developers']}>
                    <div>
                      <img
                        className={styles['welcome__developers__img']}
                        src="https://i.postimg.cc/KcD2sgb9/image.png"
                        alt="photo"
                      />
                      <p className={styles['welcome__developers__name']}>{t('Anna')}</p>
                    </div>
                    <p className={styles['welcome__developers__description']}>
                      {t('Anna-description')}
                    </p>
                  </div>
                </div>
              </div>
              <img
                className={styles['welcome__description__img']}
                src="/welcome-rocket.png"
                alt="rocket"
              />
            </div>
          </div>
        </div>
      </PageContainer>
      <Footer />
    </>
  );
}
