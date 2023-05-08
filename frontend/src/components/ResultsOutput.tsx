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
  const query = useQuery({
    queryKey: ["word"],
    queryFn: () =>
      axios
        .get<definitions>("http://localhost:3000/definition/edifici")
        .then((res) => res.data),
  });

  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Definicions per a...</TableCaption>
          <Tbody>
            {query.data?.definitions.map((definition, index) => (
              <Tr>
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
