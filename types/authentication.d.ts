import { User } from "./index";

interface Credentials {
  username: string;
  password: string;
  device_name: string;
}

interface RegistrationData {
  fullname: string;
  email: string;
  phone: string;
  password: string;
  device_name: string;
}

type AuthContext =
  | { isLoading: true; user: null }
  | { isLoading: false; user: User };

export { Credentials, RegistrationData, AuthContext };
