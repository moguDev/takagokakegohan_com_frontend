import { useCallback, useState } from "react";
import { atom, useRecoilState } from "recoil";

const authState = atom({
  key: "authState",
  default: { isAuthenticated: false },
});

const useAuth = () => {
  const [auth, setAuth] = useRecoilState(authState);

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

  return { isAuthenticated: auth.isAuthenticated, signup, login, logout };
};

export default useAuth;
