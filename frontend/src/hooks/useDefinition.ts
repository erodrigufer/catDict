import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import isDevEnv from "../utils/detectNodeEnv";

export interface definitions {
  definitions: string[];
}

const useDefinition = (lookupWord: string) => {
  // Program automatically detects if running in prod or in dev mode.
  // If dev mode, then send requests to localhost.
  let url = '';
    if (isDevEnv()) url = 'http://localhost/definition/' + lookupWord
    else url = 'http://erodriguez.de/definition/' + lookupWord

    // Define function that fetches definitions.
    const fetchDefinitions = async () =>{
      const response = await axios.get<definitions>(url)
        return response.data
    }
        // TODO: handle error

return useQuery<definitions, Error>({
    queryKey: ["definition", lookupWord],
    queryFn: fetchDefinitions,
   enabled: !!lookupWord, // Only if lookupWord is a valid string 
   // the query will be executed.
  });

}

export default useDefinition;