import { useForm } from 'react-hook-form';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, registerWithEmailAndPassword } from '@/services/firebase';

interface FormData {
  username: string;
  email: string;
  password: string;
}

export default function Registration() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [user, error, loading] = useAuthState(auth);

  const onSubmit = handleSubmit(async ({ email, password }) => {
    registerWithEmailAndPassword(email, password);
  });

  return (
    <form className="auth-form" onSubmit={onSubmit}>
      <input type="text" {...register('username')} placeholder="Username" />
      <input type="text" {...register('email')} placeholder="Email address" />
      <input type="password" {...register('password')} placeholder="Password" />
      <button type="submit">Registration</button>
    </form>
  );
}
