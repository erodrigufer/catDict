import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import isDevEnv from "../utils/detectNodeEnv";

export interface definitions {
  definitions: string[];
}

const useDefinition = (
  lookupWord: string,
  token: string | undefined | null,
) => {
  // Program automatically detects if running in prod or in dev mode.
  // If dev mode, then send requests to localhost.
  let url = "";
  if (isDevEnv()) url = "http://localhost/v1/api/definition/" + lookupWord;
  else url = "https://erodriguez.de/v1/api/definition/" + lookupWord;

  // Define function that fetches definitions.
  const fetchDefinitions = async () => {
    const response = await axios.get<definitions>(url, {
      headers: { Authorization: token },
    });
    return response.data;
  };
  // TODO: handle error, is this necessary?

  return useQuery<definitions, Error>({
    queryKey: ["definition", lookupWord],
    queryFn: fetchDefinitions,
    // TODO: Add a timeout for the fetchDefinitions function.
    enabled: !!lookupWord, // Only if lookupWord is a valid string
    // the query will be executed.
  });
};

export default useDefinition;
