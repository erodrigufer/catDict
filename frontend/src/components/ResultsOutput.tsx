import {
  TableContainer,
  Table,
  TableCaption,
  Tbody,
  Tr,
  Td,
} from "@chakra-ui/table";
import useDefinition from "../hooks/useDefinition";

interface Props {
  lookupWord: string;
}

const ResultsOutput = ({ lookupWord }: Props) => {
  const query = useDefinition(lookupWord);
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

      {/* {query.data?.definitions.map((definition, index) => (
        <p key={index}>{definition}</p>
      ))} */}
    </>
  );
};

export default ResultsOutput;
