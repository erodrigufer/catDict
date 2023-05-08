import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface definitions {
  definitions: string[];
}

const ResultsOutput = () => {
  const query = useQuery({
    queryKey: ["word"],
    queryFn: () =>
      axios
        .get<definitions>("http://localhost:3000/definition/gos")
        .then((res) => res.data),
  });

  return (
    <>
      {query.data?.definitions.map((definition, index) => (
        <p key={index}>{definition}</p>
      ))}
    </>
  );
};

export default ResultsOutput;
