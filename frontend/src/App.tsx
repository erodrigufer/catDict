import { useState, useEffect } from "react";
import ResultsOutput from "./components/ResultsOutput";
import WordInput from "./components/WordInput";
import { Flex, Grid, GridItem, HStack } from "@chakra-ui/layout";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LastWords from "./components/LastWords";
import sanitizeQuery from "./utils/sanitizeQuery";
import useDefinition from "./hooks/useDefinition";
import { Box } from "@chakra-ui/react";
import ErrorBanner from "./components/ErrorBanner";

function App() {
  const [promptText, setPromptext] = useState<string>("");
  const [lastWords, setLastWords] = useState<string[]>([]);
  const inputPlaceholder = "Enter your Catalan word here...";
  const colorScheme = "yellow";
  const onSubmit = (promptText: string) => {
    promptText = sanitizeQuery(promptText);
    setPromptext(promptText);
  };

  const query = useDefinition(promptText);

  // Add prompt to last words if the lastWords array does not already
  // include the word being prompted.A
  // The useEffect() hook is only executed if the query.data is changed
  // in order to avoid a never-ending re-rendering of the component, every time
  // that the lastWords (state) would be modified within the useEffect() hook.
  useEffect(() => {
    if (
      // Check that the query data is not undefined, since directly after running the
      // useDefinition() hook the query has not finished fetching the data, so the
      // [query.data] dependency of the useEffect hook is 'undefined', and the
      // useEffect hook is executed.
      // This caused the problem previously, that the length of the definitions could
      // not be properly estimated.
      // So words without a definition were added to the lastWords component.
      query.data !== undefined &&
      // Check that word at least has a definition, before adding it to the lastWords array.
      query.data?.definitions.length !== 0 &&
      // Do not add element, if it already within the array.
      !lastWords.includes(promptText) &&
      // Do not change the lastWords array if promptText is an empty string.
      promptText
    )
      setLastWords([...lastWords, promptText]);
  }, [query.data]);

  return (
    <>
      <Box
        width={{
          base: "95%",
          lg: "60%",
          "2xl": "50%",
        }}
        marginLeft="auto"
        marginRight="auto"
      >
        <Grid
          templateAreas={`"header"
    "main"
    "footer"`}
          gap={4}
        >
          <GridItem area={"header"} marginTop={2}>
            <Header />
          </GridItem>
          <GridItem area={"main"}>
            <Flex direction="column" gap={4}>
              <WordInput
                placeholder={inputPlaceholder}
                colorScheme={colorScheme}
                isLoading={query?.isLoading && !!promptText}
                onSubmit={onSubmit}
              />
              <LastWords lastWords={lastWords} onClick={onSubmit} />
              {query?.error && (
                <ErrorBanner errorMessage={query.error.message} />
              )}
              <ResultsOutput
                definitions={query?.data}
                promptext={promptText}
                onClick={onSubmit}
              />
            </Flex>
          </GridItem>
          <GridItem area={"footer"} marginTop={3} marginBottom={3}>
            <HStack justify="space-evenly">
              <Footer />
            </HStack>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
}

export default App;
