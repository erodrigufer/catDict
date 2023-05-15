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

function App() {
  const [promptText, setPromptext] = useState<string>("");
  const [lastWords, setLastWords] = useState<string[]>([]);
  const inputPlaceholder = "Enter your Catalan query here...";
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
      query.data?.definitions.length !== 0 &&
      !lastWords.includes(promptText) && // Do not add element, if it already within the array.
      promptText // Do not change the lastWords array if promptText is an empty string.
    )
      setLastWords([...lastWords, promptText]);
  }, [query.data]);

  return (
    <>
      <Box width="2xl" marginLeft="auto" marginRight="auto">
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
            {/* <Container centerContent> */}
            {/* Chakra container does not stretch its content to  
            max. width therefore it is required to initialize a box
            with a width. */}
            <Flex direction="column" gap={4}>
              <WordInput
                placeholder={inputPlaceholder}
                colorScheme={colorScheme}
                isLoading={query?.isLoading && !!promptText}
                onSubmit={onSubmit}
              />
              <LastWords lastWords={lastWords} onClick={onSubmit} />
              {query?.error && <p>{query.error.message}</p>}
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
