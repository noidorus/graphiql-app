import { useForm } from 'react-hook-form';
import Router from 'next/router';
import Link from 'next/link';
import nookies from 'nookies';
import { GetServerSidePropsContext } from 'next';

import { registerWithEmailAndPassword } from '@/firebase/firebaseClient';
import { firebaseAdmin } from '@/firebase/firebaseAdmin';
import resolver, { schemaType } from '@/utils/yupSchema';
import ROUTES from '@/constants/routes';
import Button from '@/components/Button';
import PageContainer from '@/components/PageContainer';

import styles from './style.module.scss';

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<schemaType>({ resolver });

  const onSubmit = handleSubmit(async ({ email, password }) => {
    // registerWithEmailAndPassword(email, password).then(() => {
    //   setTimeout(() => {
    //     Router.push(ROUTES.APP);
    //   }, 1000);
    // });
  });

  return (
    <PageContainer>
      <section className={styles['form__wrapper']}>
        <h2 className={styles['form__title']}>
          Sign up to use
          <Link href={ROUTES.WELCOME}>GraphiQL App</Link>
        </h2>

        <form className={styles['form']} onSubmit={onSubmit}>
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

          <Button type="submit" text="Sign Up" />

          <p>
            Already have an account? <Link href={ROUTES.SIGN_IN}>Sign In!</Link>
          </p>
        </form>
      </section>
    </PageContainer>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    const { uid } = token;

    return {
      redirect: {
        permanent: false,
        destination: ROUTES.APP,
      },
      props: { uid },
    };
  } catch (err) {
    return {
      props: {} as never,
    };
  }
};
