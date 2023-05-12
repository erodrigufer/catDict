import { Table, TableCaption, Tbody, Tr, Td } from "@chakra-ui/table";
import { definitions } from "../hooks/useDefinition";
import OutputSentence from "./OutputSentence";
import { Box } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/react";

interface Props {
  promptext: string;
  definitions: definitions | undefined;
  onClick: (promptText: string) => void;
}

const ResultsOutput = ({ promptext, definitions, onClick }: Props) => {
  if (promptext === "") return null;
  if (definitions?.definitions.length === 0)
    return <Text>No definitions were found.</Text>;

  // onSuccessfulQuery(promptext);
  return (
    <>
      <Box width="4xl" borderWidth="1.5px" borderRadius="lg">
        <Table variant="simple" size="md">
          <TableCaption placement="top">
            Definicions de la paraula '{promptext}'
          </TableCaption>
          <Tbody>
            {definitions?.definitions.map((definition, index) => (
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
      </Box>
    </>
  );
};

export default ResultsOutput;
