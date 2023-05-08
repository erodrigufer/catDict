import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { FormEvent, SetStateAction, useState } from "react";

interface Props {
  placeholder: string;
  colorScheme: string;
  isLoading: boolean;
  onSubmit: (promptText: string) => void;
}

const WordInput = (props: Props) => {
  // The text value written by the user.
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (event: FormEvent) => {
    // Prevent the default behaviour of a button, e.g. redirecting
    // to another page after pressing the button.
    event.preventDefault();

    props.onSubmit(inputValue);

    // Reset input value after submission, i.e. the chat input is
    // again an empty string.
    setInputValue("");
  };

  const handleChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setInputValue(event.target.value);
  };

  const sideMargins = 5;
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Flex gap={2} mr={sideMargins} ml={sideMargins}>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="gray.300" />}
            />
            <Input
              placeholder={props.placeholder}
              boxShadow="base"
              value={inputValue}
              onChange={handleChange}
            />
          </InputGroup>
          <Button
            colorScheme={props.colorScheme}
            isLoading={props.isLoading}
            loadingText="Loading..."
            type="submit"
          >
            Submit
          </Button>
        </Flex>
      </form>
    </>
  );
};

export default WordInput;
