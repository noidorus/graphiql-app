import nookies from 'nookies';
import { GetServerSidePropsContext } from 'next';

import { registerWithEmailAndPassword } from '@/firebase/firebaseClient';
import { firebaseAdmin } from '@/firebase/firebaseAdmin';
import ROUTES from '@/constants/routes';
import AuthView from '@/components/authView';

export default function SignUp() {
  const onSignUp = async (email: string, password: string) => {
    return await registerWithEmailAndPassword(email, password);
  };

  return <AuthView authCallback={onSignUp} page="SIGN_UP" />;
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
