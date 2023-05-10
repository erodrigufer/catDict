import { Table, TableCaption, Tbody, Tr, Td } from "@chakra-ui/table";
import useDefinition from "../hooks/useDefinition";
import OutputSentence from "./OutputSentence";
import sanitizeQuery from "../utils/sanitizeQuery";

interface Props {
  promptext: string;
  onClick: (promptText: string) => void;
}

const ResultsOutput = ({ promptext, onClick }: Props) => {
  // if (promptext === "") return <p>No query yet...</p>;

  promptext = sanitizeQuery(promptext);

  const query = useDefinition(promptext);
  if (query.isLoading) return <p>Loading...</p>;

  if (query.error) return <p>{query.error.message}</p>;

  return (
    <>
      {/* <TableContainer> */}
      <Table variant="simple" size="md">
        <TableCaption placement="top">
          Definicions de la paraula '{promptext}'
        </TableCaption>
        <Tbody>
          {query.data?.definitions.map((definition, index) => (
            <Tr key={index}>
              <Td>{index + 1}</Td>
              {/* <Td>{definition}</Td> */}
              <Td>
                <OutputSentence inputString={definition} onClick={onClick} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {/* </TableContainer> */}

      {/* {query.data?.definitions.map((definition, index) => (
        <p key={index}>{definition}</p>
      ))} */}
    </>
  );
};

export default ResultsOutput;
