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
          Sign {page === 'SIGN_IN' ? 'in' : 'up'} to use
          <Link href={ROUTES.WELCOME}>GraphiQL App</Link>
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
                placeholder="Enter your email"
              />
              <label className={styles['form__label']} htmlFor="email">
                Email
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
                placeholder="Enter your password"
              />
              <label className={styles['form__label']} htmlFor="password">
                Password
              </label>
              {errors.password?.message && (
                <p className={styles['form__error']}>{errors.password?.message}</p>
              )}
            </div>
          </div>

          <Button type="submit" text={page === 'SIGN_IN' ? 'Sign In' : 'Sign Up'} />

          <p>
            {`Don't have an account? `}
            {page === 'SIGN_IN' ? (
              <Link href={ROUTES.SIGN_UP}>Sign Up!</Link>
            ) : (
              <Link href={ROUTES.SIGN_IN}>Sign In!</Link>
            )}
          </p>
        </form>
      </section>
    </PageContainer>
  );
};

export default AuthView;
