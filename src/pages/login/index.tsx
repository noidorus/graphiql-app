import { useForm } from 'react-hook-form';

interface FormData {
  email: string;
  password: string;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit(({ email, password }) => {});

  return (
    <form className="auth-form" onSubmit={onSubmit}>
      <input type="text" {...register('email')} placeholder="Email address" />
      <input type="password" {...register('password')} placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}
