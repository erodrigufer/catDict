import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface definitions {
  definitions: string[];
}

function sanitizeQuery(query: string): string {
  // Remove all characters before an apostrophe (') (’).
  const index = query.indexOf(`'`) !== -1 ? query.indexOf(`'`) : query.indexOf(`’`);
  // If the apostrophe character is not found then the indexOf() method returns -1.
  query = index  !== -1 ? query.substring(index + 1) : query;

  // Remove points and commas and transform whole string to lowercase.
  return query.toLowerCase().replace(".", "").replace(",","").replace(";","")
}

const useDefinition = (lookupWord: string) => {
    const url = 'http://localhost:3000/definition/' + sanitizeQuery(lookupWord)
    // Define function that fetches definitions.
    const fetchDefinitions = () =>
      axios
        .get<definitions>(url)
        .then((res) => res.data)
        // TODO: handle error

return useQuery<definitions, Error>({
    queryKey: ["definition", lookupWord],
    queryFn: fetchDefinitions
  });

}

export default useDefinition;