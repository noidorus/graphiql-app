import { UserCredential } from 'firebase/auth';

export interface Props {
  authCallback: (email: string, password: string) => Promise<UserCredential>;
  page: 'SIGN_IN' | 'SIGN_UP';
}
