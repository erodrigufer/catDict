import { UseQueryResult } from "@tanstack/react-query";
import { definitions } from "../../../hooks/useDefinition";
import ErrorBanner from "./ErrorBanner";
import LastWords from "./LastWords";
import ResultsOutput from "./ResultsOutput";
import WordInput from "./WordInput";
import { Flex } from "@chakra-ui/react";

interface Props {
  promptText: string;
  colorScheme: string;
  lastWords: string[];
  onSubmit: (promptText: string) => void;
  query: UseQueryResult<definitions, Error> | undefined;
}
const Main: React.FC<Props> = ({
  colorScheme,
  onSubmit,
  query,
  lastWords,
  promptText,
}) => {
  return (
    <Flex direction="column" gap={4}>
      <WordInput
        colorScheme={colorScheme}
        isLoading={query?.isLoading && !!promptText}
        onSubmit={onSubmit}
      />
      <LastWords lastWords={lastWords} onClick={onSubmit} />
      {query?.error && <ErrorBanner errorMessage={query.error.message} />}
      {query?.isSuccess && (
        <ResultsOutput
          definitions={query?.data}
          promptext={promptText}
          onClick={onSubmit}
        />
      )}
    </Flex>
  );
};
export default Main;
