import { useState } from "react";
import ResultsOutput from "./components/ResultsOutput";
import WordInput from "./components/WordInput";
import { Container, Flex, Grid, GridItem, HStack } from "@chakra-ui/layout";
import Footer from "./components/Footer";
import Header from "./components/Header";
// import LastWords from "./components/LastWords";
import sanitizeQuery from "./utils/sanitizeQuery";
import useDefinition from "./hooks/useDefinition";
import { Box } from "@chakra-ui/react";

function App() {
  const [promptText, setPromptext] = useState<string>("");
  const inputPlaceholder = "Enter your Catalan query here...";
  const colorScheme = "yellow";
  const sideMarginsMain = 3;
  const onSubmit = (promptText: string) => {
    promptText = sanitizeQuery(promptText);
    setPromptext(promptText);
  };

  const query = useDefinition(promptText);

  return (
    <>
      <Grid
        templateAreas={`"header"
    "main"
    "footer"`}
        gap={4}
      >
        <GridItem area={"header"} marginTop={2}>
          <Container maxW="4xl">
            <Header />
          </Container>
        </GridItem>
        <GridItem
          area={"main"}
          marginRight={sideMarginsMain}
          marginLeft={sideMarginsMain}
        >
          {/* <Container centerContent> */}
          {/* Chakra container does not stretch its content to  
            max. width therefore it is required to initialize a box
            with a width. */}
          <Box width="4xl" marginLeft="auto" marginRight="auto">
            <Flex direction="column" gap={4}>
              <WordInput
                placeholder={inputPlaceholder}
                colorScheme={colorScheme}
                isLoading={query?.isLoading && !!promptText}
                onSubmit={onSubmit}
              />
              {/* <LastWords
                definitions={query?.data}
                promptext={promptText}
                onClick={onSubmit}
              /> */}
              {query?.error && <p>{query.error.message}</p>}
              <ResultsOutput
                definitions={query?.data}
                promptext={promptText}
                onClick={onSubmit}
              />
            </Flex>
          </Box>
        </GridItem>
        <GridItem area={"footer"} marginTop={3} marginBottom={3}>
          <HStack justify="space-evenly">
            <Footer />
          </HStack>
        </GridItem>
      </Grid>
    </>
  );
}

export default App;
