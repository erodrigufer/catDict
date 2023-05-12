import { Button, Flex } from "@chakra-ui/react";
import { useState } from "react";
import sanitizeQuery from "../utils/sanitizeQuery";
import useDefinition from "../hooks/useDefinition";

interface Props {
  promptext: string;
  onClick: (promptText: string) => void;
}

const LastWords = ({ promptext, onClick }: Props) => {
  const [lastWords, setLastWords] = useState<string[]>([]);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const textContent = event.currentTarget.textContent;
    if (textContent) onClick(textContent);
  };

  // Do not execute a query if the promptext is an
  // empty string.
  if (promptext !== "") {
    promptext = sanitizeQuery(promptext);

    const query = useDefinition(promptext);

    //   if (query.error) return <p>{query.error.message}</p>;

    // If a definition was found, the query is valid, add it to
    // the last words string array.
    if (query.data?.definitions.length !== 0)
      setLastWords([...lastWords, promptext]);
  }

  // If no words have been queried, render nothing.
  if (lastWords.length === 0) return null;

  return (
    <>
      <Flex gap={2}>
        {lastWords.map((word, index) => (
          <Button key={index} size="xs" variant="outline" onClick={handleClick}>
            {word}
          </Button>
        ))}
      </Flex>
    </>
  );
};

export default LastWords;
