import { useEffect } from 'react';
import Router from 'next/router';
import { useSelector } from 'react-redux';

import { AppState } from '@/redux/setupStore';

export default function useUser(redirectTo = '', redirectIfFound = false) {
  const userId = useSelector(({ auth }: AppState) => auth.userId);

  useEffect(() => {
    if (redirectTo && userId && redirectIfFound) {
      Router.push(redirectTo);
    } else if (redirectTo && !userId && !redirectIfFound) {
      Router.push(redirectTo);
    }
  }, [userId, redirectTo]);

  return { userId };
}
