import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface definitions {
  definitions: string[];
}

const useDefinition = () => {
    // Define function that fetches definitions.
    const fetchDefinitions = () =>
      axios
        .get<definitions>("http://localhost:3000/definition/parlar")
        .then((res) => res.data)

return useQuery<definitions, Error>({
    queryKey: ["word"],
    queryFn: fetchDefinitions
  });

}

export default useDefinition;