import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { registerWithEmailAndPassword } from '@/services/firebase';
import ROUTES from '@/constants/routes';
import Button from '@/components/Button';
import PageContainer from '@/components/PageContainer';

import styles from './style.module.scss';
import { useSelector } from 'react-redux';
import { AppState } from '@/redux/setupStore';

interface FormData {
  email: string;
  password: string;
}

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const router = useRouter();
  const user = useSelector(({ auth }: AppState) => auth.user);

  if (user) {
    router.push(ROUTES.APP);
  }

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
