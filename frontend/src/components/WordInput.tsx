import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

interface Props {
  placeholder: string;
  colorScheme: string;
  isLoading: boolean;
}

const WordInput = (props: Props) => {
  const sideMargins = 5;
  return (
    <>
      <Flex gap={2} mr={sideMargins} ml={sideMargins}>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.300" />}
          />
          <Input placeholder={props.placeholder} boxShadow="base" />
        </InputGroup>
        <Button
          colorScheme={props.colorScheme}
          isLoading={props.isLoading}
          loadingText="Loading..."
        >
          Submit
        </Button>
      </Flex>
    </>
  );
};

export default WordInput;
