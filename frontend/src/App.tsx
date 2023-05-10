import { useState } from "react";
import ResultsOutput from "./components/ResultsOutput";
import WordInput from "./components/WordInput";
import {
  Container,
  Flex,
  Grid,
  GridItem,
  HStack,
  Heading,
} from "@chakra-ui/layout";
import Footer from "./components/Footer";

function App() {
  const [promptText, setPromptext] = useState<string>("");
  const inputPlaceholder = "Enter your Catalan query here...";
  const colorScheme = "orange";
  const sideMarginsMain = 3;
  const onSubmit = (promptText: string) => {
    setPromptext(promptText);
  };
  return (
    <>
      <Grid
        templateAreas={`"header"
    "main"
    "footer"`}
        gap={4}
      >
        <GridItem area={"header"}>
          <Heading>CAT</Heading>
        </GridItem>
        <GridItem
          area={"main"}
          marginRight={sideMarginsMain}
          marginLeft={sideMarginsMain}
        >
          <Container maxW="4xl" centerContent>
            <Flex direction="column" gap={4}>
              <WordInput
                placeholder={inputPlaceholder}
                colorScheme={colorScheme}
                isLoading={false}
                onSubmit={onSubmit}
              />
              <ResultsOutput promptext={promptText} onClick={onSubmit} />
            </Flex>
          </Container>
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
