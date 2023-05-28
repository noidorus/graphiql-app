import * as Yup from 'yup';
import Router from 'next/router';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { UserCredential } from 'firebase/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import { RingLoader } from 'react-spinners';
import PageContainer from '@/components/PageContainer';
import ROUTES from '@/constants/routes';
import Button from '@/components/Button';
import { getAuthError } from '@/utils/helpers';

import styles from './style.module.scss';

interface Props {
  authCallback: (email: string, password: string) => Promise<UserCredential>;
  page: 'SIGN_IN' | 'SIGN_UP';
}

const AuthView = ({ authCallback, page }: Props) => {
  const { t } = useTranslation();

  const schema = Yup.object().shape({
    email: Yup.string()
      .required(t('validation.required') || '')
      .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, t('validation.email') || ''),
    password: Yup.string()
      .required(t('validation.required') || '')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#-_?&])[A-Za-z\d@$!%*#-_?&]{8,}$/,
        t('validation.password') || ''
      ),
  });

  const resolver = yupResolver(schema);
  type schemaType = Yup.InferType<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<schemaType>({ resolver });
  const [authError, setAuthError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const onSubmit = handleSubmit(async ({ email, password }) => {
    setLoading(true);
    try {
      await authCallback(email, password);

      setLoading(false);
      Router.push(ROUTES.APP);
    } catch (e) {
      const err = getAuthError(e);
      setAuthError(err);
      setLoading(false);
    }
  });

  return (
    <PageContainer>
      <section className={styles['form__wrapper']}>
        <h2 className={styles['form__title']}>
          <span>
            {' '}
            {t('sign.sign')} {page === 'SIGN_IN' ? `${t('sign.in')}` : `${t('sign.up')}`}{' '}
            {t('sign.use')}
          </span>

          <Link className={styles['form__title_link']} href={ROUTES.WELCOME}>
            {t('sign.GraphiQL')}
          </Link>
        </h2>

        <form className={styles['form']} onSubmit={onSubmit}>
          {loading ? (
            <div className={styles['form__loading']}>
              <RingLoader loading={loading} color={'#a359ff'} />
            </div>
          ) : null}

          {authError && <p className={styles['form__error']}>{authError}</p>}
          <div className={styles['form__controls']}>
            <div className={styles['form__item']}>
              <input
                className={styles['form__input']}
                id="email"
                type="text"
                {...register('email')}
                placeholder={t('sign.placeholder-email') || ''}
              />
              <label className={styles['form__label']} htmlFor="email">
                {t('sign.email')}
              </label>
              {errors.email?.message && (
                <p className={styles['form__error']}>{errors.email?.message}</p>
              )}
            </div>

            <div className={styles['form__item']}>
              <input
                className={styles['form__input']}
                id="password"
                type="password"
                {...register('password')}
                placeholder={t('sign.placeholder-password') || ''}
              />
              <label className={styles['form__label']} htmlFor="password">
                {t('sign.password')}
              </label>
              {errors.password?.message && (
                <p className={styles['form__error']}>{errors.password?.message}</p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            text={page === 'SIGN_IN' ? `${t('header.btn-signin')}` : `${t('header.btn-signup')}`}
            iconProps={{ src: '/log-in.svg', alt: 'log-in icon', size: 32 }}
          />

          <p>
            {page === 'SIGN_IN' ? (
              <>
                {t('sign.account-false')}
                <Link href={ROUTES.SIGN_UP}>{t('header.btn-signup')}!</Link>
              </>
            ) : (
              <>
                {t('sign.account-true')}
                <Link href={ROUTES.SIGN_IN}>{t('header.btn-signin')}!</Link>
              </>
            )}
          </p>
        </form>
      </section>
    </PageContainer>
  );
};

export default AuthView;
