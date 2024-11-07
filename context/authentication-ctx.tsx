import React from "react";
import { router } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api/api";
import { authenticatedUser } from "@/services/api/authentication";
import { useSession } from "./session-ctx";
import { AuthContext as AuthContextType } from "@/types/authentication";

const AuthContext = React.createContext<AuthContextType>({
  isLoading: true,
  user: null,
});

function useUser(): AuthContextType {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useUser must be wrapped in a <AuthProvider />");
    }
  }

  return value;
}

function AuthProvider({ children }: React.PropsWithChildren) {
  const { logout, session } = useSession();

  const { data, isSuccess } = useQuery({
    queryFn: authenticatedUser,
    queryKey: ["user"],
  });

  React.useLayoutEffect(() => {
    const requestInterceptor = api.interceptors.request.use(
      async (config) => {
        if (session) {
          config.headers.Authorization = `Bearer ${session}`;
        } else {
          router.replace("/auth");
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response.status === 401) {
          logout();
          router.replace("/auth");
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={
        isSuccess
          ? {
              isLoading: false,
              user: data,
            }
          : {
              isLoading: true,
              user: null,
            }
      }
    >
      {children}
    </AuthContext.Provider>
  );
}

export { useUser, AuthProvider };
