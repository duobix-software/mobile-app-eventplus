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

interface UpdateInformationData {
  fullname: string;
  email: string;
  phone: string;
  password: string;
  currentpassword: string;
}

type AuthContext =
  | { isUserLoading: true; user: null }
  | { isUserLoading: false; user: User };

export { Credentials, RegistrationData, AuthContext, UpdateInformationData };
