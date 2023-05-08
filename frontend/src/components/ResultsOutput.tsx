import {
  TableContainer,
  Table,
  TableCaption,
  Tbody,
  Tr,
  Td,
} from "@chakra-ui/table";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface definitions {
  definitions: string[];
}

const ResultsOutput = () => {
  const query = useQuery<definitions, Error>({
    queryKey: ["word"],
    queryFn: () =>
      axios
        .get<definitions>("http://localhost:3000/definition/edifici")
        .then((res) => res.data),
  });

  if (query.isLoading) return <p>Loading...</p>;

  if (query.error) return <p>{query.error.message}</p>;

  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Definicions per a...</TableCaption>
          <Tbody>
            {query.data?.definitions.map((definition, index) => (
              <Tr key={index}>
                <Td>{index + 1}</Td>
                <Td>{definition}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {query.data?.definitions.map((definition, index) => (
        <p key={index}>{definition}</p>
      ))}
    </>
  );
};

export default ResultsOutput;
