import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import Router from 'next/router';
import Link from 'next/link';
import { useState } from 'react';
import { UserCredential } from 'firebase/auth';

import PageContainer from '@/components/PageContainer';
import ROUTES from '@/constants/routes';
import Button from '@/components/Button';

import resolver, { schemaType } from '@/utils/yupSchema';
import { getAuthError } from '@/utils/helpers';

import styles from './style.module.scss';

interface Props {
  authCallback: (email: string, password: string) => Promise<UserCredential>;
  page: 'SIGN_IN' | 'SIGN_UP';
}

const AuthView = ({ authCallback, page }: Props) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<schemaType>({ resolver });
  const [authError, setAuthError] = useState<string>('');

  const onSubmit = handleSubmit(async ({ email, password }) => {
    try {
      await authCallback(email, password);

      Router.push(ROUTES.APP);
    } catch (e) {
      const err = getAuthError(e);
      setAuthError(err);
    }
  });

  return (
    <PageContainer>
      <section className={styles['form__wrapper']}>
        <h2 className={styles['form__title']}>
          {t('sign.sign')} {page === 'SIGN_IN' ? `${t('sign.in')}` : `${t('sign.up')}`}{' '}
          {t('sign.use')}
          <Link href={ROUTES.WELCOME}>{t('sign.GraphiQL')}</Link>
        </h2>

        <form className={styles['form']} onSubmit={onSubmit}>
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
