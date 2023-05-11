import { Box, Flex, Tooltip } from "@chakra-ui/react";

interface Props {
  inputString: string;
  onClick: (promptText: string) => void;
}

const OutputSentence = (props: Props) => {
  // Split the string into single words stored in unique array cells.
  const singleWords = props.inputString.split(" ");

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const textContent = event.currentTarget.textContent;
    if (textContent) props.onClick(textContent);
  };

  return (
    <>
      <Flex flexWrap="wrap">
        {singleWords.map((word, index) => (
          <Tooltip key={index} hasArrow label="Buscar paraula en el diccionari">
            <Box
              key={index}
              mr={1}
              _hover={{ bg: "yellow.200" }}
              onClick={handleClick}
            >
              {word}
            </Box>
          </Tooltip>
        ))}
      </Flex>
    </>
  );
};

export default OutputSentence;
