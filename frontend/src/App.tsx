import { useState } from "react";
import OutputSentence from "./components/OutputSentence";
import ResultsOutput from "./components/ResultsOutput";
import WordInput from "./components/WordInput";

function App() {
  const [promptText, setPromptext] = useState<string>();
  const inputPlaceholder = "Enter your Catalan query here...";
  const colorScheme = "purple";
  const onSubmit = (promptText: string) => {
    setPromptext(promptText);
  };
  return (
    <>
      <WordInput
        placeholder={inputPlaceholder}
        colorScheme={colorScheme}
        isLoading={false}
        onSubmit={onSubmit}
      />
      <OutputSentence inputString="Test string, what up! More text ipsum lorem testum rerum, morem lirum." />
      <ResultsOutput promptext={promptText} />
    </>
  );
}

export default App;
