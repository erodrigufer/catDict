import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import isDevEnv from "../utils/detectNodeEnv";

export interface AuthToken {
  authToken: string;
}

export interface authCredentials {
  username: string;
  password: string;
}

const useAuthToken = (credentials: authCredentials) => {
  // Program automatically detects if running in prod or in dev mode.
  // If dev mode, then send requests to localhost.
  let url = "";
  if (isDevEnv()) url = "http://localhost/v1/api/login";
  // TODO: use env variable for prod domain.
  else url = "http://0.0.0.0/v1/api/login";

  // Define function that sends POST request with authCredentials
  const fetchAuthToken = async () => {
    const response = await axios.post<string>(url, credentials);
    return response.headers["x-auth-token"];
  };
  // TODO: handle error, is this necessary?

  return useQuery<string | undefined | null, Error>({
    queryKey: ["authToken", credentials],
    queryFn: fetchAuthToken,
    // TODO: Add a timeout for the fetchAuthToken function.
    retry: false, // If auth fails, do not retry.
    enabled: !!credentials.username && !!credentials.password,
    // Only if username and password are valid strings
    // the query will be executed.
  });
};

export default useAuthToken;
