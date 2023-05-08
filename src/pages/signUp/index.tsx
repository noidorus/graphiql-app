import { useForm } from 'react-hook-form';
import { registerWithEmailAndPassword } from '@/services/firebase';
import { useRouter } from 'next/router';

import useUser from '@/lib/useUser';

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

  const onSubmit = handleSubmit(async ({ email, password }) => {
    registerWithEmailAndPassword(email, password).then(() => {
      router.push('/main');
    });
  });

  return (
    <form className="form" onSubmit={onSubmit}>
      <input type="text" {...register('email')} placeholder="Email address" />
      <input type="password" {...register('password')} placeholder="Password" />
      <button className="btn" type="submit">
        Sign Up
      </button>
    </form>
  );
}
