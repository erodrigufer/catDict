import { Box, Flex, Heading, Image } from "@chakra-ui/react";
import ColorMode from "./ColorMode";

function Header() {
  return (
    <>
      <Flex gap={2} justifyContent="center" alignItems="center">
        <Image alt="Senyera" src="/senyera.png" borderRadius="md" height={10} />
        <Heading>Diccionari</Heading>
        <Box marginLeft="auto">
          <ColorMode />
        </Box>
      </Flex>
    </>
  );
}

export default Header;
