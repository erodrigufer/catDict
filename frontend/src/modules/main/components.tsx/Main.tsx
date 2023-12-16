import { UseQueryResult } from "@tanstack/react-query";
import { definitions } from "../../../hooks/useDefinition";
import ErrorBanner from "./ErrorBanner";
import LastWords from "./LastWords";
import ResultsOutput from "./ResultsOutput";
import WordInput from "./WordInput";

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
    <>
      <WordInput
        colorScheme={colorScheme}
        isLoading={query?.isLoading && !!promptText}
        onSubmit={onSubmit}
      />
      <LastWords lastWords={lastWords} onClick={onSubmit} />
      {query?.error && <ErrorBanner errorMessage={query.error.message} />}
      <ResultsOutput
        definitions={query?.data}
        promptext={promptText}
        onClick={onSubmit}
      />
    </>
  );
};
export default Main;
