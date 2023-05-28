import React, { useState, useEffect, useContext, createContext } from 'react';
import nookies from 'nookies';
import { User } from 'firebase/auth';
import { auth } from '@/firebase/firebaseClient';

const AuthContext = createContext<{ user: User | null }>({
  user: null,
});

const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).nookies = nookies;
    }

    return auth.onIdTokenChanged(async (user) => {
      if (!user) {
        setUser(null);
        nookies.destroy(null, 'token');
        nookies.set(null, 'token', '', { path: '/' });
        return;
      }

      const token = await user.getIdToken();
      setUser(user);
      nookies.destroy(null, 'token');
      nookies.set(null, 'token', token, { path: '/' });
    });
  }, []);

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
