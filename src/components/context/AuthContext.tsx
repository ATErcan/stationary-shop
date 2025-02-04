'use client';

import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { IUserResponse } from "@/lib/types/responses/user.type";
import { checkUser } from "@/lib/tools/api";

export const AuthContext = createContext<{ user: IUserResponse | null }>({
  user: null
});

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<IUserResponse | null>(null);

  const router = useRouter();
  const pathname = usePathname();

  async function updateUser() {
    try {
      const user = await checkUser();
      setUser(user);
    } catch (error) {
      console.error("User verification failed");
    }
  }

  useEffect(() => {
    updateUser();
  }, [pathname, router]);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  )
}