/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect } from 'react';
// context & provider
import { useAuth } from './useAuth';

const withProtected = (Component) => {
  const WithProtected = (props) => {
    const auth = useAuth();
    const { userData } = useAuth();
    const router = useRouter();

    if (!userData) {
      router.replace('/');
      return <div />;
    }

    return <Component auth={auth} {...props} />;
  };
  return WithProtected;
};

const withPublic = (Component) => {
  const WithPublic = (props) => {
    const auth = useAuth();
    const { userData } = useAuth();
    const router = useRouter();

    if (userData) {
      router.replace('/profile');
      return <div />;
    }

    return <Component auth={auth} {...props} />;
  };
  return WithPublic;
};

export { withProtected, withPublic };
