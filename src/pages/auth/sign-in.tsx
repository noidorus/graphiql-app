import nookies from 'nookies';
import { GetServerSidePropsContext } from 'next';

import { logInWithEmailAndPassword } from '@/firebase/firebaseClient';
import ROUTES from '@/constants/routes';
import { firebaseAdmin } from '@/firebase/firebaseAdmin';
import AuthView from '@/components/authView';

export default function SignIn() {
  const onSignIn = async (email: string, password: string) => {
    return await logInWithEmailAndPassword(email, password);
  };

  return <AuthView authCallback={onSignIn} page="SIGN_IN" />;
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
