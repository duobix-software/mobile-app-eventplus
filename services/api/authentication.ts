import { AxiosRequestConfig } from "axios";
import { api } from "./api";
import { Credentials, RegistrationData } from "@/types/authentication";
import { User } from "@/types";

async function login(
  data: Credentials,
  config: AxiosRequestConfig = {}
): Promise<{ token: string }> {
  const response = await api.post("/auth/login", data, config);
  return await response.data;
}

async function register(
  data: RegistrationData,
  config: AxiosRequestConfig = {}
): Promise<{ token: string }> {
  const response = await api.post("/auth/register", data, config);
  return await response.data;
}

async function logout(config: AxiosRequestConfig = {}) {
  const response = await api.post("/auth/logout", null, config);
  return await response.data;
}

async function authenticatedUser(
  config: AxiosRequestConfig = {}
): Promise<User> {
  const response = await api.get("/customer", config);
  return await response.data;
}

export { login, register, logout, authenticatedUser };
