import nookies from 'nookies';
import { GetServerSidePropsContext } from 'next';
import { ErrorBoundary } from 'react-error-boundary';
import { logInWithEmailAndPassword } from '@/firebase/firebaseClient';
import ROUTES from '@/constants/routes';
import { firebaseAdmin } from '@/firebase/firebaseAdmin';
import AuthView from '@/components/authView';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

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
      props: {
        uid,
      },
    };
  } catch (err) {
    const locale = ctx.locale || 'en';
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common'])),
      },
    };
  }
};

const SignIn = () => {
  const onSignIn = async (email: string, password: string) => {
    return await logInWithEmailAndPassword(email, password);
  };

  return (
    <ErrorBoundary fallback={<div>Something went wrong...</div>}>
      <AuthView authCallback={onSignIn} page="SIGN_IN" />
    </ErrorBoundary>
  );
};

export default SignIn;
