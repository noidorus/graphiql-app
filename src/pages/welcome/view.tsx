import PageContainer from '@/components/PageContainer';
import Footer from '@/components/Footer';

import styles from './style.module.scss';
import Header from '@/components/Header';

export default function WelcomePageView() {
  return (
    <>
      <Header />
      <PageContainer>
        <div className={styles.welcome}>
          <div className={styles['welcome__wrapper']}>
            <div className={styles['welcome__title-block']}>
              <h1 className={styles['welcome__title']}>Welcome to the GraphiQL App</h1>
              <p className={styles['welcome__subtitle']}>Good to see you here</p>
            </div>
            <div className={styles['welcome__description-block']}>
              <div className={styles['welcome__description__text']}>
                <div className={styles['welcome__text-block']}>
                  <p className={styles['welcome__text']}>
                    GraphiQL is a playground/IDE for graphQL requests.
                  </p>
                  <p className={styles['welcome__text']}>
                    RS School is free-of-charge and community-based education program conducted by
                    The Rolling Scopes developer community since 2013.
                  </p>
                  <p className={styles['welcome__text']}>
                    React course covers fundamentals, real-world applications, popular libraries and
                    tools, preparing students for real React projects.
                  </p>
                </div>
                <p className={styles['welcome__developers__title']}>Our team</p>
                <div className={styles['welcome__developers-block']}>
                  <div className={styles['welcome__developers']}>
                    <div>
                      <img
                        className={styles['welcome__developers__img']}
                        src="https://i.postimg.cc/9XppkcnP/image.jpg"
                        alt="photo"
                      />
                      <p className={styles['welcome__developers__name']}>Rodion</p>
                    </div>

                    <p className={styles['welcome__developers__description']}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec mauris vel
                      velit commodo molestie.
                    </p>
                  </div>
                  <div className={styles['welcome__developers']}>
                    <div>
                      <img
                        className={styles['welcome__developers__img']}
                        src="https://i.postimg.cc/T14WXNmx/image.jpg"
                        alt="photo"
                      />
                      <p className={styles['welcome__developers__name']}>Maria</p>
                    </div>
                    <p className={styles['welcome__developers__description']}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec mauris vel
                      velit commodo molestie.
                    </p>
                  </div>
                  <div className={styles['welcome__developers']}>
                    <div>
                      <img
                        className={styles['welcome__developers__img']}
                        src="https://i.postimg.cc/KcD2sgb9/image.png"
                        alt="photo"
                      />
                      <p className={styles['welcome__developers__name']}>Anna</p>
                    </div>
                    <p className={styles['welcome__developers__description']}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec mauris vel
                      velit commodo molestie.
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
