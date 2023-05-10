import { Container, Flex, HStack, Heading, Image } from "@chakra-ui/react";

function Header() {
  return (
    <>
      <Container centerContent>
        <Flex gap={2}>
          <Image
            alt="Senyera"
            src="../../public/senyera.png"
            borderRadius="md"
            height={10}
          />
          <Heading>Diccionari</Heading>
        </Flex>
      </Container>
    </>
  );
}

export default Header;
