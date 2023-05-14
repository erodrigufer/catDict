import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface definitions {
  definitions: string[];
}

const useDefinition = (lookupWord: string) => {
    const url = 'http://5.75.140.61/definition/' + lookupWord
    // Define function that fetches definitions.
    const fetchDefinitions = () =>
      axios
        .get<definitions>(url)
        .then((res) => res.data)
        // TODO: handle error

return useQuery<definitions, Error>({
    queryKey: ["definition", lookupWord],
    queryFn: fetchDefinitions,
   enabled: !!lookupWord, // Only if lookupWord is a valid string 
   // the query will be executed.
  });

}

export default useDefinition;