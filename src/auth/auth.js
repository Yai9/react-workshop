import { useContext, createContext, useEffect, useState } from "react";

let userState = {};
const User = createContext({ user: null, loading: false });
export const UserProvider = ({ value, children }) => {
  const { user } = value;
  useEffect(() => {
    if (!userState && user) {
      userState = user;
    }
  }, [user]);
  return <User.Provider>{children}</User.Provider>;
};

export const useUser = () => useContext(User);

export const useFetchUser = () => {
  const [user, setUser] = useState({
    user: userState || null,
    loading: userState === undefined,
  });
  useEffect(() => {
    if (userState !== undefined) {
      return;
    }
    let isMounted = true;
    if (isMounted) {
      setUser({ user, loading: false });
    }
    return () => {
      isMounted = false;
    };
  }, [user]);
  return user;
};

export default UserProvider;
