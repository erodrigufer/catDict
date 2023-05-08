import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface definitions {
  definitions: string[];
}

const useDefinition = (lookupWord: string) => {
    const url = 'http://localhost:3000/definition/' + lookupWord
    // Define function that fetches definitions.
    const fetchDefinitions = () =>
      axios
        .get<definitions>(url)
        .then((res) => res.data)

return useQuery<definitions, Error>({
    queryKey: ["definition", lookupWord],
    queryFn: fetchDefinitions
  });

}

export default useDefinition;