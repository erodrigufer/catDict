import { useEffect, useState } from "react";
import OutputSentence from "./components/OutputSentence";
import WordInput from "./components/WordInput";
import axios from "axios";

function App() {
  const [html, setHtml] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("https://dilc.org/casa");
      setHtml(result.data);
    };
    fetchData();
  }, []);

  console.log(html);

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
      <pre>{html}</pre>
    </>
  );
}

export default App;
