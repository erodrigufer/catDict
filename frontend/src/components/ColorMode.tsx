import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { IconButton, useColorMode } from "@chakra-ui/react";

const ColorMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <IconButton
        variant="ghost"
        onClick={toggleColorMode}
        aria-label={"color mode"}
        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      ></IconButton>
    </>
  );
};

export default ColorMode;
