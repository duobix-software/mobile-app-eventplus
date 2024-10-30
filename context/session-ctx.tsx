import React from "react";
import { useStorageState } from "@/hooks/useStorageState";
import { useMutation } from "@tanstack/react-query";
import { logout } from "@/services/api/authentication";

const AuthContext = React.createContext<{
  signIn: (token: string) => void;
  logout: () => void;
  clearSession: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  logout: () => null,
  clearSession: () => null,
  session: null,
  isLoading: false,
});

function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

function SessionProvider({ children }: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");

  const { mutate } = useMutation({
    mutationFn: () =>
      logout({
        headers: {
          Authorization: `Bearer ${session}`,
        },
      }),
  });

  return (
    <AuthContext.Provider
      value={{
        signIn: (token) => setSession(token),
        logout: () => {
          mutate();
          setSession(null);
        },
        clearSession: () => setSession(null),
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { useSession, SessionProvider };
