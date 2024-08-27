import { useCallback, useState } from "react";

const useAuth = () => {
  const [auth, setAuth] = useState({ isAuthenticated: false });

  const signup = useCallback(
    async (
      name: string,
      email: string,
      password: string,
      passwordConfirmation: string
    ) => {
      console.log({
        name: name,
        email: email,
        password: password,
        passwordConfirmation: passwordConfirmation,
      });
      setAuth((prev) => ({ ...prev, isAuthenticated: true }));
    },
    [setAuth]
  );

  const login = useCallback(
    async (email: string, password: string) => {
      console.log({
        email: email,
        password: password,
      });
      setAuth((prev) => ({ ...prev, isAuthenticated: true }));
    },
    [setAuth]
  );

  const logout = useCallback(async () => {
    console.log("logout");
    setAuth((prev) => ({ ...prev, isAuthenticated: false }));
  }, [setAuth]);

  return { auth, signup, login, logout };
};

export default useAuth;
