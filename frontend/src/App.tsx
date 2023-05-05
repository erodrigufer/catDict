import OutputSentence from "./components/OutputSentence";
import WordInput from "./components/WordInput";

function App() {
  const inputPlaceholder = "Enter your Catalan query here...";
  const colorScheme = "purple";
  return (
    <>
      <WordInput
        placeholder={inputPlaceholder}
        colorScheme={colorScheme}
        isLoading={false}
      />
      <OutputSentence inputString="Test string, what up! More text ipsum lorem testum rerum, morem lirum." />
    </>
  );
}

export default App;
