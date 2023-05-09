import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Link from 'next/link';
import nookies from 'nookies';

import { registerWithEmailAndPassword } from '@/services/firebase';
import ROUTES from '@/constants/routes';
import Button from '@/components/Button';
import PageContainer from '@/components/PageContainer';

import styles from './style.module.scss';
import { GetServerSidePropsContext } from 'next';
import { firebaseAdmin } from '@/services/firebaseAdmin';

interface FormData {
  email: string;
  password: string;
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    const { uid } = token;

    return {
      redirect: {
        permanent: false,
        destination: '/app',
      },
      props: { uid },
    };
  } catch (err) {
    return {
      props: {} as never,
    };
  }
};

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const router = useRouter();

  const onSubmit = handleSubmit(async ({ email, password }) => {
    registerWithEmailAndPassword(email, password).then(() => {
      router.push(ROUTES.APP);
    });
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
              <input id="email" type="text" {...register('email')} placeholder="Enter your email" />
              <label htmlFor="email">Email</label>
            </div>

            <div className={styles['form__item']}>
              <input
                id="password"
                type="password"
                {...register('password')}
                placeholder="Enter your password"
              />
              <label htmlFor="password">Password</label>
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
