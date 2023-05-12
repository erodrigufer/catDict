import { Button, Flex } from "@chakra-ui/react";
import { useRef } from "react";
import { definitions } from "../hooks/useDefinition";

interface Props {
  promptext: string;
  definitions: definitions | undefined;
  onClick: (promptText: string) => void;
}

const LastWords = ({ definitions, promptext, onClick }: Props) => {
  const lastWords = useRef<string[]>(["casa"]);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const textContent = event.currentTarget.textContent;
    if (textContent) onClick(textContent);
  };

  // Do not execute a query if the promptext is an
  // empty string.
  if (promptext !== "") {
    // If a definition was found, the query is valid, add it to
    // the last words string array.
    if (definitions?.definitions.length !== 0)
      // TODO: this step is the problem, changing the state re-renders the whole
      // component, which makes me add one more value to lastWords, since the code
      // is executed one more time. It is a bad idea to add props to the component state.
      lastWords.current = [...lastWords.current, promptext];
  }

  // If no words have been queried, render nothing.
  if (lastWords.current.length === 0) return null;

  return (
    <>
      <Flex gap={2} wrap="wrap">
        {lastWords.current.map((word, index) => (
          <Button key={index} size="xs" variant="outline" onClick={handleClick}>
            {word}
          </Button>
        ))}
      </Flex>
    </>
  );
};

export default LastWords;
