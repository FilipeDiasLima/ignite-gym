import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";
import {
  storageAuthTokenGet,
  storageAuthTokenRemove,
  storageAuthTokenSave,
} from "@storage/storageToken";
import {
  storageUserGet,
  storageUserRemove,
  storageUserSave,
} from "@storage/storageUser";
import { createContext, ReactNode, useEffect, useState } from "react";

type AuthContextProviderProps = {
  children: ReactNode;
};

export type AuthContextDataProps = {
  user: UserDTO;
  isLoadingStorage: boolean;
  signIn(email: string, password: string): Promise<void>;
  signOut(): void;
  updateProfile(data: UserDTO): Promise<void>;
  refeshedToken: string;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [isLoadingStorage, setIsLoadingStorage] = useState(true);
  const [refeshedToken, setRefreshedToken] = useState("");

  async function userAndTokenUpdate(userData: UserDTO, token: string) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(userData);
  }

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post("/sessions", { email, password });

      if (data.user && data.token) {
        setIsLoadingStorage(true);
        await storageUserSave(data.user);
        await storageAuthTokenSave(data.token);
        userAndTokenUpdate(data.user, data.token);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingStorage(false);
    }
  }

  async function signOut() {
    try {
      setIsLoadingStorage(true);
      setUser({} as UserDTO);
      await storageUserRemove();
      await storageAuthTokenRemove();
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingStorage(false);
    }
  }

  async function loadUserData() {
    try {
      setIsLoadingStorage(true);
      const userLogged = await storageUserGet();
      const token = await storageAuthTokenGet();

      if (token && userLogged) userAndTokenUpdate(userLogged, token);
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingStorage(false);
    }
  }

  async function updateProfile(userData: UserDTO) {
    try {
      setUser(userData);
      await storageUserSave(userData);
    } catch (error) {
      throw error;
    }
  }

  function refreshTokenUpdated(newToken: string) {
    setRefreshedToken(newToken);
  }

  useEffect(() => {
    loadUserData();
  }, []);

  useEffect(() => {
    const subscribe = api.registerInterceptTokenManager({
      signOut,
      refreshTokenUpdated,
    });

    return () => {
      subscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoadingStorage,
        refeshedToken,
        signIn,
        signOut,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
