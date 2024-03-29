import { useState, useEffect } from "react";
import { Grid, GridItem, HStack } from "@chakra-ui/layout";
import Footer from "./modules/Footer";
import Header from "./modules/Header";
import sanitizeQuery from "./utils/sanitizeQuery";
import useDefinition from "./hooks/useDefinition";
import { Box } from "@chakra-ui/react";
import Auth from "./modules/auth/components/Auth";
import Main from "./modules/main/components.tsx/Main";
import { Route, Router, Switch } from "wouter";
import { AuthToken } from "./hooks/useAuthToken";
import { navigate } from "wouter/use-location";

function App() {
  const [promptText, setPromptext] = useState<string>("");
  const [lastWords, setLastWords] = useState<string[]>([]);
  const [authToken, setAuthToken] = useState<AuthToken>();
  const colorScheme = "yellow";
  const onSubmitDefinition = (promptText: string) => {
    promptText = sanitizeQuery(promptText);
    setPromptext(promptText);
  };

  const handleNewToken = (token: AuthToken) => {
    setAuthToken(token);
    navigate("/");
  };

  const query = useDefinition(promptText, authToken?.authToken);

  useEffect(() => {
    if (authToken?.authToken === null || authToken?.authToken === undefined)
      navigate("/login");
  }, [authToken]);

  // Add prompt to last words if the lastWords array does not already
  // include the word being prompted.
  // The useEffect() hook is only executed if query.data is changed
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
      // Check that word at least has a definition, before adding it to the
      // lastWords array.
      query.data?.definitions.length !== 0 &&
      // Do not add element, if it already within the array.
      !lastWords.includes(promptText) &&
      // Do not change the lastWords array if promptText is an empty string.
      promptText
    )
      setLastWords([...lastWords, promptText]);
  }, [query.data]);

  const BASE_URL = import.meta.env.BASE_URL;

  /* wouter doesn't handle `/` as base path correctly */
  const basePath = BASE_URL !== "/" ? BASE_URL : "";

  return (
    <>
      <Router base={basePath}>
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
              <Switch>
                <Route path={"/login"}>
                  <Auth
                    colorScheme={colorScheme}
                    handleNewToken={handleNewToken}
                  />
                </Route>
                <Route path={basePath}>
                  <Main
                    colorScheme={colorScheme}
                    promptText={promptText}
                    lastWords={lastWords}
                    onSubmit={onSubmitDefinition}
                    query={query}
                  />
                </Route>
              </Switch>
            </GridItem>
            <GridItem area={"footer"} marginTop={3} marginBottom={3}>
              <HStack justify="space-evenly">
                <Footer />
              </HStack>
            </GridItem>
          </Grid>
        </Box>
      </Router>
    </>
  );
}

export default App;
