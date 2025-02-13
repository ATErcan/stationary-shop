'use client';

import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { IUserResponse } from "@/lib/types/responses/user.type";
import { getUser } from "@/lib/tools/api";

export const AuthContext = createContext<{
  user: IUserResponse | null;
  loading: boolean;
  setUser: Dispatch<SetStateAction<IUserResponse | null>>;
}>({
  user: null,
  loading: true,
  setUser: () => {},
});

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<IUserResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();
  const pathname = usePathname();

  async function updateUser() {
    setLoading(true);
    try {
      const user = await getUser();
      setUser(user);
    } catch (error) {
      console.error("User verification failed");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    updateUser();
  }, [router, pathname]);

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (authContext === undefined) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return authContext;
};