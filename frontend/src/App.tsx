import { useState } from "react";
import ResultsOutput from "./components/ResultsOutput";
import WordInput from "./components/WordInput";
import { Grid, GridItem, Heading } from "@chakra-ui/layout";

function App() {
  const [promptText, setPromptext] = useState<string>("");
  const inputPlaceholder = "Enter your Catalan query here...";
  const colorScheme = "purple";
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
        <GridItem area={"main"}>
          <WordInput
            placeholder={inputPlaceholder}
            colorScheme={colorScheme}
            isLoading={false}
            onSubmit={onSubmit}
          />
          <ResultsOutput promptext={promptText} />
        </GridItem>
        <GridItem area={"footer"}>
          <p>Eduardo Rodriguez 2023</p>
        </GridItem>
      </Grid>
    </>
  );
}

export default App;
