import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { logInWithEmailAndPassword } from '@/services/firebase';
import { AppState } from '@/redux/setupStore';

interface FormData {
  email: string;
  password: string;
}

export default function Login() {
  const [loginPage, setLoginPage] = useState<'signIn' | 'signUp'>('signIn');
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit(({ email, password }) => {
    logInWithEmailAndPassword(email, password).then(() => {
      router.push('/main');
    });
  });

  return (
    <form className="form" onSubmit={onSubmit}>
      <input type="text" {...register('email')} placeholder="Email address" />
      <input type="password" {...register('password')} placeholder="Password" />
      <button className="btn" type="submit">
        Login
      </button>
      <p>Dont </p>
    </form>
  );
}
