import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { logout } from '@/services/firebase';
import { AppState } from '@/redux/setupStore';
import useUser from '@/lib/useUser';

export default function Main() {
  return (
    <button type="button" onClick={() => logout()}>
      Sign Out
    </button>
  );
}
