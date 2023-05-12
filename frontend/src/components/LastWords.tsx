import { Button, Flex } from "@chakra-ui/react";

interface Props {
  lastWords: string[];
  onClick: (promptText: string) => void;
}

const LastWords = ({ lastWords, onClick }: Props) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const textContent = event.currentTarget.textContent;
    if (textContent) onClick(textContent);
  };

  // If no last words have been searched, render nothing.
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
